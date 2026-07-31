import React, { useState, useEffect } from 'react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { ScrollStaggerContainer, ScrollStaggerItem } from '../Animations/ScrollStagger';
import { ScrollCounter } from '../Animations/ScrollCounter';
import { Cpu, Sparkles, Briefcase, Heart, Factory, Code, Shield, Globe, ArrowUpRight } from 'lucide-react';
import { ExpertiseModal, EXPERTISE_DETAILS } from '../ui/ExpertiseModal';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact = () => {} }) => {
  const [activeExpertiseKey, setActiveExpertiseKey] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith('#expertise-')) return;
      const key = hash.replace('#expertise-', '');
      if (EXPERTISE_DETAILS[key]) {
        setActiveExpertiseKey(key);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const sectors = [
    { key: 'finance', label: 'Financial Services', icon: Briefcase, desc: 'Institutional risk & FinTech compliance' },
    { key: 'pharma', label: 'Healthcare & Pharma', icon: Heart, desc: 'Clinical trials & MedTech privacy' },
    { key: 'manufacturing', label: 'Global Manufacturing', icon: Factory, desc: 'Industry 4.0 & supply digital twins' },
    { key: 'cloud', label: 'Enterprise Tech & Cloud', icon: Code, desc: 'Scalable microservices & WebGPU' },
    { key: 'cyber', label: 'Risk & Cybersecurity', icon: Shield, desc: 'Zero-trust & post-quantum defense' },
    { key: 'global', label: 'Global Expansion', icon: Globe, desc: 'International hubs & cross-border M&A' },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#08090e] overflow-hidden border-t border-white/5">
      {/* Invisible Sub-anchors for Dropdown navigation */}
      <div id="expertise-finance" className="absolute -top-24" />
      <div id="expertise-pharma" className="absolute -top-24" />
      <div id="expertise-manufacturing" className="absolute -top-24" />
      <div id="expertise-cloud" className="absolute -top-24" />
      <div id="expertise-cyber" className="absolute -top-24" />
      <div id="expertise-global" className="absolute -top-24" />

      {/* Subtle Background Accent Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Core Philosophy & System Mechanics
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
            Conventional advisory diagnoses the past. <br />
            <span className="text-gradient-emerald">We simulate the future.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Market leadership in the decade ahead belongs to enterprises capable of calculating complex multi-variable futures in milliseconds. Nexus Global merges quantum strategic modeling with real-time operational execution.
          </p>
        </ScrollReveal>

        {/* Sector & Capability Quick Selector Grid */}
        <div className="mb-16">
          <ScrollReveal className="flex items-center justify-between mb-6">
            <h3 className="font-syne font-bold text-xl text-white">
              Specialized Industry & Capability Sectors
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              Select Sector for Deep Dossier
            </span>
          </ScrollReveal>

          <ScrollStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sec) => {
              const Icon = sec.icon;
              return (
                <ScrollStaggerItem key={sec.key}>
                  <div
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveExpertiseKey(sec.key);
                    }}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-4 rounded-xl glass-panel border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex items-center justify-between h-full"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-syne font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {sec.label}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {sec.desc}
                        </div>
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </ScrollStaggerItem>
              );
            })}
          </ScrollStaggerContainer>
        </div>


        {/* Quant Metric Banner */}
        <ScrollReveal delay={0.2} className="mt-16 p-8 rounded-2xl glass-panel border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-slate-900/90 via-cyan-950/20 to-slate-900/90">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-lg text-white">
                Real-Time Compute Simulation Pipeline
              </h4>
              <p className="text-slate-400 text-xs font-mono">
                Running 10,000+ parallel strategic scenarios per enterprise engagement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 w-full md:w-auto justify-around">
            <div>
              <div className="font-syne font-extrabold text-2xl text-cyan-400">
                <ScrollCounter endValue={18.4} prefix="$" suffix="B+" decimals={1} />
              </div>
              <div className="text-[11px] font-mono text-slate-400">Value Created</div>
            </div>
            <div>
              <div className="font-syne font-extrabold text-2xl text-emerald-400">
                <ScrollCounter endValue={99.98} suffix="%" decimals={2} />
              </div>
              <div className="text-[11px] font-mono text-slate-400">Model Accuracy</div>
            </div>
            <div>
              <div className="font-syne font-extrabold text-2xl text-purple-400">
                <ScrollCounter endValue={90} suffix=" Days" />
              </div>
              <div className="text-[11px] font-mono text-slate-400">Avg Deployment</div>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Expertise Sector Dossier Modal */}
      <ExpertiseModal
        expertiseKey={activeExpertiseKey}
        onClose={() => setActiveExpertiseKey(null)}
        onOpenContact={onOpenContact}
      />
    </section>
  );
};

