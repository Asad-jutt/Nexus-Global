import React from 'react';
import { ServiceItem } from '../../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onOpenContact }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel p-8 rounded-2xl border border-cyan-500/40 text-slate-100 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-500" />

        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          {service.category}
        </div>

        <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
          {service.title}
        </h3>

        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          {service.subtitle}
        </p>

        <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
            Execution Framework
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Outcomes */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            Core Measurable Deliverables
          </h4>
          <div className="space-y-2.5">
            {service.keyOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {service.metrics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
              <div className="font-syne font-extrabold text-2xl text-cyan-300 mb-1">{m.value}</div>
              <div className="text-xs font-mono text-slate-400">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
          >
            Book Capability Session
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
