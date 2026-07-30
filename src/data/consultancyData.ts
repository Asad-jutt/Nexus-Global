import { ServiceItem, CaseStudy, TeamMember } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'quantum-strategy',
    title: 'Quantum Enterprise Strategy',
    subtitle: 'Systemic business model architecture for high-velocity markets',
    category: 'Strategy & Growth',
    description: 'We construct decision models that simulate market volatility, technological disruption, and competitive dynamics in multi-dimensional space.',
    keyOutcomes: [
      'Scenario-based stress testing under extreme macro conditions',
      'Capital efficiency optimization across business units',
      'Dynamic roadmap execution powered by predictive telemetry'
    ],
    shapePreset: 'cube',
    color: 'from-cyan-500 to-blue-600',
    accentHex: '#00f0ff',
    metrics: [
      { label: 'Avg Portfolio ROI', value: '+34%' },
      { label: 'Time-to-Market', value: '-42%' }
    ]
  },
  {
    id: 'ai-transformation',
    title: 'AI & Autonomous Neural Ops',
    subtitle: 'Industrializing Generative AI and autonomous agentic workflows',
    category: 'Technology & AI',
    description: 'Transitioning legacy operations into self-optimizing neural networks that automate complex decision chains and scale human expertise exponentially.',
    keyOutcomes: [
      'Production-grade agentic workflow orchestration',
      'Proprietary model fine-tuning & domain alignment',
      'Real-time automated compliance and risk guardrails'
    ],
    shapePreset: 'cube',
    color: 'from-emerald-400 to-teal-600',
    accentHex: '#00ff9d',
    metrics: [
      { label: 'OPEX Reduction', value: '48%' },
      { label: 'Agent Throughput', value: '12x' }
    ]
  },
  {
    id: 'capital-allocation',
    title: 'Capital & Value Creation',
    subtitle: 'Algorithmic balance sheet optimization and M&A valuation',
    category: 'Finance & M&A',
    description: 'Deploying quantitative frameworks to maximize return on invested capital (ROIC) and uncover asymmetric acquisition opportunities.',
    keyOutcomes: [
      'Precision M&A target identification & synergy modeling',
      'Working capital optimization algorithms',
      'Dynamic debt-equity capital structure engine'
    ],
    shapePreset: 'prism',
    color: 'from-amber-400 to-orange-600',
    accentHex: '#ffb800',
    metrics: [
      { label: 'Synergy Realized', value: '$2.4B+' },
      { label: 'IRR Lift', value: '+680 bps' }
    ]
  },
  {
    id: 'sovereign-supply-chain',
    title: 'Sovereign Supply Resilience',
    subtitle: 'De-risking global supply networks against geopolitical shocks',
    category: 'Operations',
    description: 'Architecting multi-node supply networks with real-time sensor integration and predictive rerouting capabilities.',
    keyOutcomes: [
      'Near-instant route failover simulation',
      'Tier-N supplier graph visualization',
      'Carbon-neutral logistics optimization'
    ],
    shapePreset: 'prism',
    color: 'from-purple-500 to-indigo-600',
    accentHex: '#a855f7',
    metrics: [
      { label: 'Stockout Reduction', value: '88%' },
      { label: 'Disruption Lead Time', value: '14 Days' }
    ]
  },
  {
    id: 'cyber-sovereignty',
    title: 'Zero-Trust Infrastructure',
    subtitle: 'Post-quantum cryptographic defense for critical enterprise assets',
    category: 'Cyber & Infrastructure',
    description: 'Securing mission-critical digital assets against quantum computing decrypt threats and zero-day vulnerabilities.',
    keyOutcomes: [
      'Post-quantum encryption protocol migration',
      'Autonomous threat detection honey-grids',
      'Continuous regulatory compliance telemetry'
    ],
    shapePreset: 'cube',
    color: 'from-cyan-400 to-emerald-500',
    accentHex: '#38bdf8',
    metrics: [
      { label: 'Mean-Time-To-Detect', value: '< 1.2s' },
      { label: 'Zero-Day Shield', value: '99.999%' }
    ]
  },
  {
    id: 'ma-synergy-labs',
    title: 'M&A Integration & Synergy',
    subtitle: 'Accelerating deal thesis execution with rapid operational alignment',
    category: 'Integration',
    description: 'A structured 100-day execution framework that unifies cultural, technological, and commercial vectors of merged entities.',
    keyOutcomes: [
      'Unified data taxonomy & ERP integration',
      'Cross-functional talent retention architecture',
      'Real-time synergy burnup tracking dashboard'
    ],
    shapePreset: 'prism',
    color: 'from-rose-500 to-amber-500',
    accentHex: '#f43f5e',
    metrics: [
      { label: 'Integration Speed', value: '2.5x' },
      { label: 'Retention Rate', value: '96%' }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-turnaround',
    client: 'Apex Global Financial Group',
    industry: 'Banking & Financial Markets',
    title: 'Autonomous Portfolio Optimization & Risk Rebalancing',
    headlineStat: '+340%',
    statLabel: 'Cumulative Asset Yield Increase',
    summary: 'Astro Base redesigned Apex’s multi-asset trading engine with real-time 3D risk surface analytics and WebGPU-accelerated portfolio stress tests.',
    challenge: 'Legacy batch risk models required 8 hours for nightly calculations, leaving $14B in assets exposed to unexpected market volatility.',
    solution: 'Engineered a real-time risk engine that computes 10,000 Monte Carlo scenarios per second, feeding automated hedge rebalancing.',
    impactMetrics: [
      { label: 'Portfolio Alpha', value: '+4.2%' },
      { label: 'Risk Calculation Latency', value: '12ms' },
      { label: 'Capital Saved', value: '$840M' }
    ],
    dataPoints: [
      { year: 'Q1 2024', value: 35, benchmark: 20, label: 'Initial Deploy', category: 'Risk Yield' },
      { year: 'Q2 2024', value: 58, benchmark: 28, label: 'Model Tuning', category: 'Risk Yield' },
      { year: 'Q3 2024', value: 82, benchmark: 35, label: 'Full Agentic Scale', category: 'Risk Yield' },
      { year: 'Q4 2024', value: 110, benchmark: 42, label: 'Market Volatility Peak', category: 'Risk Yield' },
      { year: 'Q1 2025', value: 145, benchmark: 48, label: 'Automated Hedging', category: 'Risk Yield' },
      { year: 'Q2 2025', value: 190, benchmark: 52, label: 'Sovereign Scale', category: 'Risk Yield' }
    ],
    primaryColor: '#00f0ff'
  },
  {
    id: 'aerospace-supply',
    client: 'Orion Defense & Aerospace',
    industry: 'Advanced Manufacturing',
    title: 'Predictive Supply Chain Grid & Zero-Defect Manufacturing',
    headlineStat: '-54%',
    statLabel: 'Supply Latency Reduction',
    summary: 'Constructed an end-to-end digital twin of Orion’s 4,000-tier manufacturing ecosystem to predict component bottlenecks before line stoppages occur.',
    challenge: 'A critical micro-forging delay in Tier 3 suppliers was causing $3.2M daily delays in final aircraft assembly.',
    solution: 'Deployed IoT sensor feeds and neural topology graphs to re-route part allocations dynamically across alternative certified foundries.',
    impactMetrics: [
      { label: 'Assembly Bottlenecks', value: '-82%' },
      { label: 'Tier 3 Visibility', value: '100%' },
      { label: 'Annual Cost Saving', value: '$1.2B' }
    ],
    dataPoints: [
      { year: 'Phase 1', value: 20, benchmark: 15, label: 'Baseline Network', category: 'Throughput' },
      { year: 'Phase 2', value: 45, benchmark: 22, label: 'Digital Twin Active', category: 'Throughput' },
      { year: 'Phase 3', value: 78, benchmark: 30, label: 'Predictive Rerouting', category: 'Throughput' },
      { year: 'Phase 4', value: 115, benchmark: 38, label: 'Global Node Sync', category: 'Throughput' },
      { year: 'Phase 5', value: 160, benchmark: 45, label: 'Zero-Defect Standard', category: 'Throughput' }
    ],
    primaryColor: '#00ff9d'
  },
  {
    id: 'clean-energy-grid',
    client: 'Helios Sovereign Energy',
    industry: 'Renewable Power & Utilities',
    title: 'Distributed Grid Balancing via Quantum Edge Computing',
    headlineStat: '12.8 TWh',
    statLabel: 'Clean Energy Waste Prevented',
    summary: 'Connected 120,000 solar and battery nodes into a self-balancing sovereign power grid that predicts micro-generation curves with 99.4% precision.',
    challenge: 'Unpredictable weather patterns led to frequent renewable curtailment and heavy reliance on expensive peaker plants.',
    solution: 'Implemented real-time edge prediction nodes that balance sub-second load shifts with automated localized battery dispatches.',
    impactMetrics: [
      { label: 'Curtailment Avoided', value: '94%' },
      { label: 'Grid Stability Index', value: '99.99%' },
      { label: 'CO2 Abated', value: '4.8M Tons' }
    ],
    dataPoints: [
      { year: '2022', value: 25, benchmark: 18, label: 'Legacy Grid', category: 'Energy Efficiency' },
      { year: '2023', value: 62, benchmark: 25, label: 'Sensor Rollout', category: 'Energy Efficiency' },
      { year: '2024', value: 108, benchmark: 32, label: 'Quantum Dispatch', category: 'Energy Efficiency' },
      { year: '2025', value: 165, benchmark: 40, label: 'Full Microgrid Sync', category: 'Energy Efficiency' }
    ],
    primaryColor: '#ffb800'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dr-elena-vance',
    name: 'Dr. Elena Vance',
    role: 'Senior Managing Partner',
    specialization: 'Quantum Economics & Enterprise Transformation',
    location: 'London / Zurich',
    bio: 'Former Chief Economist at European Strategic Reserves. Pioneer in applying high-dimensional chaos theory to corporate balance sheet design.',
    highlights: ['Advised 14 Fortune 100 CEOs', 'Author of "Systems Velocity"', 'Ph.D. Theoretical Physics, Cambridge'],
    avatarGradient: 'from-cyan-500 via-blue-600 to-purple-700',
    shape: 'cube'
  },
  {
    id: 'marcus-reyes',
    name: 'Marcus Reyes',
    role: 'Head of AI & Autonomous Ops',
    specialization: 'Agentic Workflows & Neural Engineering',
    location: 'San Francisco / Tokyo',
    bio: 'Ex-DeepMind Principal Systems Architect. Led the deployment of autonomous decision grids across global semiconductor manufacturers.',
    highlights: ['22 AI Patents', 'Built 100M+ Agent Pipelines', 'M.S. Computer Science, Stanford'],
    avatarGradient: 'from-emerald-400 via-teal-600 to-cyan-700',
    shape: 'prism'
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    role: 'Partner, Capital Allocation',
    specialization: 'Quantitative M&A & Private Equity Strategy',
    location: 'New York / Singapore',
    bio: 'Pioneered algorithmic valuation models that predicted $40B+ in successful synergy realizations over a decade of tier-1 dealmaking.',
    highlights: ['$50B+ Transaction Volume', 'Wall Street 40 Under 40', 'MBA, Wharton School'],
    avatarGradient: 'from-amber-400 via-orange-500 to-rose-600',
    shape: 'prism'
  },
  {
    id: 'vikram-malhotra',
    name: 'Vikram Malhotra',
    role: 'Partner, Sovereign Cyber Defense',
    specialization: 'Zero-Trust Architecture & Post-Quantum Security',
    location: 'Zurich / Dubai',
    bio: 'Former Director of Cyber Intelligence for NATO Defense Tech. Architected sovereign zero-trust grids for global banking consortiums.',
    highlights: ['NATO Cyber Resilience Award', 'Author of "Quantum Shield"', 'B.S. Electrical Engineering, MIT'],
    avatarGradient: 'from-purple-500 via-indigo-600 to-cyan-600',
    shape: 'cube'
  }
];

export const CORE_PILLARS = [
  {
    code: '01',
    title: 'Mathematical Rigor',
    description: 'We replace subjective opinion with high-dimensional simulation and empirical telemetry.'
  },
  {
    code: '02',
    title: 'Exponential Velocity',
    description: 'Executing 12-month strategic transformations in 90 days using agentic AI workflow engines.'
  },
  {
    code: '03',
    title: 'Sovereign Autonomy',
    description: 'Building self-reinforcing enterprise systems that thrive under extreme global volatility.'
  }
];
