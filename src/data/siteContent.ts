import {
  SERVICES_DATA,
  CASE_STUDIES,
  TEAM_MEMBERS,
  CORE_PILLARS,
} from './consultancyData';
import { NAVIGATION_DATA } from '../components/Header/navigationData';
import { EXPERTISE_DETAILS } from '../components/ui/ExpertiseModal';
import type {
  HeroContent,
  SectionHeadingsContent,
  AboutContent,
  StatItemContent,
  ProcessStepContent,
  ArticleContent,
  TestimonialContent,
  TierContent,
  ContactSettingsContent,
  SiteSettingsContent,
  FooterOfficeContent,
  CorePillarContent,
  ServiceItem,
  CaseStudy,
  TeamMember,
} from '../types';

export const DEFAULT_HERO = {
  eyebrow: 'Strategic Management & Digital Transformation',
  headlineLine1: 'Architecting',
  headlineHighlight: 'Exponential',
  headlineLine2: 'Growth.',
  subheadline:
    'Nexus Global unifies corporate strategy, digital transformation, operational excellence, and cyber risk governance for global market leaders.',
  primaryCta: 'Initiate Engagement',
  secondaryCta: 'Explore Capabilities',
  scrollLabel: 'Scroll for Philosophy',
  pulseLabel: 'Pulse 3D Model',
  shapeLabels: ['Liquid Matrix', 'Fluid Flow'],
};

export const DEFAULT_SECTION_HEADINGS = {
  stats: {
    tag: 'Audited Operational Benchmarks',
    title: 'Quantifiable Impact Across Scale',
    intro: '',
  },
  process: {
    tag: 'Methodology Protocol',
    title: 'A Precision Pipeline for Strategic Scale',
    intro:
      'Our 5-stage transformation framework turns complex enterprise problems into repeatable, scalable, and autonomous growth engines.',
  },
  pricing: {
    tag: 'Advisory & Engineering Packages',
    title: 'Transparent Strategic Commitments',
    intro:
      'Predictable capital allocation backed by audited performance milestones and C-suite SLAs.',
  },
  insights: {
    tag: 'Thought Leadership & Research',
    title: 'Frontier Insights & Whitepapers',
    intro:
      'Rigorous analysis, architectural blueprints, and quantitative intelligence published by our practice leads.',
  },
  testimonials: {
    tag: 'Executive Testimonials',
    title: 'Validated by Global C-Suite Leaders',
    intro: '',
  },
  services: {
    tag: 'Strategic Practice Areas',
    title: '3D Practice Matrix',
    intro:
      'Hover over any practice module to activate its interactive 3D spatial preview. Click for deep-dive execution protocols.',
  },
  caseStudies: {
    tag: 'Empirical Case Telemetry',
    title: '3D Value Realization',
    intro: '',
  },
  team: {
    tag: 'Executive Leadership',
    title: 'Systemic Architects & Principals',
    intro:
      'Our leadership combines theoretical physics, quantitative finance, and enterprise software engineering to resolve impossible strategic dilemmas.',
  },
  search: {
    tag: 'Search Intelligence',
    title: 'Search Nexus Global knowledge matrix',
    intro: '',
  },
};

export const DEFAULT_ABOUT = {
  sectionTag: 'Core Philosophy & System Mechanics',
  headlineLine1: 'Conventional advisory diagnoses the past.',
  headlineHighlight: 'We simulate the future.',
  intro:
    'Market leadership in the decade ahead belongs to enterprises capable of calculating complex multi-variable futures in milliseconds. Nexus Global merges quantum strategic modeling with real-time operational execution.',
  selectorTitle: 'Specialized Industry & Capability Sectors',
  selectorHint: 'Select Sector for Deep Dossier',
  computeTitle: 'Real-Time Compute Simulation Pipeline',
  computeSubtitle: 'Running 10,000+ parallel strategic scenarios per enterprise engagement',
  computeMetrics: [
    { label: 'Value Created', value: 18.4, prefix: '$', suffix: 'B+', decimals: 1 },
    { label: 'Model Accuracy', value: 99.98, suffix: '%', decimals: 2 },
    { label: 'Avg Deployment', value: 90, suffix: ' Days' },
  ],
  sectors: [
    { key: 'finance', label: 'Financial Services', desc: 'Institutional risk & FinTech compliance' },
    { key: 'pharma', label: 'Healthcare & Pharma', desc: 'Clinical trials & MedTech privacy' },
    { key: 'manufacturing', label: 'Global Manufacturing', desc: 'Industry 4.0 & supply digital twins' },
    { key: 'cloud', label: 'Enterprise Tech & Cloud', desc: 'Scalable microservices & WebGPU' },
    { key: 'cyber', label: 'Risk & Cybersecurity', desc: 'Zero-trust & post-quantum defense' },
    { key: 'global', label: 'Global Expansion', desc: 'International hubs & cross-border M&A' },
  ],
};

