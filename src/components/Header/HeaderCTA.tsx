import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

interface HeaderCTAProps {
  onOpenContact: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
}

export const HeaderCTA: React.FC<HeaderCTAProps> = ({ onOpenContact }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerParticleBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundEngine.playClick();
    soundEngine.playPulse();

    // Generate burst particles around click location
    const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      angle: (i / 8) * Math.PI * 2,
      speed: 30 + Math.random() * 40,
      color: i % 2 === 0 ? '#00f0ff' : '#d946ef',
    }));

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 600);

    onOpenContact();
  };

  return (
    <div className="relative inline-block">
      {/* Particle Explosions on Click */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(p.angle) * p.speed,
              y: Math.sin(p.angle) * p.speed,
              opacity: 0,
              scale: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ backgroundColor: p.color }}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full pointer-events-none z-50 shadow-[0_0_8px_currentColor]"
          />
        ))}
      </AnimatePresence>

      <motion.button
        onClick={triggerParticleBurst}
        onMouseEnter={() => {
          setIsHovered(true);
          soundEngine.playHover();
        }}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isHovered
            ? '0 0 25px rgba(0, 240, 255, 0.5), inset 0 0 15px rgba(0, 240, 255, 0.2)'
            : '0 0 12px rgba(0, 240, 255, 0.25)',
        }}
        transition={{ duration: 0.25 }}
        className="relative group px-5 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-400/40 text-cyan-300 font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-2 overflow-hidden cursor-pointer backdrop-blur-md"
      >
        {/* Animated Background Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-fuchsia-500/20 opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Shimmer Light Bar */}
        <motion.div
          animate={{ x: isHovered ? ['-100%', '200%'] : '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -skew-x-12"
        />

        <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="relative z-10 text-white font-syne group-hover:text-cyan-200 transition-colors">
          Schedule Advisory
        </span>
        <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </div>
  );
};
