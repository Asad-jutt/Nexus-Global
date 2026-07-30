export type GeometryType = 'cube' | 'prism';

export type QualityPreset = 'high' | 'balanced' | 'saver';

export interface PerformanceStats {
  fps: number;
  frameTimeMs: number;
  drawCalls: number;
  triangles: number;
  rendererType: 'WebGPU' | 'WebGL2' | 'WebGL';
  qualityPreset: QualityPreset;
  webGpuSupported: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  keyOutcomes: string[];
  shapePreset: GeometryType;
  color: string;
  accentHex: string;
  metrics: { label: string; value: string }[];
}

export interface DataPoint3D {
  year: string;
  value: number; // e.g. 100 base
  benchmark: number;
  label: string;
  category: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  headlineStat: string;
  statLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  dataPoints: DataPoint3D[];
  primaryColor: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  location: string;
  bio: string;
  highlights: string[];
  avatarGradient: string;
  shape: GeometryType;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company: string;
  serviceInterest: string;
  budgetRange: string;
  message: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}
