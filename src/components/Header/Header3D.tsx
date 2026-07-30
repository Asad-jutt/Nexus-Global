import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { Logo3D } from './Logo3D';
import { NAVIGATION_DATA } from './navigationData';
import { NavLink } from './NavLink';
import { SearchModal } from './SearchModal';
import { HeaderCTA } from './HeaderCTA';
import { MobileMenuDrawer } from './MobileMenuDrawer';
import { soundEngine } from '../../utils/audio';

interface Header3DProps {
  webGpuActive: boolean;
  onOpenContact: () => void;
}

export const Header3D: React.FC<Header3DProps> = ({ webGpuActive, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(scrollY / maxScroll, 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) soundEngine.playClick();
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0e27]/85 backdrop-blur-2xl border-b border-cyan-500/15 h-20 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
          : 'bg-[#0a0e27]/40 backdrop-blur-lg border-b border-white/5 h-20'
      }`}
    >
      {/* Scroll Progress Line (Accent Top Line) */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-emerald-400 transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Company 3D Logo (Left Side) */}
        <Logo3D />

        {/* Main Desktop Navigation Items (Center) */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAVIGATION_DATA.map((item) => (
            <NavLink key={item.label} navItem={item} />
          ))}
        </nav>

        {/* Right Side Elements */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search Intelligence Modal */}
          <SearchModal onOpenContact={onOpenContact} />

          {/* Audio Synthesizer Mute Toggle */}
          <motion.button
            onClick={handleSoundToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute UI Synthesizer' : 'Mute UI Synthesizer'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </motion.button>

          {/* CTA Button */}
          <HeaderCTA onOpenContact={onOpenContact} />
        </div>

        {/* Mobile Hamburger Toggle & Drawer */}
        <MobileMenuDrawer webGpuActive={webGpuActive} onOpenContact={onOpenContact} />
      </div>
    </motion.header>
  );
};
