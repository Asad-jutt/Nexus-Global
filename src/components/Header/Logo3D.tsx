import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundEngine } from '../../utils/audio';
import { MiniCard3D } from '../3d/MiniCard3D';

export const Logo3D: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.a
      href="#"
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        soundEngine.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-3.5 group cursor-pointer select-none"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* 3D Micro Icon Container */}
      <div className="relative w-10 h-10 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center overflow-hidden shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all">
        {/* Glow backdrop behind 3D shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-fuchsia-500/10 opacity-70 group-hover:opacity-100 transition-opacity" />
        
        {/* Mini 3D WebGL Cube Model */}
        <div className="w-9 h-9 relative z-10 pointer-events-none">
          <MiniCard3D shape="cube" colorHex="#00f0ff" isHovered={isHovered} />
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="font-syne font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5 leading-none">
          NEXUS
          <motion.span
            animate={{
              color: isHovered ? '#38bdf8' : '#00f0ff',
              textShadow: isHovered ? '0 0 12px rgba(0, 240, 255, 0.8)' : '0 0 0px transparent'
            }}
            transition={{ duration: 0.25 }}
            className="text-cyan-400"
          >
            GLOBAL
          </motion.span>
        </div>
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mt-1 block leading-none">
          Management Consultancy
        </span>
      </div>
    </motion.a>
  );
};
