import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../../data/consultancyData';
import { ServiceItem } from '../../types';
import { MiniCard3D } from '../3d/MiniCard3D';
import { ServiceModal } from '../ui/ServiceModal';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { ScrollStaggerContainer, ScrollStaggerItem } from '../Animations/ScrollStagger';
import { Layers, ArrowUpRight, Filter } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Strategy & Growth', 'Technology & AI', 'Finance & M&A', 'Operations', 'Cyber & Infrastructure'];

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith('#services-')) return;

      const sub = hash.replace('#services-', '');
      if (sub === 'strategy') {
        setActiveCategory('Strategy & Growth');
        const s = SERVICES_DATA.find((x) => x.id === 'quantum-strategy');
        if (s) setSelectedService(s);
      } else if (sub === 'tech' || sub === 'ai') {
        setActiveCategory('Technology & AI');
        const s = SERVICES_DATA.find((x) => x.id === 'ai-transformation');
        if (s) setSelectedService(s);
      } else if (sub === 'ops') {
        setActiveCategory('Operations');
        const s = SERVICES_DATA.find((x) => x.id === 'cyber-sovereignty');
        if (s) setSelectedService(s);
      } else if (sub === 'change') {
        setActiveCategory('All');
        const s = SERVICES_DATA.find((x) => x.id === 'capital-allocation');
        if (s) setSelectedService(s);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const filteredServices = activeCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) =>
        s.category === activeCategory ||
        (s.categories && s.categories.includes(activeCategory))
      );

  return (
    <section id="services" className="relative py-28 bg-[#08090e] border-t border-white/5">
      {/* Anchor targets for direct dropdown navigation */}
      <div id="services-strategy" className="absolute -top-24" />
      <div id="services-tech" className="absolute -top-24" />
      <div id="services-ops" className="absolute -top-24" />
      <div id="services-ai" className="absolute -top-24" />
      <div id="services-change" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Layers className="w-3.5 h-3.5" />
              Strategic Practice Areas
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              3D Practice Matrix
            </h2>
          </div>

          <p className="text-slate-400 text-sm max-w-md">
            Hover over any practice module to activate its interactive 3D spatial preview. Click for deep-dive execution protocols.
          </p>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.1} className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <Filter className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>

        {/* Service Cards Grid - 4 Columns Layout */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const isHovered = hoveredCardId === service.id;

            return (
              <ScrollStaggerItem key={service.id}>
                <div
                  onMouseEnter={() => {
                    setHoveredCardId(service.id);
                    soundEngine.playHover();
                  }}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedService(service);
                  }}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group relative overflow-hidden h-full"
                >
                  {/* Background Ambient Glow */}
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl transition-opacity duration-300"
                    style={{
                      backgroundColor: service.accentHex,
                      opacity: isHovered ? 0.25 : 0.05,
                    }}
                  />

                  <div>
                    {/* Card Header: 3D Mini Canvas + Category Tag */}
                    <div className="flex items-center justify-between mb-6">
                      <MiniCard3D
                        shape={service.shapePreset}
                        colorHex={service.accentHex}
                        isHovered={isHovered}
                      />

                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-2.5 py-1 rounded bg-slate-900/80 border border-white/5">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="font-syne font-bold text-xl text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-6">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Card Footer: Key Metrics + CTA Icon */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {service.metrics.map((m, idx) => (
                        <div key={idx}>
                          <div className="font-syne font-bold text-sm text-cyan-300">{m.value}</div>
                          <div className="text-[9px] font-mono text-slate-500 uppercase">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-950" />
                    </div>
                  </div>

                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStaggerContainer>

      </div>

      {/* Detail Overlay Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenContact={onOpenContact}
      />
    </section>
  );
};

