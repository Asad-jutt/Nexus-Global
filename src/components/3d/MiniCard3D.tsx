import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GeometryType } from '../../types';

interface MiniCard3DProps {
  shape: GeometryType;
  colorHex: string;
  isHovered: boolean;
}

export const MiniCard3D: React.FC<MiniCard3DProps> = ({ shape, colorHex, isHovered }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const width = container.clientWidth || 120;
    const height = container.clientHeight || 120;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Create Mesh based on shape
    let geom: THREE.BufferGeometry;
    switch (shape) {
      case 'prism':
        geom = new THREE.CylinderGeometry(0, 1.0, 1.4, 4);
        break;
      case 'cube':
      default:
        geom = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        break;
    }

    const baseColor = new THREE.Color(colorHex);
    const mat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });

    const mesh = new THREE.Mesh(geom, mat);
    scene.add(mesh);

    // Wireframe outline
    const wireGeom = new THREE.WireframeGeometry(geom);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });
    const wireMesh = new THREE.LineSegments(wireGeom, wireMat);
    scene.add(wireMesh);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 2.5);
    light1.position.set(2, 3, 4);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(baseColor, 2.0);
    light2.position.set(-2, -2, -2);
    scene.add(light2);

    let animationFrameId: number;
    let rotationSpeed = 0.01;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Increase rotation speed on hover
      const targetSpeed = isHovered ? 0.04 : 0.01;
      rotationSpeed += (targetSpeed - rotationSpeed) * 0.1;

      mesh.rotation.x += rotationSpeed * 0.7;
      mesh.rotation.y += rotationSpeed;
      wireMesh.rotation.x = mesh.rotation.x;
      wireMesh.rotation.y = mesh.rotation.y;

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      geom.dispose();
      mat.dispose();
      wireGeom.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, [shape, colorHex, isHovered]);

  return (
    <div ref={containerRef} className="w-20 h-20 relative flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