export const DEFAULT_STATS: StatItemContent[] = [
  {
    id: 'engagements',
    value: 500,
    suffix: '+',
    label: 'Global Engagements',
    description:
      'Executed across Fortune 500, sovereign funds, and defense prime contractors.',
    accentColor: '#00f0ff',
    shape: 'torus',
    iconKey: 'ShieldCheck',
  },
  {
    id: 'value-created',
    value: 2.3,
    prefix: '$',
    suffix: 'B+',
    label: 'Client Value Realized',
    description:
      'Measured via audited EBITDA expansion, OPEX savings, and capital efficiency.',
    accentColor: '#00ff9d',
    shape: 'cylinder',
    decimals: 1,
    iconKey: 'TrendingUp',
  },
  {
    id: 'retention',
    value: 98,
    suffix: '%',
    label: 'Retention & Expansion',
    description:
      'Enterprise clients extending multi-year strategic advisory frameworks.',
    accentColor: '#a855f7',
    shape: 'octahedron',
    iconKey: 'Users',
  },
  {
    id: 'experience',
    value: 15,
    suffix: ' Yrs',
    label: 'Pioneering Leadership',
    description:
      'A decade and a half of continuous system innovations in high-velocity markets.',
    accentColor: '#ffb800',
    shape: 'sphere',
    iconKey: 'Award',
  },
];

export const DEFAULT_PROCESS_STEPS = [
  {
    stepNumber: '01',
    title: 'Discovery & Assessment',
    subtitle: 'Deep System Diagnostics',
    description:
      'Autonomous telemetry sweep, operational workflow mapping, and organizational bottleneck identification using high-resolution data models.',
    deliverables: ['System Vulnerability Matrix', 'OPEX Baseline Telemetry', 'Architecture Benchmark'],
    metrics: '-35% Latency in Discovery',
    accentColor: '#00f0ff',
  },
  {
    stepNumber: '02',
    title: 'Strategy Development',
    subtitle: 'Algorithmic Optimization',
    description:
      'Constructing proprietary execution roadmaps, simulation-tested scenarios, and multi-threaded risk mitigation structures.',
    deliverables: ['Quantum-Safe Migration Strategy', 'EBITDA Growth Map', 'Resource Allocation Model'],
    metrics: '99.4% Forecast Accuracy',
    accentColor: '#00ff9d',
  },
  {
    stepNumber: '03',
    title: 'Architecture & Design',
    subtitle: 'Modern Engineering Blueprints',
    description:
      'Engineering fault-tolerant cloud infrastructures, real-time analytics engines, and resilient human-in-the-loop operational loops.',
    deliverables: ['Full-Stack Microservices Design', 'Zero-Trust Security Schema', 'Data Flow Schema'],
    metrics: 'Zero-Downtime Blueprint',
    accentColor: '#a855f7',
  },
  {
    stepNumber: '04',
    title: 'Implementation & Execution',
    subtitle: 'High-Velocity Integration',
    description:
      'Agile deployment sprints with continuous validation, WebGPU-accelerated analytics, and seamless enterprise ERP/CRM integration.',
    deliverables: ['Production Engine Deployment', 'Real-time Telemetry Dashboard', 'CI/CD Pipeline Setup'],
    metrics: '4x Deployment Velocity',
    accentColor: '#3b82f6',
  },
  {
    stepNumber: '05',
    title: 'Monitoring & Continuous Scale',
    subtitle: 'Autonomous Self-Healing Loop',
    description:
      'Continuous AI feedback loops, real-time operational drift detection, and automated scaling across international node clusters.',
    deliverables: ['24/7 Autonomous Telemetry', 'Model Re-training Pipeline', 'Executive KPI Console'],
    metrics: '99.999% Operational Uptime',
    accentColor: '#ffb800',
  },
];

