import type { ReactNode } from 'react';

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
  categories?: string[];
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

export interface HeroContent {
  eyebrow: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  scrollLabel: string;
  pulseLabel: string;
  shapeLabels: string[];
}

export interface SectionHeadingContent {
  tag: string;
  title: string;
  intro: string;
}

export interface SectionHeadingsContent {
  stats: SectionHeadingContent;
  process: SectionHeadingContent;
  pricing: SectionHeadingContent;
  insights: SectionHeadingContent;
  testimonials: SectionHeadingContent;
  services: SectionHeadingContent;
  caseStudies: SectionHeadingContent;
  team: SectionHeadingContent;
  search: SectionHeadingContent;
}

export interface ComputeMetricContent {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export interface SectorCardContent {
  key: string;
  label: string;
  desc: string;
}

export interface AboutContent {
  sectionTag: string;
  headlineLine1: string;
  headlineHighlight: string;
  intro: string;
  selectorTitle: string;
  selectorHint: string;
  computeTitle: string;
  computeSubtitle: string;
  computeMetrics: ComputeMetricContent[];
  sectors: SectorCardContent[];
}

export interface StatItemContent {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
  accentColor: string;
  shape: 'torus' | 'cylinder' | 'sphere' | 'octahedron';
  decimals?: number;
  iconKey: string;
}

export interface ProcessStepContent {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metrics: string;
  accentColor: string;
}

export interface ArticleAuthorContent {
  name: string;
  role: string;
  avatar: string;
}

export interface ArticleContent {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  author: ArticleAuthorContent;
  content: string[];
}

export interface TestimonialContent {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  rating: number;
  impact: string;
  avatar: string;
  accentColor: string;
}

export interface TierContent {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  popular?: boolean;
  accentColor: string;
  features: string[];
  cta: string;
}

export interface CorePillarContent {
  code: string;
  title: string;
  description: string;
}

export interface FooterOfficeContent {
  deskLabel: string;
  timezoneAbbr: string;
  location: string;
}

export interface ContactSettingsContent {
  sectionTag: string;
  headlineLine1: string;
  headlineLine2: string;
  intro: string;
  slaNote: string;
  ndaNote: string;
  serviceOptions: string[];
  fieldLabels: {
    fullName: string;
    email: string;
    company: string;
    serviceVector: string;
    message: string;
  };
  placeholders: {
    fullName: string;
    email: string;
    company: string;
    message: string;
  };
  submitButton: string;
  submittingLabel: string;
  successTitle: string;
  successMessage: string;
  additionalBriefLabel: string;
}

export interface SiteSettingsContent {
  title: string;
  tagline: string;
  legalLine: string;
  regulatoryNote: string;
  footerLinks: string[];
}
