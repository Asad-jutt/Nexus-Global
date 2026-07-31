import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ServiceItem } from '../../types';
import { MiniCard3D } from '../3d/MiniCard3D';
import { ServiceModal } from '../ui/ServiceModal';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { useSanityContent } from '../../hooks/useSanityContent';
import { Layers, ArrowUpRight, Filter } from 'lucide-react';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const { services, sectionHeadings } = useSanityContent();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    ...Array.from(new Set(services.flatMap((s) => (s.categories && s.categories.length > 0 ? s.categories : [s.category])))),
  ];

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (!hash.startsWith('#services-')) return;

      const sub = hash.replace('#services-', '');
      const aliasMap: Record<string, string> = {
        strategy: 'Strategy & Growth',
        tech: 'Technology & AI',
        ai: 'Technology & AI',
        ops: 'Operations',
        change: 'Finance & M&A',
        finance: 'Finance & M&A',
      };
      const resolved = aliasMap[sub];
      if (resolved && categories.includes(resolved)) {
        setActiveCategory(resolved);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter((s) =>
        s.category.toLowerCase().trim() === activeCategory.toLowerCase().trim() ||
        (s.categories && s.categories.some((c) => c.toLowerCase().trim() === activeCategory.toLowerCase().trim()))
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
              {sectionHeadings.services.tag}
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {sectionHeadings.services.title}
            </h2>
          </div>

          <p className="text-slate-400 text-sm max-w-md">
            {sectionHeadings.services.intro}
          </p>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.1} className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <Filter className="w-4 h-4 text-cyan-400 shrink-0 mr-1" />
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.25)] font-semibold scale-105'
                    : 'bg-slate-900/80 text-slate-400 border border-white/10 hover:text-white hover:border-white/20 hover:bg-slate-800/60'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                {cat}
              </button>
            );
          })}
        </ScrollReveal>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[360px]">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const isHovered = hoveredCardId === service.id;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
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

                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 px-2.5 py-1 rounded bg-slate-900/90 border border-cyan-500/20">
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

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

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