export const DEFAULT_ARTICLES = [
  {
    id: 'ai-enterprise-transformation',
    title: 'The Sovereign AI Architecture: Beyond LLM Wrapping in Enterprise Operations',
    category: 'AI & Engineering',
    readTime: '6 min read',
    date: 'July 2026',
    summary:
      'Why reliance on high-latency third-party APIs creates strategic fragility, and how custom compute pipelines deliver 10x ROI.',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Chief AI Architect',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    content: [
      'In 2026, the artificial intelligence landscape experienced a fundamental paradigm shift. Simple API wrappers and prompt engineering hacks reached their utility ceiling, giving way to sovereign model architectures running inside enterprise trust boundaries.',
      'To achieve zero-latency decision intelligence, forward-thinking enterprises are deploying WebGPU and custom compute topologies directly alongside operational databases.',
      'Our recent benchmark across 40 enterprise migrations revealed a 78% reduction in inference cost and a 12x speedup in real-time document tokenization when moving from cloud API polling to edge-accelerated micro-models.',
    ],
  },
  {
    id: 'resilient-supply-chains',
    title: 'Quant-Driven Supply Resilience in High-Volatility Geo-Political Climes',
    category: 'Operations',
    readTime: '8 min read',
    date: 'June 2026',
    summary:
      'Deploying Monte Carlo simulation clusters to predict global maritime bottlenecks 30 days ahead of market movement.',
    author: {
      name: 'Marcus Sterling',
      role: 'Managing Partner',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    },
    content: [
      'Global supply networks have entered an era of perpetual disruption. Traditional deterministic forecasting models fail when non-linear events trigger cascade failures across logistics hubs.',
      'By coupling WebGL-accelerated 3D spatial mapping with real-time AIS vessel telemetry, our advisory team created an autonomous dynamic routing engine capable of evaluating 100,000 supply paths per second.',
      'Clients implementing this real-time rerouting matrix preserved 94% of on-time delivery metrics during Q1 supply chain bottlenecks.',
    ],
  },
  {
    id: 'quantum-safe-cybersecurity',
    title: 'Post-Quantum Cryptography: Preparing Enterprise Storage for Y2Q',
    category: 'Strategy & Security',
    readTime: '5 min read',
    date: 'May 2026',
    summary:
      'A strategic roadmap for migrating legacy RSA/ECC encryption schemes to lattice-based NIST post-quantum primitives.',
    author: {
      name: 'Kenji Takahashi',
      role: 'Head of Cyber Strategy',
      avatar:
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    },
    content: [
      'The transition to post-quantum cryptography is no longer a theoretical exercise. Adversaries actively execute "Store Now, Decrypt Later" strategy on encrypted communications.',
      'Our team assists chief security officers in conducting automated cryptographic asset inventories and executing zero-downtime key rotation policies.',
      'Discover how lattice-based cryptography can be integrated into high-throughput API gateways without compromising sub-millisecond response SLA guarantees.',
    ],
  },
];

export const DEFAULT_TESTIMONIALS = [
  {
    id: '1',
    quote:
      'Nexus Global redefined our enterprise data layer in 6 months. Their WebGPU telemetry stack reduced our operational latency by 82% and saved us $42M in cloud overhead.',
    author: 'Victoria Sterling',
    title: 'Chief Financial Officer',
    company: 'Apex Sovereign Wealth',
    rating: 5,
    impact: '$42M Annual OPEX Saved',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    accentColor: '#00f0ff',
  },
  {
    id: '2',
    quote:
      'When migrating our core supply chain algorithms to real-time predictive models, Nexus delivered flawless execution. Outstanding strategic clarity and engineering precision.',
    author: 'David Chen',
    title: 'Chief Executive Officer',
    company: 'Hyperion Logistics Group',
    rating: 5,
    impact: '82% Latency Reduction',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    accentColor: '#00ff9d',
  },
  {
    id: '3',
    quote:
      'The single best strategic advisory investment we made this decade. They transformed our legacy ERP into an autonomous decision engine with 99.99% uptime.',
    author: 'Elena Rostova',
    title: 'Chief Operating Officer',
    company: 'AeroSpace Prime Defense',
    rating: 5,
    impact: '99.99% Autonomous Uptime',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    accentColor: '#a855f7',
  },
];

export const DEFAULT_TIERS = [
  {
    id: 'starter',
    name: 'Diagnostic Assessment',
    tagline: 'System Audit & OPEX Discovery',
    price: '$10,000',
    period: 'one-time engagement',
    accentColor: '#00f0ff',
    features: [
      'Full telemetry sweep of legacy codebase & cloud setup',
      'Architecture vulnerability & bottleneck matrix',
      'AI & WebGPU feasibility report with 3-year ROI model',
      '2 C-suite executive briefing sessions',
      'Dedicated practice lead assignment',
    ],
    cta: 'Book Assessment',
  },
  {
    id: 'transformation',
    name: 'Enterprise Transformation',
    tagline: 'Full Architecture Re-engineering',
    price: '$50,000',
    period: '/ month (min 6 months)',
    popular: true,
    accentColor: '#00ff9d',
    features: [
      'Dedicated squad of 5 Principal Architects & Engineers',
      'Custom WebGL/WebGPU telemetry & analytics engine',
      'Sub-millisecond data pipeline implementation',
      'Zero-Downtime legacy ERP & CRM migration',
      'Quantum-safe encryption baseline deployment',
      '24/7 SLA with 15-minute escalation guarantee',
      'Weekly executive governance steering committee',
    ],
    cta: 'Initiate Transformation',
  },
  {
    id: 'sovereign',
    name: 'Sovereign Enterprise',
    tagline: 'Custom Defense & Sovereign Multi-Cloud',
    price: 'Custom',
    period: 'tailored annual retainer',
    accentColor: '#a855f7',
    features: [
      'Fully isolated air-gapped compute & data topologies',
      'Custom LLM/SLM fine-tuning inside trust boundary',
      'On-premise WebGPU compute cluster deployment',
      'Bespoke threat intelligence & zero-trust posture',
      'Board-level strategic advisory & lobbyist alignment',
      'Unlimited dedicated engineering squad scaling',
    ],
    cta: 'Contact Sovereign Desk',
  },
];

