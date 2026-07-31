import { ServiceItem, CaseStudy, TeamMember } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'quantum-strategy',
    title: 'Corporate Strategy & Growth',
    subtitle: 'Data-driven business model transformation for high-velocity markets',
    category: 'Strategy & Growth',
    categories: ['Strategy & Growth', 'Finance & M&A'],
    description: 'We formulate long-term corporate strategy, market positioning models, and capital allocation frameworks to navigate macroeconomic shifts.',
    keyOutcomes: [
      'Scenario-based stress testing under extreme market conditions',
      'Capital efficiency optimization across business units',
      'Dynamic roadmap execution aligned with executive goals'
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
    title: 'Digital Transformation & AI Strategy',
    subtitle: 'Modernizing core operations with enterprise AI and automated workflows',
    category: 'Technology & AI',
    categories: ['Technology & AI', 'Operations'],
    description: 'Transitioning legacy operating models into agile, self-optimizing digital networks that scale productivity and decision intelligence.',
    keyOutcomes: [
      'Enterprise-grade workflow automation and orchestration',
      'Proprietary model fine-tuning and domain alignment',
      'Real-time automated compliance, risk controls, and data governance'
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
    title: 'Corporate Finance & M&A Strategy',
    subtitle: 'Strategic capital allocation, balance sheet optimization, and deal valuation',
    category: 'Finance & M&A',
    categories: ['Finance & M&A', 'Strategy & Growth'],
    description: 'Deploying quantitative frameworks to maximize return on invested capital (ROIC) and capture high-value strategic growth opportunities.',
    keyOutcomes: [
      'Precision M&A target identification, deal structuring & synergy modeling',
      'Working capital optimization and capital structure advisory',
      'Post-merger integration roadmaps for rapid value realization'
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
    id: 'cyber-sovereignty',
    title: 'Operations & Cyber Risk Governance',
    subtitle: 'De-risking global networks and zero-trust security architecture',
    category: 'Operations',
    categories: ['Operations', 'Cyber & Infrastructure', 'Technology & AI'],
    description: 'Securing mission-critical digital infrastructure and architecting resilient supply chains against geopolitical and operational disruptions.',
    keyOutcomes: [
      'Zero-trust security schema and data protection protocols',
      'Enterprise risk detection and threat mitigation grids',
      'Supply chain contingency modeling and real-time rerouting'
    ],
    shapePreset: 'prism',
    color: 'from-purple-500 to-indigo-600',
    accentHex: '#a855f7',
    metrics: [
      { label: 'Stockout Reduction', value: '88%' },
      { label: 'Mean-Time-To-Detect', value: '< 1.2s' }
    ]
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-turnaround',
    client: 'Apex Global Financial Group',
    industry: 'Banking & Financial Markets',
    title: 'Institutional Risk Management & Portfolio Optimization',
    headlineStat: '+340%',
    statLabel: 'Cumulative Asset Yield Increase',
    summary: 'Nexus Global re-engineered Apex’s multi-asset trading and risk architecture with real-time portfolio stress testing and automated compliance controls.',
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
    title: 'Predictive Supply Chain Resiliency & Manufacturing Twin',
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
    title: 'Distributed Microgrid Optimization & Power Dispatch',
    headlineStat: '12.8 TWh',
    statLabel: 'Clean Energy Waste Prevented',
    summary: 'Connected 120,000 solar and battery nodes into a self-balancing smart grid that predicts micro-generation curves with 99.4% precision.',
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
    specialization: 'Corporate Strategy & Transformation Practice',
    location: 'London / Zurich',
    bio: 'Former Chief Economist and Strategy Director. Specialist in corporate growth, capital allocation, and business model redesign.',
    highlights: ['Advised 14 Fortune 100 CEOs', 'Author of "Systems Velocity"', 'Ph.D. Economics, Cambridge'],
    avatarGradient: 'from-cyan-500 via-blue-600 to-purple-700',
    shape: 'cube'
  },
  {
    id: 'marcus-reyes',
    name: 'Marcus Reyes',
    role: 'Head of Digital & AI Practice',
    specialization: 'Digital Transformation & Enterprise AI',
    location: 'San Francisco / Tokyo',
    bio: 'Ex-Principal Systems Architect. Led enterprise digital transformations and autonomous workflow integrations for global market leaders.',
    highlights: ['22 Enterprise Tech Patents', 'Built 100M+ Agent Pipelines', 'M.S. Computer Science, Stanford'],
    avatarGradient: 'from-emerald-400 via-teal-600 to-cyan-700',
    shape: 'prism'
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    role: 'Partner, Corporate Finance',
    specialization: 'M&A Advisory & Private Equity Strategy',
    location: 'New York / Singapore',
    bio: 'Pioneered quantitative valuation models that predicted $40B+ in successful synergy realizations over a decade of tier-1 dealmaking.',
    highlights: ['$50B+ Transaction Volume', 'Wall Street 40 Under 40', 'MBA, Wharton School'],
    avatarGradient: 'from-amber-400 via-orange-500 to-rose-600',
    shape: 'prism'
  },
  {
    id: 'vikram-malhotra',
    name: 'Vikram Malhotra',
    role: 'Partner, Cyber Risk Practice',
    specialization: 'Zero-Trust Security & Risk Governance',
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
    title: 'Data-Driven Rigor',
    description: 'We replace subjective opinion with empirical analysis, quantitative modeling, and deep industry telemetry.'
  },
  {
    code: '02',
    title: 'Agile Execution',
    description: 'Accelerating traditional multi-year strategic roadmaps into high-impact 90-day execution milestones.'
  },
  {
    code: '03',
    title: 'Sustainable Growth',
    description: 'Building self-reinforcing enterprise operating models that thrive under volatile market conditions.'
  }
];

