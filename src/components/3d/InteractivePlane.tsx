import * as THREE from 'three';
import { WavePlaneShader } from '../../utils/webgpu';

export class InteractivePlaneObject {
  public mesh: THREE.Mesh;
  private material: THREE.ShaderMaterial;
  private time: number = 0;

  constructor(width: number = 24, height: number = 24, segments: number = 60) {
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments);

    this.material = new THREE.ShaderMaterial({
      vertexShader: WavePlaneShader.vertexShader,
      fragmentShader: WavePlaneShader.fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorLow: { value: new THREE.Color(0x061126) },
        uColorHigh: { value: new THREE.Color(0x00f0ff) },
      },
      transparent: true,
      wireframe: false,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.45; // Tilted horizon plane
    this.mesh.position.y = -2.5;
  }

  public update(delta: number, mouse: THREE.Vector2) {
    this.time += delta;
    this.material.uniforms.uTime.value = this.time;
    this.material.uniforms.uMouse.value.lerp(mouse, 0.08);
  }

  public dispose() {
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}
