import React from 'react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { ScrollStaggerContainer, ScrollStaggerItem } from '../Animations/ScrollStagger';
import { ScrollCounter } from '../Animations/ScrollCounter';
import { ShieldCheck, TrendingUp, Users, Award, Sparkles } from 'lucide-react';

interface StatItem {
  id: string;
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  shape: 'torus' | 'cylinder' | 'sphere' | 'octahedron';
  decimals?: number;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'engagements',
    value: 500,
    suffix: '+',
    label: 'Global Engagements',
    description: 'Executed across Fortune 500, sovereign funds, and defense prime contractors.',
    icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    accentColor: '#00f0ff',
    shape: 'torus',
  },
  {
    id: 'value-created',
    value: 2.3,
    prefix: '$',
    suffix: 'B+',
    label: 'Client Value Realized',
    description: 'Measured via audited EBITDA expansion, OPEX savings, and capital efficiency.',
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    accentColor: '#00ff9d',
    shape: 'cylinder',
    decimals: 1
  },
  {
    id: 'retention',
    value: 98,
    suffix: '%',
    label: 'Retention & Expansion',
    description: 'Enterprise clients extending multi-year strategic advisory frameworks.',
    icon: <Users className="w-5 h-5 text-purple-400" />,
    accentColor: '#a855f7',
    shape: 'octahedron',
  },
  {
    id: 'experience',
    value: 15,
    suffix: ' Yrs',
    label: 'Pioneering Leadership',
    description: 'A decade and a half of continuous system innovations in high-velocity markets.',
    icon: <Award className="w-5 h-5 text-amber-400" />,
    accentColor: '#ffb800',
    shape: 'sphere',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#08090e] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Audited Operational Benchmarks
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Quantifiable Impact Across Scale
          </h2>
        </ScrollReveal>

        {/* Stats Grid with Embedded 3D Canvases */}
        <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat) => (
            <ScrollStaggerItem key={stat.id}>
              <div
                onMouseEnter={() => soundEngine.playHover()}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden flex flex-col justify-between h-full"
              >
                {/* Top Row: Icon + 3D Shape Scene */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10">
                    {stat.icon}
                  </div>

                  {/* Mini 3D Geometry Preview - Vector SVG Wireframe */}
                  <div className="w-12 h-12 relative flex items-center justify-center p-1.5 rounded-xl bg-slate-900/60 border border-white/5 group-hover:border-white/20 transition-all">
                    <svg
                      viewBox="0 0 64 64"
                      className="w-full h-full group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 ease-out"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {stat.shape === 'torus' && (
                        <g>
                          <ellipse cx="32" cy="32" rx="22" ry="12" stroke={stat.accentColor} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
                          <ellipse cx="32" cy="32" rx="12" ry="6" stroke={stat.accentColor} strokeWidth="1.5" opacity="0.9" />
                          <path d="M10 32 C10 44, 54 44, 54 32" stroke={stat.accentColor} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                        </g>
                      )}
                      {stat.shape === 'cylinder' && (
                        <g>
                          <ellipse cx="32" cy="16" rx="18" ry="7" stroke={stat.accentColor} strokeWidth="1.5" />
                          <ellipse cx="32" cy="48" rx="18" ry="7" stroke={stat.accentColor} strokeWidth="1.5" />
                          <line x1="14" y1="16" x2="14" y2="48" stroke={stat.accentColor} strokeWidth="1.5" />
                          <line x1="50" y1="16" x2="50" y2="48" stroke={stat.accentColor} strokeWidth="1.5" />
                          <line x1="32" y1="23" x2="32" y2="41" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                        </g>
                      )}
                      {stat.shape === 'octahedron' && (
                        <g>
                          <path d="M32 8 L52 32 L32 56 L12 32 Z" stroke={stat.accentColor} strokeWidth="1.5" fill={stat.accentColor} fillOpacity="0.15" />
                          <line x1="12" y1="32" x2="52" y2="32" stroke={stat.accentColor} strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="32" y1="8" x2="32" y2="56" stroke="#ffffff" strokeWidth="1" opacity="0.7" />
                        </g>
                      )}
                      {stat.shape === 'sphere' && (
                        <g>
                          <circle cx="32" cy="32" r="20" stroke={stat.accentColor} strokeWidth="1.5" fill={stat.accentColor} fillOpacity="0.1" />
                          <ellipse cx="32" cy="32" rx="20" ry="8" stroke={stat.accentColor} strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                          <ellipse cx="32" cy="32" rx="8" ry="20" stroke={stat.accentColor} strokeWidth="1" strokeDasharray="2 2" opacity="0.7" />
                        </g>
                      )}
                    </svg>
                  </div>
                </div>

                {/* Number & Label */}
                <div>
                  <div className="font-syne font-extrabold text-4xl text-white mb-1 tracking-tight group-hover:text-cyan-300 transition-colors">
                    <ScrollCounter
                      endValue={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      duration={2.0}
                    />
                  </div>

                  <div className="text-xs font-mono font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
                    {stat.label}
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {stat.description}
                  </p>
                </div>

              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>

      </div>
    </section>
  );
};

