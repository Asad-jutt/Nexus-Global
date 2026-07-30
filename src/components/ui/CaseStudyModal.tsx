import React from 'react';
import { CaseStudy } from '../../types';
import { X, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose, onOpenContact }) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel p-8 rounded-2xl border border-cyan-500/40 text-slate-100 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
          {caseStudy.client} • {caseStudy.industry}
        </div>

        <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-4">
          {caseStudy.title}
        </h3>

        {/* Big Impact Highlight */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-950/60 to-slate-900 border border-cyan-500/30 mb-6 flex items-center justify-between">
          <div>
            <div className="font-syne font-extrabold text-4xl text-cyan-300">{caseStudy.headlineStat}</div>
            <div className="text-xs font-mono text-slate-300 uppercase">{caseStudy.statLabel}</div>
          </div>
          <TrendingUp className="w-10 h-10 text-cyan-400 shrink-0 opacity-80" />
        </div>

        {/* Challenge vs Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-white/10">
            <h4 className="text-xs font-mono uppercase text-rose-400 mb-2">
              Strategic Challenge
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-white/10">
            <h4 className="text-xs font-mono uppercase text-emerald-400 mb-2">
              Astro Base Solution
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            Verified Value Outcomes
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {caseStudy.impactMetrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                <div className="font-syne font-bold text-lg text-emerald-300">{m.value}</div>
                <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
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
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer"
          >
            Schedule Similar Transformation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
