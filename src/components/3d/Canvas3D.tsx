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

    // Detect WebGPU / WebGL support
    detectWebGPU().then(() => {
      // Create Three.js Scene
      const scene = new THREE.Scene();

      // Camera
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 8);

      // Determine pixel ratio cap based on quality preset
      let maxDpr = 2.0;
      if (qualityPreset === 'balanced') maxDpr = 1.5;
      if (qualityPreset === 'saver') maxDpr = 1.0;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, maxDpr);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: qualityPreset !== 'saver',
        powerPreference: qualityPreset === 'high' ? 'high-performance' : 'default',
      });

      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0); // Transparent canvas background
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Mouse tracking
      const mouse = new THREE.Vector2(0, 0);
      const targetMouse = new THREE.Vector2(0, 0);

      const handleMouseMove = (event: MouseEvent) => {
        if (!interactive) return;
        const rect = container.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
        targetMouse.set(x, y);
      };

      const handleTouchMove = (event: TouchEvent) => {
        if (!interactive || event.touches.length === 0) return;
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
        userCleanup = onSceneReady({ scene, camera, renderer, mouse });
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
      let animationFrameId: number;
      let lastTime = performance.now();
      let frameCount = 0;
      let fpsTimer = performance.now();

      const animate = (currentTime: number) => {
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
        if (currentTime - fpsTimer >= 500) { // update twice per second
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

      animationFrameId = requestAnimationFrame(animate);

      // Main component cleanup
      return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        if (interactive) {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('touchmove', handleTouchMove);
        }
        if (userCleanup) userCleanup();
        renderer.dispose();
      };
    });
  }, [qualityPreset, interactive]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-auto" />
    </div>
  );
};