export const DEFAULT_CONTACT = {
  sectionTag: 'Strategic Engagement Pipeline',
  headlineLine1: 'Initiate',
  headlineLine2: 'Transformation.',
  intro:
    'Select your primary strategic focus area below. Our interactive 3D grid adjusts telemetry in real-time as you complete your brief.',
  slaNote: 'Response SLA: Within 4 Business Hours',
  ndaNote: 'NDA & Bilateral Confidentiality Enforced',
  serviceOptions: [
    'Quantum Enterprise Strategy',
    'AI & Autonomous Neural Ops',
    'Capital & Value Creation',
    'Sovereign Supply Resilience',
    'Zero-Trust Infrastructure',
  ],
  fieldLabels: {
    fullName: 'Full Name *',
    email: 'Work Email *',
    company: 'Enterprise / Organization',
    serviceVector: 'Service Vector',
    message: 'Strategic Objective / Executive Brief',
  },
  placeholders: {
    fullName: 'Dr. Alexander Vance',
    email: 'alexander@enterprise.com',
    company: 'Apex Global Corp',
    message: 'Outline key transformation milestones, constraints, or timelines...',
  },
  submitButton: 'Submit Strategic Brief',
  submittingLabel: 'Transmitting Encrypted Brief...',
  successTitle: 'Transmission Acknowledged',
  successMessage:
    'Thank you, {name}. Your engagement parameters have been routed to our Managing Partner desk. An advisory principal will respond within 4 business hours.',
  additionalBriefLabel: 'Submit Additional Brief',
};

export const DEFAULT_SITE_SETTINGS = {
  title: 'Nexus Global',
  tagline: 'Sovereign Matrix',
  legalLine: '© {year} Nexus Global Management Consultancy LLC. All Rights Reserved.',
  regulatoryNote: 'Post-Quantum Encrypted',
  footerLinks: ['Privacy Notice', 'Security Audit'],
};

export const DEFAULT_FOOTER_OFFICES = [
  { deskLabel: 'London Desk', timezoneAbbr: 'GMT', location: 'Mayfair HQ' },
  { deskLabel: 'New York Desk', timezoneAbbr: 'EST', location: 'Hudson Yards' },
  { deskLabel: 'Tokyo Desk', timezoneAbbr: 'JST', location: 'Roppongi Hills' },
  { deskLabel: 'Singapore Desk', timezoneAbbr: 'SGT', location: 'Marina Bay' },
];

export interface ContentBundle {
  hero: HeroContent;
  siteSettings: SiteSettingsContent;
  sectionHeadings: SectionHeadingsContent;
  about: AboutContent;
  navigation: import('../components/Header/navigationData').NavItemData[];
  services: ServiceItem[];
  caseStudies: CaseStudy[];
  team: TeamMember[];
  expertise: Record<string, import('../components/ui/ExpertiseModal').ExpertiseDetail>;
  corePillars: CorePillarContent[];
  stats: StatItemContent[];
  processSteps: ProcessStepContent[];
  articles: ArticleContent[];
  testimonials: TestimonialContent[];
  tiers: TierContent[];
  contact: ContactSettingsContent;
  footerOffices: FooterOfficeContent[];
}

export const DEFAULT_CONTENT: ContentBundle = {
  hero: DEFAULT_HERO,
  siteSettings: DEFAULT_SITE_SETTINGS,
  sectionHeadings: DEFAULT_SECTION_HEADINGS,
  about: DEFAULT_ABOUT,
  navigation: NAVIGATION_DATA,
  services: SERVICES_DATA,
  caseStudies: CASE_STUDIES,
  team: TEAM_MEMBERS,
  expertise: EXPERTISE_DETAILS,
  corePillars: CORE_PILLARS,
  stats: DEFAULT_STATS,
  processSteps: DEFAULT_PROCESS_STEPS,
  articles: DEFAULT_ARTICLES,
  testimonials: DEFAULT_TESTIMONIALS,
  tiers: DEFAULT_TIERS,
  contact: DEFAULT_CONTACT,
  footerOffices: DEFAULT_FOOTER_OFFICES,
};

export { SERVICES_DATA, CASE_STUDIES, TEAM_MEMBERS, CORE_PILLARS };
