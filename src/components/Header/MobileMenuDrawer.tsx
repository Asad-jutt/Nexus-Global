import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Volume2, VolumeX, Sparkles, ArrowUpRight } from 'lucide-react';
import { NAVIGATION_DATA, NavItemData } from './navigationData';
import { soundEngine } from '../../utils/audio';

interface MobileMenuDrawerProps {
  webGpuActive: boolean;
  onOpenContact: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ webGpuActive, onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  const toggleMenu = () => {
    soundEngine.playClick();
    setIsOpen(!isOpen);
  };

  const handleSubmenuToggle = (label: string) => {
    soundEngine.playHover();
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const handleSoundToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) soundEngine.playClick();
  };

  const handleLinkClick = () => {
    soundEngine.playClick();
    setIsOpen(false);
  };

  const handleCtaClick = () => {
    handleLinkClick();
    onOpenContact();
  };

  return (
    <>
      {/* Animated Hamburger Button */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        className="md:hidden relative z-50 p-2 rounded-xl bg-slate-900/80 border border-white/10 text-white cursor-pointer focus:outline-none"
      >
        <div className="w-6 h-5 flex flex-col justify-between items-center">
          {/* Top Line */}
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 9 : 0,
              backgroundColor: isOpen ? '#00f0ff' : '#ffffff',
            }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 rounded-full block"
          />
          {/* Middle Line */}
          <motion.span
            animate={{
              opacity: isOpen ? 0 : 1,
              x: isOpen ? -10 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="w-6 h-0.5 bg-white rounded-full block"
          />
          {/* Bottom Line */}
          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -9 : 0,
              backgroundColor: isOpen ? '#00f0ff' : '#ffffff',
            }}
            transition={{ duration: 0.3 }}
            className="w-6 h-0.5 rounded-full block"
          />
        </div>
      </button>

      {/* Full-Screen Glassmorphic Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 left-0 right-0 h-screen bg-[#0a0e27]/98 backdrop-blur-3xl z-40 overflow-y-auto px-6 pt-24 pb-12 flex flex-col justify-between md:hidden border-b border-cyan-500/20"
          >
            {/* Top ambient highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-400" />

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 block mb-2 font-bold">
                Navigation Matrix
              </span>

              {NAVIGATION_DATA.map((item: NavItemData) => {
                const isExpanded = openSubmenu === item.label;

                return (
                  <div key={item.label} className="border-b border-white/5 pb-2">
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => handleSubmenuToggle(item.label)}
                          className="w-full flex items-center justify-between py-2 text-left text-lg font-semibold text-slate-100 hover:text-cyan-300 font-syne"
                        >
                          <span>{item.label}</span>
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown className="w-5 h-5 text-cyan-400" />
                          </motion.div>
                        </button>

                        {/* Accordion Items */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pl-4 py-2 space-y-2 border-l border-cyan-500/20 mt-1"
                            >
                              {item.singleDropdownItems?.map((sub) => (
                                <a
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={handleLinkClick}
                                  className="block py-1 text-sm text-slate-300 hover:text-cyan-300 flex items-center justify-between"
                                >
                                  <span>{sub.label}</span>
                                  <span className="text-xs text-slate-500 font-mono">→</span>
                                </a>
                              ))}

                              {item.multiColumnSections?.map((section) => (
                                <div key={section.title} className="space-y-1 pt-1">
                                  <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold block">
                                    {section.title}
                                  </span>
                                  {section.items.map((sub) => (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={handleLinkClick}
                                      className="block py-1 text-sm text-slate-300 hover:text-cyan-300"
                                    >
                                      {sub.label}
                                    </a>
                                  ))}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <a
                        href={item.href}
                        onClick={handleLinkClick}
                        className="block py-2 text-lg font-semibold text-slate-100 hover:text-cyan-300 font-syne"
                      >
                        {item.label}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls & Mobile CTA */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                {/* Audio Toggle */}
                <button
                  onClick={handleSoundToggle}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                  <span>{isMuted ? 'Muted' : 'Audio On'}</span>
                </button>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={handleCtaClick}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 text-slate-950 font-syne font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Schedule Advisory</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
