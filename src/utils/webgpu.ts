import * as THREE from 'three';

export interface WebGPUCapability {
  isSupported: boolean;
  adapterInfo?: string;
  backendName: string;
}

/**
 * Checks if browser supports WebGPU and returns capability info.
 */
export async function detectWebGPU(): Promise<WebGPUCapability> {
  if (typeof window === 'undefined' || !('gpu' in navigator)) {
    return {
      isSupported: false,
      backendName: 'WebGL2 Fallback',
    };
  }

  try {
    const gpu = (navigator as unknown as { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu;
    if (!gpu) {
      return { isSupported: false, backendName: 'WebGL2 Fallback' };
    }
    const adapter = await gpu.requestAdapter();
    if (adapter) {
      return {
        isSupported: true,
        backendName: 'WebGPU (Hardware Accelerated)',
      };
    }
  } catch {
    // Silently fall back to WebGL2
  }

  return {
    isSupported: false,
    backendName: 'WebGL2 Fallback',
  };
}

/**
 * Custom Shaders for Astro Base 3D components
 */
export const ParticleShader = {
  vertexShader: `
    uniform float uTime;
    uniform float uMorph;
    uniform float uMouseDistance;
    attribute vec3 aTargetPosition;
    attribute float aSize;
    attribute vec3 aColor;

    varying vec3 vColor;
    varying float vDistance;

    void main() {
      vColor = aColor;

      // Morphing interpolation between base position and target position
      vec3 currentPos = mix(position, aTargetPosition, uMorph);

      // Organic wave noise offset
      float noise = sin(currentPos.x * 2.0 + uTime * 1.5) * cos(currentPos.z * 2.0 + uTime * 1.5) * 0.15;
      currentPos.y += noise;

      // Subtle vortex rotation
      float angle = uTime * 0.2 + length(currentPos.xz) * 0.5;
      mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      currentPos.xz = rot * currentPos.xz;

      vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
      gl_PointSize = aSize * (300.0 / -mvPosition.z) * (1.0 + noise * 2.0);
      gl_Position = projectionMatrix * mvPosition;

      vDistance = abs(mvPosition.z);
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vDistance;

    void main() {
      // Soft circular point shape
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      float alpha = smoothstep(0.5, 0.0, dist) * 0.85;
      
      // Core glow effect
      vec3 finalColor = mix(vColor, vec3(1.0), smoothstep(0.2, 0.0, dist) * 0.5);
      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

export const WavePlaneShader = {
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Multi-frequency wave calculation
      float wave1 = sin(pos.x * 1.5 + uTime * 1.2) * 0.25;
      float wave2 = cos(pos.y * 1.5 + uTime * 0.8) * 0.25;
      
      // Cursor distortion
      float distToMouse = distance(pos.xy, uMouse * 5.0);
      float mouseImpact = exp(-distToMouse * 0.8) * sin(uTime * 4.0 - distToMouse * 3.0) * 0.4;

      pos.z += wave1 + wave2 + mouseImpact;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorLow;
    uniform vec3 uColorHigh;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixFactor = (vElevation + 0.5) / 1.0;
      vec3 color = mix(uColorLow, uColorHigh, clamp(mixFactor, 0.0, 1.0));
      
      // Wireframe glow lines
      vec2 grid = abs(fract(vUv * 30.0 - 0.5) - 0.5) / fwidth(vUv * 30.0);
      float line = min(grid.x, grid.y);
      float gridIntensity = 1.0 - min(line, 1.0);

      vec3 finalColor = color + vec3(gridIntensity * 0.3);
      float alpha = 0.4 + gridIntensity * 0.5;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};
