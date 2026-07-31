import React, { useState } from 'react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { ScrollStaggerContainer, ScrollStaggerItem } from '../Animations/ScrollStagger';
import { useSanityContent } from '../../hooks/useSanityContent';
import type { TierContent } from '../../types';
import { Check, Zap, Sparkles, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { tiers, sectionHeadings } = useSanityContent();
  const TIERS: TierContent[] = tiers;
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <section id="pricing" className="relative py-28 bg-[#08090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5" />
            {sectionHeadings.pricing.tag}
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            {sectionHeadings.pricing.title}
          </h2>
          <p className="text-slate-400 text-sm mt-3">
            {sectionHeadings.pricing.intro}
          </p>
        </ScrollReveal>

        {/* Pricing Grid */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => {
            const isPopular = tier.popular;
            return (
              <ScrollStaggerItem key={tier.id}>
                <div
                  onMouseEnter={() => {
                    soundEngine.playHover();
                    setHoveredTier(tier.id);
                  }}
                  onMouseLeave={() => setHoveredTier(null)}
                  className={`glass-panel rounded-3xl p-8 border transition-all duration-300 relative flex flex-col justify-between h-full ${
                    isPopular
                      ? 'border-cyan-400 bg-cyan-950/30 shadow-2xl shadow-cyan-500/10 scale-102 z-10'
                      : 'border-white/10 hover:border-white/30 bg-slate-900/60'
                  }`}
                >
                  {/* Popular Ribbon */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-syne font-extrabold text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-cyan-400/20">
                      <Sparkles className="w-3 h-3" />
                      MOST REQUESTED FRAMEWORK
                    </div>
                  )}

                  <div>
                    {/* Tier Name */}
                    <div className="font-syne font-extrabold text-2xl text-white mb-1">
                      {tier.name}
                    </div>
                    <p className="text-cyan-400 font-mono text-xs mb-6">
                      {tier.tagline}
                    </p>

                    {/* Price */}
                    <div className="mb-8 pb-6 border-b border-white/10">
                      <span className="font-syne font-black text-4xl sm:text-5xl text-white tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-slate-400 font-mono text-xs block mt-1">
                        {tier.period}
                      </span>
                    </div>

                    {/* Feature Checklist */}
                    <div className="space-y-3.5 mb-8">
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                        Included Capabilities
                      </div>
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                          <div className="p-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-3.5 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg shadow-cyan-400/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>

      </div>
    </section>
  );
};

