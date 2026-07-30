import * as THREE from 'three';
import { ParticleShader } from '../../utils/webgpu';

export class ParticleSystemObject {
  public points: THREE.Points;
  private material: THREE.ShaderMaterial;
  private count: number;
  private time: number = 0;
  private targetMorph: number = 0;
  private currentMorph: number = 0;

  constructor(count: number = 1800) {
    this.count = count;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color(0x00f0ff);
    const emerald = new THREE.Color(0x00ff9d);
    const purple = new THREE.Color(0x8a2be2);

    for (let i = 0; i < count; i++) {
      // Sphere distribution for base positions
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3.5 + Math.random() * 4.0;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Cubic / Matrix Grid distribution for target positions
      const side = Math.cbrt(count);
      const ix = i % side;
      const iy = Math.floor(i / side) % side;
      const iz = Math.floor(i / (side * side));

      const spacing = 0.4;
      const offset = (side * spacing) / 2;

      targetPositions[i * 3] = ix * spacing - offset;
      targetPositions[i * 3 + 1] = iy * spacing - offset;
      targetPositions[i * 3 + 2] = iz * spacing - offset;

      sizes[i] = Math.random() * 0.15 + 0.08;

      // Blend between cyan, emerald, purple
      const randColor = Math.random();
      let color = cyan;
      if (randColor > 0.6) color = emerald;
      else if (randColor > 0.3) color = purple;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aTargetPosition', new THREE.BufferAttribute(targetPositions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    this.material = new THREE.ShaderMaterial({
      vertexShader: ParticleShader.vertexShader,
      fragmentShader: ParticleShader.fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uMouseDistance: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(geometry, this.material);
  }

  public setMorphState(morphValue: number) {
    this.targetMorph = Math.max(0, Math.min(1, morphValue));
  }

  public update(delta: number, mouse: THREE.Vector2) {
    this.time += delta;
    this.material.uniforms.uTime.value = this.time;

    // Smoothly interpolate morph
    this.currentMorph += (this.targetMorph - this.currentMorph) * 0.05;
    this.material.uniforms.uMorph.value = this.currentMorph;

    // Gentle global rotation
    this.points.rotation.y = this.time * 0.05 + mouse.x * 0.2;
    this.points.rotation.x = mouse.y * 0.2;
  }

  public dispose() {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}
