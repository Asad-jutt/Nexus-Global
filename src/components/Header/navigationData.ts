import {
  Lightbulb,
  Zap,
  Cog,
  TrendingUp,
  Cpu,
  Briefcase,
  Heart,
  Factory,
  Code,
  Shield,
  Users,
  Award,
  Globe,
  BarChart3,
  Layers,
  BookOpen,
  DollarSign,
  LucideIcon
} from 'lucide-react';

export interface SingleDropdownItem {
  icon: LucideIcon;
  label: string;
  description: string;
  href: string;
  badge?: string;
}

export interface MultiColumnDropdownSection {
  title: string;
  items: SingleDropdownItem[];
}

export interface NavItemData {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownType?: 'single' | 'multi';
  singleDropdownItems?: SingleDropdownItem[];
  multiColumnSections?: MultiColumnDropdownSection[];
}

export const NAVIGATION_DATA: NavItemData[] = [
  {
    label: 'Services',
    href: '#services',
    hasDropdown: true,
    dropdownType: 'single',
    singleDropdownItems: [
      {
        icon: Lightbulb,
        label: 'Strategy & Transformation',
        description: 'Corporate agility, market repositioning & growth acceleration.',
        href: '#services-strategy',
        badge: 'Core'
      },
      {
        icon: Zap,
        label: 'Digital Innovation',
        description: 'Next-gen enterprise software, modernization & engineering.',
        href: '#services-tech'
      },
      {
        icon: Cog,
        label: 'Operations Optimization',
        description: 'Supply chain resilience, lean process automation & efficiency.',
        href: '#services-ops'
      },
      {
        icon: Cpu,
        label: 'AI & Data Intelligence',
        description: 'Predictive analytics, custom AI models & data architecture.',
        href: '#services-ai',
        badge: 'New'
      },
      {
        icon: TrendingUp,
        label: 'Change Management',
        description: 'Organizational alignment, executive coaching & culture shift.',
        href: '#services-change'
      }
    ]
  },
  {
    label: 'Expertise',
    href: '#about',
    hasDropdown: true,
    dropdownType: 'multi',
    multiColumnSections: [
      {
        title: 'Industry Sectors',
        items: [
          {
            icon: Briefcase,
            label: 'Financial Services',
            description: 'Banking, FinTech, & risk governance',
            href: '#expertise-finance'
          },
          {
            icon: Heart,
            label: 'Healthcare & Pharma',
            description: 'Regulatory compliance & MedTech',
            href: '#expertise-pharma'
          },
          {
            icon: Factory,
            label: 'Global Manufacturing',
            description: 'Industry 4.0 & automated logistics',
            href: '#expertise-manufacturing'
          }
        ]
      },
      {
        title: 'Core Capabilities',
        items: [
          {
            icon: Code,
            label: 'Enterprise Tech & Cloud',
            description: 'Scalable cloud & microservices',
            href: '#expertise-cloud'
          },
          {
            icon: Shield,
            label: 'Risk & Cybersecurity',
            description: 'Zero-trust architecture & compliance',
            href: '#expertise-cyber'
          },
          {
            icon: Globe,
            label: 'Global Expansion',
            description: 'Cross-border trade & international hubs',
            href: '#expertise-global'
          }
        ]
      }
    ]
  },
  {
    label: 'Approach',
    href: '#process',
    hasDropdown: true,
    dropdownType: 'single',
    singleDropdownItems: [
      {
        icon: Layers,
        label: 'Transformation Process',
        description: 'Our 4-stage execution roadmap: Discover, Blueprint, Scale & Sustenance.',
        href: '#process'
      },
      {
        icon: BarChart3,
        label: 'Performance Metrics',
        description: 'Quantitative ROI tracking, growth benchmarks & impact telemetry.',
        href: '#metrics',
        badge: 'Live Data'
      },
      {
        icon: Briefcase,
        label: 'Client Case Studies',
        description: 'Real enterprise success stories and high-stakes transformations.',
        href: '#case-studies'
      }
    ]
  },
  {
    label: 'Company',
    href: '#about',
    hasDropdown: true,
    dropdownType: 'single',
    singleDropdownItems: [
      {
        icon: Users,
        label: 'Leadership Team',
        description: 'Meet our global managing partners & senior advisors.',
        href: '#team'
      },
      {
        icon: Award,
        label: 'Core Pillars & Governance',
        description: 'Our governing principles, integrity & global vision.',
        href: '#about'
      },
      {
        icon: BookOpen,
        label: 'Thought Leadership & Insights',
        description: 'Market research, executive briefings & consultancy insights.',
        href: '#insights'
      },
      {
        icon: DollarSign,
        label: 'Advisory Retainers & Pricing',
        description: 'Transparent retainer tiers & outcome-based engagements.',
        href: '#pricing'
      }
    ]
  }
];
