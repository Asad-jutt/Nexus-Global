import React from 'react';
import { X, CheckCircle2, ArrowRight, Shield, Globe, Award, Sparkles, Building2, Cpu, LineChart } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export interface ExpertiseDetail {
  id: string;
  title: string;
  category: 'Industry Sector' | 'Core Capability';
  subtitle: string;
  overview: string;
  keyOutcomes: string[];
  metrics: { label: string; value: string }[];
  caseSnippet: string;
}

export const EXPERTISE_DETAILS: Record<string, ExpertiseDetail> = {
  finance: {
    id: 'finance',
    title: 'Financial Services & FinTech Governance',
    category: 'Industry Sector',
    subtitle: 'Institutional risk modeling, automated algorithmic compliance & real-time liquidity telemetry.',
    overview: 'We advise Tier-1 investment banks, sovereign wealth managers, and high-frequency trading platforms on zero-latency risk calculations, Basel IV compliance pipelines, and cloud-native ledger modernizations.',
    keyOutcomes: [
      'Sub-millisecond trade execution & risk exposure checks',
      'Automated regulatory filing with audited audit trails',
      'Legacy core-banking migration to microservices architecture'
    ],
    metrics: [
      { label: 'OPEX Reduction', value: '42%' },
      { label: 'Capital Freed', value: '$1.4B' }
    ],
    caseSnippet: 'Re-engineered liquidity risk engines for a $400B European central clearing house.'
  },
  pharma: {
    id: 'pharma',
    title: 'Healthcare & MedTech Compliance',
    category: 'Industry Sector',
    subtitle: 'AI-assisted clinical trial acceleration, HIPAA/GDPR data vaults & supply chain integrity.',
    overview: 'Accelerating therapeutic discovery pipelines while enforcing bulletproof data privacy boundaries across multi-jurisdictional medical device and pharmaceutical enterprises.',
    keyOutcomes: [
      'Zero-knowledge clinical trial patient data processing',
      '3x acceleration in FDA submission dossier assembly',
      'Cold-chain IoT telemetry with automated anomaly alerts'
    ],
    metrics: [
      { label: 'Time-to-Market', value: '-6 Months' },
      { label: 'Audit Speed', value: '10x' }
    ],
    caseSnippet: 'Deployed zero-trust data vault for top-5 global oncology biotech firm.'
  },
  manufacturing: {
    id: 'manufacturing',
    title: 'Global Manufacturing & Industry 4.0',
    category: 'Industry Sector',
    subtitle: 'Autonomous robotics orchestration, predictive machine telemetry & supply chain digital twins.',
    overview: 'Transforming legacy industrial plants into self-optimizing smart factories using computer vision, predictive maintenance sensors, and dynamic spatial supply modeling.',
    keyOutcomes: [
      'Zero unplanned factory downtime via predictive sensor clusters',
      '3D spatial digital twin for real-time plant throughput optimization',
      'Automated global supplier inventory rerouting during disruption'
    ],
    metrics: [
      { label: 'OEE Increase', value: '+28%' },
      { label: 'Scrap Reduction', value: '35%' }
    ],
    caseSnippet: 'Automated 14 semiconductor fabrication facilities across North America & Asia.'
  },
  cloud: {
    id: 'cloud',
    title: 'Enterprise Tech & Cloud Architecture',
    category: 'Core Capability',
    subtitle: 'High-throughput microservices, WebGPU edge compute & cloud cost optimization.',
    overview: 'Architecting ultra-resilient distributed systems engineered to handle millions of requests per second with sub-10ms response SLAs and zero-downtime deployment pipelines.',
    keyOutcomes: [
      'Multi-cloud fallback topologies with automated failover',
      'Edge-accelerated compute pipelines using WebGPU & WebAssembly',
      '60%+ reduction in AWS/GCP infrastructure expenditure'
    ],
    metrics: [
      { label: 'Availability SLA', value: '99.999%' },
      { label: 'Cloud Savings', value: '62%' }
    ],
    caseSnippet: 'Migrated monolithic ERP for global logistics leader into 120+ micro-services.'
  },
  cyber: {
    id: 'cyber',
    title: 'Risk & Post-Quantum Cybersecurity',
    category: 'Core Capability',
    subtitle: 'Lattice-based cryptography, zero-trust perimeter defense & SOC automation.',
    overview: 'Preparing enterprise data infrastructure for the post-quantum era with NIST-approved lattice cryptography and continuous AI-driven threat vector neutralization.',
    keyOutcomes: [
      'Automated cryptographic inventory & zero-downtime key rotation',
      'Zero-trust identity posture across hybrid multi-cloud environments',
      'Autonomous threat detection response in under 45 seconds'
    ],
    metrics: [
      { label: 'MTTD / MTTR', value: '< 60s' },
      { label: 'Threat Block Rate', value: '99.99%' }
    ],
    caseSnippet: 'Hardened sovereign cloud storage for European defense consortium.'
  },
  global: {
    id: 'global',
    title: 'Global Expansion & Cross-Border Strategy',
    category: 'Core Capability',
    subtitle: 'International hub setup, regulatory navigation & cross-border M&A synergy.',
    overview: 'Guiding multinational enterprises through complex regulatory landscapes, regional hub launches, tax-efficient holding structures, and international market entry.',
    keyOutcomes: [
      'Accelerated setup for operational hubs in London, New York, Singapore & Zurich',
      'Cross-border regulatory alignment across EU AI Act, SEC & MAS',
      'Post-merger technology & operational cultural integration'
    ],
    metrics: [
      { label: 'Hub Setup Time', value: '60 Days' },
      { label: 'Cross-Border Deals', value: '80+' }
    ],
    caseSnippet: 'Established regional HQ and regulatory clearance for $12B FinTech enterprise.'
  }
};

interface ExpertiseModalProps {
  expertiseKey: string | null;
  expertise?: Record<string, ExpertiseDetail>;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ExpertiseModal: React.FC<ExpertiseModalProps> = ({
  expertiseKey,
  expertise = EXPERTISE_DETAILS,
  onClose,
  onOpenContact,
}) => {
  if (!expertiseKey || !expertise[expertiseKey]) return null;

  const detail = expertise[expertiseKey];

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
          {detail.category}
        </div>

        <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
          {detail.title}
        </h3>

        <p className="text-cyan-400 font-mono text-xs mb-6 leading-relaxed">
          {detail.subtitle}
        </p>

        <div className="bg-slate-900/80 p-5 rounded-xl border border-white/10 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
            Practice Overview
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {detail.overview}
          </p>
        </div>

        {/* Key Outcomes */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            Strategic Capabilities & Deliverables
          </h4>
          <div className="space-y-2.5">
            {detail.keyOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {detail.metrics.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
              <div className="font-syne font-extrabold text-2xl text-cyan-300 mb-1">{m.value}</div>
              <div className="text-xs font-mono text-slate-400">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Case Snippet */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 mb-8">
          <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 mb-1">
            Proven Track Record
          </div>
          <p className="text-xs text-slate-300 font-sans italic">
            "{detail.caseSnippet}"
          </p>
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
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-syne font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer"
          >
            Consult Practice Lead
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
