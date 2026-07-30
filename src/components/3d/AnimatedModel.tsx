import * as THREE from 'three';
import { GeometryType } from '../../types';

export class AnimatedModelObject {
  public group: THREE.Group;
  public liquidMesh: THREE.Mesh;
  public innerFluidCore: THREE.Mesh;
  public fluidRing1: THREE.LineLoop;
  public fluidRing2: THREE.LineLoop;
  public lightCyan: THREE.PointLight;
  public lightMagenta: THREE.PointLight;
  public lightEmerald: THREE.PointLight;

  private currentShape: GeometryType = 'cube';
  private baseScale: number = 0.75;
  private currentScale: number = 0.75;
  private time: number = 0;
  private pulseEnergy: number = 0;
  private hoverAmount: number = 0;
  private materialUniforms: { [key: string]: THREE.IUniform } = {};

  constructor(initialShape: GeometryType = 'cube') {
    this.group = new THREE.Group();
    this.currentShape = initialShape;

    // Subdivided sleek minimal geometry
    const geom = this.createLiquidGeometry(initialShape);

    // Physical Glass Material with Iridescent Refraction & Transmission
    const liquidMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x00f0ff),
      emissive: new THREE.Color(0x0a051d),
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.9,
      thickness: 1.2,
      ior: 1.42,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [120, 380],
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });

    // Custom Shader Injection for Liquid Surface Undulation & Rich Gradient Spectrum
    liquidMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uPulse = { value: 0 };
      shader.uniforms.uHover = { value: 0 };
      shader.uniforms.uMouse = { value: new THREE.Vector2(0, 0) };

      shader.vertexShader = `
        uniform float uTime;
        uniform float uPulse;
        uniform float uHover;
        uniform vec2 uMouse;
        varying vec3 vLiquidNormal;
        varying vec3 vLiquidPosition;
        ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>

        vec3 p = position;
        
        // Multi-frequency organic liquid wave dynamics
        float hoverMod = 1.0 + uHover * 1.5;
        float wave1 = sin(p.x * 3.0 + uTime * 2.0 * hoverMod) * cos(p.y * 2.4 + uTime * 1.5);
        float wave2 = cos(p.z * 3.5 + uTime * 2.2 * hoverMod) * sin(p.x * 2.0 - uTime * 1.2);
        float wave3 = sin(length(p.xy) * 4.5 - uTime * 2.6) * 0.35;

        // Interactive mouse proximity wave ripple
        float mouseDist = length(p.xy - uMouse * 2.0);
        float mouseWave = sin(mouseDist * 6.0 - uTime * 4.0) * exp(-mouseDist * 0.9) * (0.2 + uHover * 0.3);

        float totalDisplacement = (wave1 + wave2 * 0.65 + wave3 + mouseWave) * (0.08 + uHover * 0.12 + uPulse * 0.3);

        transformed += normal * totalDisplacement;
        vLiquidNormal = normal;
        vLiquidPosition = transformed;
        `
      );

      shader.fragmentShader = `
        uniform float uTime;
        uniform float uPulse;
        uniform float uHover;
        varying vec3 vLiquidNormal;
        varying vec3 vLiquidPosition;
        ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        #include <dithering_fragment>

        // Rich Multi-Color Spectral Gradient
        vec3 liquidNorm = normalize(vLiquidNormal);
        float fresnel = pow(1.0 - max(0.0, dot(liquidNorm, vec3(0.0, 0.0, 1.0))), 2.2);

        // Gradient Color Stops
        vec3 cCyan = vec3(0.0, 0.94, 1.0);
        vec3 cMagenta = vec3(0.88, 0.15, 0.95);
        vec3 cIndigo = vec3(0.25, 0.2, 0.85);
        vec3 cGold = vec3(1.0, 0.72, 0.1);
        vec3 cEmerald = vec3(0.06, 0.95, 0.62);

        float t1 = sin(uTime * 1.4 + vLiquidPosition.y * 2.2) * 0.5 + 0.5;
        float t2 = cos(uTime * 1.8 + vLiquidPosition.x * 1.8) * 0.5 + 0.5;

        vec3 gradColor = mix(cCyan, cMagenta, t1);
        gradColor = mix(gradColor, cIndigo, t2 * 0.65);
        gradColor = mix(gradColor, cGold, fresnel * 0.75);
        gradColor = mix(gradColor, cEmerald, uHover * 0.5 * (sin(uTime * 3.5) * 0.5 + 0.5));

        float glowBoost = 0.35 + fresnel * 0.65 + uHover * 0.55 + uPulse * 0.6;
        gl_FragColor.rgb += gradColor * glowBoost;
        `
      );

      this.materialUniforms = shader.uniforms;
    };

    this.liquidMesh = new THREE.Mesh(geom, liquidMaterial);
    this.group.add(this.liquidMesh);

    // Minimal Glowing Plasma Core
    const coreGeom = new THREE.IcosahedronGeometry(0.45, 4);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xd946ef),
      emissive: new THREE.Color(0x00f0ff),
      emissiveIntensity: 0.7,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.75,
    });
    this.innerFluidCore = new THREE.Mesh(coreGeom, coreMat);
    this.group.add(this.innerFluidCore);

    // Delicately Thin Fluid Orbit Rings
    const ringGeom = new THREE.BufferGeometry();
    const ringPoints: THREE.Vector3[] = [];
    const radius = 1.45;
    for (let i = 0; i <= 96; i++) {
      const theta = (i / 96) * Math.PI * 2;
      ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
    }
    ringGeom.setFromPoints(ringPoints);

    const ringMat1 = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x00f0ff),
      transparent: true,
      opacity: 0.35,
    });
    this.fluidRing1 = new THREE.LineLoop(ringGeom, ringMat1);
    this.fluidRing1.rotation.x = Math.PI * 0.35;
    this.group.add(this.fluidRing1);

    const ringMat2 = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xd946ef),
      transparent: true,
      opacity: 0.3,
    });
    this.fluidRing2 = new THREE.LineLoop(ringGeom, ringMat2);
    this.fluidRing2.rotation.y = Math.PI * 0.45;
    this.group.add(this.fluidRing2);

    // Multi-color Interior Point Lights
    this.lightCyan = new THREE.PointLight(0x00f0ff, 3.5, 8);
    this.lightCyan.position.set(1.2, 0.8, 0.8);
    this.group.add(this.lightCyan);

    this.lightMagenta = new THREE.PointLight(0xd946ef, 3.0, 8);
    this.lightMagenta.position.set(-1.2, -0.8, 0.8);
    this.group.add(this.lightMagenta);

    this.lightEmerald = new THREE.PointLight(0x00ff9d, 2.8, 8);
    this.lightEmerald.position.set(0, 1.4, -1.0);
    this.group.add(this.lightEmerald);
  }

  private createLiquidGeometry(type: GeometryType): THREE.BufferGeometry {
    switch (type) {
      case 'prism':
        return new THREE.CylinderGeometry(0.08, 1.0, 1.3, 24, 12);
      case 'cube':
      default:
        return new THREE.BoxGeometry(1.1, 1.1, 1.1, 10, 10, 10);
    }
  }

  public setShape(shape: GeometryType) {
    if (this.currentShape === shape) return;
    this.currentShape = shape;

    const newGeom = this.createLiquidGeometry(shape);
    this.liquidMesh.geometry.dispose();
    this.liquidMesh.geometry = newGeom;

    // Trigger splash pulse energy
    this.pulseEnergy = 1.4;
  }

  public triggerClickPulse() {
    this.pulseEnergy = 2.0;
  }

  public update(delta: number, mouse: THREE.Vector2) {
    this.time += delta;

    // Calculate hover proximity (mouse is normalized [-1, 1])
    const mouseDist = Math.hypot(mouse.x, mouse.y);
    const isHovered = mouseDist < 0.7;
    const targetHover = isHovered ? 1.0 : 0.0;
    this.hoverAmount += (targetHover - this.hoverAmount) * 0.1;

    // Update shader uniforms
    if (this.materialUniforms.uTime) {
      this.materialUniforms.uTime.value = this.time;
    }
    if (this.materialUniforms.uPulse) {
      this.materialUniforms.uPulse.value = this.pulseEnergy;
    }
    if (this.materialUniforms.uHover) {
      this.materialUniforms.uHover.value = this.hoverAmount;
    }
    if (this.materialUniforms.uMouse) {
      this.materialUniforms.uMouse.value.set(mouse.x, mouse.y);
    }

    // Orbit interior color lights for dynamic fluid refractions
    const lTime = this.time * (1.5 + this.hoverAmount * 1.2);
    this.lightCyan.position.x = Math.sin(lTime) * 1.2;
    this.lightCyan.position.z = Math.cos(lTime) * 1.2;

    this.lightMagenta.position.x = Math.cos(lTime * 0.8) * -1.2;
    this.lightMagenta.position.y = Math.sin(lTime * 0.8) * 1.0;

    this.lightEmerald.position.y = Math.cos(lTime * 1.2) * 1.1;
    this.lightEmerald.position.z = Math.sin(lTime * 1.2) * 1.1;

    // Shift inner fluid core color over time & on hover
    if (this.innerFluidCore.material) {
      const coreMat = this.innerFluidCore.material as THREE.MeshPhysicalMaterial;
      const hue = (this.time * 0.1 + this.hoverAmount * 0.2) % 1.0;
      coreMat.color.setHSL(hue, 0.95, 0.55);
      coreMat.emissive.setHSL((hue + 0.3) % 1.0, 0.95, 0.5);
      coreMat.emissiveIntensity = 0.7 + this.hoverAmount * 0.5 + this.pulseEnergy * 0.4;
    }

    // Smooth organic rotations (accelerates on hover)
    const rotSpeed = 0.005 + this.hoverAmount * 0.01 + this.pulseEnergy * 0.025;
    this.group.rotation.y += rotSpeed;
    this.group.rotation.x += rotSpeed * 0.6;

    this.innerFluidCore.rotation.y -= rotSpeed * 1.5;
    this.innerFluidCore.rotation.z += rotSpeed * 1.0;

    this.fluidRing1.rotation.z += rotSpeed * 0.5;
    this.fluidRing2.rotation.z -= rotSpeed * 0.6;

    // Parallax Mouse Tilt
    this.group.rotation.y += (mouse.x * 0.4 - this.group.rotation.y) * 0.06;
    this.group.rotation.x += (-mouse.y * 0.4 - this.group.rotation.x) * 0.06;

    // Pulse Energy Decay
    if (this.pulseEnergy > 0) {
      this.pulseEnergy = Math.max(0, this.pulseEnergy - delta * 2.2);
    }

    // Dynamic Scale: Small base scale (0.75), expands smoothly on hover (up to 1.05) or click pulse
    const targetScale = this.baseScale + this.hoverAmount * 0.3 + this.pulseEnergy * 0.25;
    this.currentScale += (targetScale - this.currentScale) * 0.1;
    this.group.scale.set(this.currentScale, this.currentScale, this.currentScale);
  }

  public dispose() {
    this.liquidMesh.geometry.dispose();
    (this.liquidMesh.material as THREE.Material).dispose();
    this.innerFluidCore.geometry.dispose();
    (this.innerFluidCore.material as THREE.Material).dispose();
    this.fluidRing1.geometry.dispose();
    (this.fluidRing1.material as THREE.Material).dispose();
    this.fluidRing2.geometry.dispose();
    (this.fluidRing2.material as THREE.Material).dispose();
  }
}


