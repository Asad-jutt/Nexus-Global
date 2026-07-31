import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { detectWebGPU } from '../../utils/webgpu';
import { QualityPreset } from '../../types';

interface Canvas3DProps {
  children?: React.ReactNode;
  className?: string;
  onSceneReady?: (ctx: {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mouse: THREE.Vector2;
  }) => (() => void) | void;
  onFpsUpdate?: (fps: number, frameTimeMs: number, drawCalls: number, triangles: number) => void;
  qualityPreset?: QualityPreset;
  interactive?: boolean;
}

export const Canvas3D: React.FC<Canvas3DProps> = ({
  className = 'w-full h-full absolute inset-0',
  onSceneReady,
  onFpsUpdate,
  qualityPreset = 'high',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    let isVisible = true;
    let animationFrameId: number | null = null;
    let cleanup: (() => void) | undefined;

    const setupScene = () => {
      if (cleanup) cleanup();

      // Create Three.js Scene
      const scene = new THREE.Scene();

      // Camera
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 8);

      // Determine pixel ratio cap based on quality preset for performance
      let maxDpr = 1.25;
      if (qualityPreset === 'balanced') maxDpr = 1.0;
      if (qualityPreset === 'saver') maxDpr = 0.85;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, maxDpr);

      // Renderer setup. WebGL can be unavailable inside embedded previews
      // (sandboxed iframes, disabled GPU, VMs), so fail gracefully instead of
      // throwing an unhandled error that can blank the page.
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: qualityPreset !== 'saver',
          powerPreference: qualityPreset === 'high' ? 'high-performance' : 'low-power',
        });
      } catch (err) {
        console.warn('[Canvas3D] WebGL unavailable; 3D scene disabled.', err);
        return;
      }

      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0); // Transparent canvas background
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Mouse tracking
      const mouse = new THREE.Vector2(0, 0);
      const targetMouse = new THREE.Vector2(0, 0);

      const handleMouseMove = (event: MouseEvent) => {
        if (!interactive || !isVisible) return;
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouse.set(x, y);
      };

      const handleTouchMove = (event: TouchEvent) => {
        if (!interactive || !isVisible || event.touches.length === 0) return;
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouse.set(x, y);
      };

      if (interactive) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
      }

      // Cleanup hook returned by consumer onSceneReady
      let userCleanup: (() => void) | void;
      if (onSceneReady) {
        try {
          userCleanup = onSceneReady({ scene, camera, renderer, mouse });
        } catch (err) {
          console.warn('[Canvas3D] onSceneReady threw; skipping scene content.', err);
        }
      }

      // Resize observer
      const resizeObserver = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      resizeObserver.observe(container);

      // Render & Performance loop
      let lastTime = performance.now();
      let frameCount = 0;
      let fpsTimer = performance.now();

      const animate = (currentTime: number) => {
        if (!isVisible) return;
        animationFrameId = requestAnimationFrame(animate);

        const delta = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        // Smooth interpolate mouse position
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;

        // Render frame
        renderer.render(scene, camera);

        // Performance metrics calculation
        frameCount++;
        if (currentTime - fpsTimer >= 500) {
          const currentFps = Math.round((frameCount * 1000) / (currentTime - fpsTimer));
          const frameTime = delta * 1000;
          const info = renderer.info;

          if (onFpsUpdate) {
            onFpsUpdate(
              currentFps,
              Math.round(frameTime * 10) / 10,
              info.render.calls,
              info.render.triangles
            );
          }

          frameCount = 0;
          fpsTimer = currentTime;
        }
      };

      // Intersection Observer to pause rendering when canvas is off-screen
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;

          if (isVisible && !wasVisible) {
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(animate);
          } else if (!isVisible && animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        },
        { rootMargin: '100px' }
      );
      intersectionObserver.observe(container);

      // Start initial render loop if visible
      animationFrameId = requestAnimationFrame(animate);

      // Main component cleanup
      cleanup = () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        if (interactive) {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('touchmove', handleTouchMove);
        }
        if (userCleanup) userCleanup();
        renderer.dispose();
      };
    };

    // Detect WebGPU / WebGL support
    detectWebGPU().then(setupScene).catch(setupScene);

    return () => {
      if (cleanup) cleanup();
    };
  }, [qualityPreset, interactive]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
