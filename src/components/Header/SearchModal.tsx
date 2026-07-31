import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Lightbulb, Briefcase, Users, FileText } from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { useSanityContent } from '../../hooks/useSanityContent';

interface SearchModalProps {
  onOpenContact: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onOpenContact }) => {
  const { services: SERVICES_DATA, caseStudies: CASE_STUDIES, team: TEAM_MEMBERS, sectionHeadings } = useSanityContent();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpen = () => {
    soundEngine.playClick();
    setIsOpen(true);
  };

  const handleClose = () => {
    soundEngine.playClick();
    setIsOpen(false);
    setQuery('');
  };

  // Filter Search Data
  const searchResults = React.useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    const services = SERVICES_DATA.filter(
      (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    ).map((s) => ({ type: 'Service', title: s.title, subtitle: s.subtitle, href: '#services', icon: Lightbulb }));

    const cases = CASE_STUDIES.filter(
      (c) => c.title.toLowerCase().includes(q) || c.client.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)
    ).map((c) => ({ type: 'Case Study', title: c.title, subtitle: c.client, href: '#case-studies', icon: Briefcase }));

    const team = TEAM_MEMBERS.filter(
      (t) => t.name.toLowerCase().includes(q) || t.role.toLowerCase().includes(q)
    ).map((t) => ({ type: 'Leadership', title: t.name, subtitle: t.role, href: '#team', icon: Users }));

    return [...services, ...cases, ...team];
  }, [query]);

  return (
    <>
      {/* Search Icon Trigger */}
      <motion.button
        onClick={handleOpen}
        onMouseEnter={() => soundEngine.playHover()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-pointer flex items-center gap-2 group"
        title="Search Consultancy Intelligence (Cmd+K)"
      >
        <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
        <span className="hidden xl:inline text-xs text-slate-400 font-mono">Cmd+K</span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl rounded-2xl bg-[#0a0e27]/95 border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.15)] overflow-hidden z-10"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-slate-900/50">
                <Search className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search transformation services, case studies, or advisors..."                  className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none font-sans"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white text-xs font-mono">
                    Clear
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results List */}
              <div className="max-h-96 overflow-y-auto p-4 space-y-2">
                {!query.trim() ? (
                  <div className="py-8 text-center text-slate-500 space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-600 opacity-50" />
                    <p className="text-xs font-mono">{sectionHeadings.search.intro || 'Type to query Nexus Global knowledge matrix'}</p>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      {['Digital Transformation', 'AI Strategy', 'FinTech', 'Supply Chain'].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    No results found for &ldquo;<span className="text-cyan-300 font-semibold">{query}</span>&rdquo;.
                  </div>
                ) : (
                  searchResults.map((res, i) => {
                    const Icon = res.icon;
                    return (
                      <a
                        key={i}
                        href={res.href}
                        onClick={handleClose}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold block">
                              {res.type}
                            </span>
                            <span className="text-sm font-semibold text-slate-200 group-hover:text-cyan-200">
                              {res.title}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                      </a>
                    );
                  })
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-white/5 bg-slate-950/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>ESC to close</span>
                <button
                  onClick={() => {
                    handleClose();
                    onOpenContact();
                  }}
                  className="text-cyan-400 hover:underline"
                >
                  Direct Advisory Inquiry →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
