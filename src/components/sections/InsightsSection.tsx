import React, { useState } from 'react';
import { soundEngine } from '../../utils/audio';
import { ScrollReveal } from '../Animations/ScrollReveal';
import { ScrollStaggerContainer, ScrollStaggerItem } from '../Animations/ScrollStagger';
import { BookOpen, ArrowUpRight, Clock, X, Share2, Check } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string[];
}

const ARTICLES_DATA: Article[] = [
  {
    id: 'ai-enterprise-transformation',
    title: 'The Sovereign AI Architecture: Beyond LLM Wrapping in Enterprise Operations',
    category: 'AI & Engineering',
    readTime: '6 min read',
    date: 'July 2026',
    summary: 'Why reliance on high-latency third-party APIs creates strategic fragility, and how custom compute pipelines deliver 10x ROI.',
    author: {
      name: 'Dr. Evelyn Vance',
      role: 'Chief AI Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    content: [
      'In 2026, the artificial intelligence landscape experienced a fundamental paradigm shift. Simple API wrappers and prompt engineering hacks reached their utility ceiling, giving way to sovereign model architectures running inside enterprise trust boundaries.',
      'To achieve zero-latency decision intelligence, forward-thinking enterprises are deploying WebGPU and custom compute topologies directly alongside operational databases.',
      'Our recent benchmark across 40 enterprise migrations revealed a 78% reduction in inference cost and a 12x speedup in real-time document tokenization when moving from cloud API polling to edge-accelerated micro-models.',
    ],
  },
  {
    id: 'resilient-supply-chains',
    title: 'Quant-Driven Supply Resilience in High-Volatility Geo-Political Climes',
    category: 'Operations',
    readTime: '8 min read',
    date: 'June 2026',
    summary: 'Deploying Monte Carlo simulation clusters to predict global maritime bottlenecks 30 days ahead of market movement.',
    author: {
      name: 'Marcus Sterling',
      role: 'Managing Partner',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    },
    content: [
      'Global supply networks have entered an era of perpetual disruption. Traditional deterministic forecasting models fail when non-linear events trigger cascade failures across logistics hubs.',
      'By coupling WebGL-accelerated 3D spatial mapping with real-time AIS vessel telemetry, our advisory team created an autonomous dynamic routing engine capable of evaluating 100,000 supply paths per second.',
      'Clients implementing this real-time rerouting matrix preserved 94% of on-time delivery metrics during Q1 supply chain bottlenecks.',
    ],
  },
  {
    id: 'quantum-safe-cybersecurity',
    title: 'Post-Quantum Cryptography: Preparing Enterprise Storage for Y2Q',
    category: 'Strategy & Security',
    readTime: '5 min read',
    date: 'May 2026',
    summary: 'A strategic roadmap for migrating legacy RSA/ECC encryption schemes to lattice-based NIST post-quantum primitives.',
    author: {
      name: 'Kenji Takahashi',
      role: 'Head of Cyber Strategy',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    },
    content: [
      'The transition to post-quantum cryptography is no longer a theoretical exercise. Adversaries actively execute "Store Now, Decrypt Later" strategy on encrypted communications.',
      'Our team assists chief security officers in conducting automated cryptographic asset inventories and executing zero-downtime key rotation policies.',
      'Discover how lattice-based cryptography can be integrated into high-throughput API gateways without compromising sub-millisecond response SLA guarantees.',
    ],
  },
];

export const InsightsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copied, setCopied] = useState(false);

  return (
    <section id="insights" className="relative py-28 bg-[#08090e] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Thought Leadership & Research
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Frontier Insights & Whitepapers
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md">
            Rigorous analysis, architectural blueprints, and quantitative intelligence published by our practice leads.
          </p>
        </ScrollReveal>

        {/* Articles Grid */}
        <ScrollStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES_DATA.map((article) => (
            <ScrollStaggerItem key={article.id}>
              <article
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedArticle(article);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                    <span className="text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30 font-semibold">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-syne font-bold text-xl text-white group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-cyan-400/40"
                    />
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {article.author.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {article.author.role}
                      </div>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </ScrollStaggerItem>
          ))}
        </ScrollStaggerContainer>

      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 border border-cyan-400/40 relative">
            
            {/* Close Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setSelectedArticle(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-4 mb-8 pr-8">
              <div className="flex items-center gap-3 text-xs font-mono text-cyan-400">
                <span className="bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/30">
                  {selectedArticle.category}
                </span>
                <span>• {selectedArticle.date}</span>
                <span>• {selectedArticle.readTime}</span>
              </div>

              <h2 className="font-syne font-extrabold text-2xl sm:text-4xl text-white">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 pt-2">
                <img
                  src={selectedArticle.author.avatar}
                  alt={selectedArticle.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-cyan-400"
                />
                <div>
                  <div className="text-sm font-bold text-white">
                    {selectedArticle.author.name}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {selectedArticle.author.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-6">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Footer actions */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copied' : 'Share Briefing'}</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedArticle(null);
                }}
                className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-syne font-bold text-xs uppercase cursor-pointer"
              >
                Done Reading
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

