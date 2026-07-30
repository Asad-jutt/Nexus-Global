import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SingleDropdownItem } from './navigationData';
import { soundEngine } from '../../utils/audio';

interface DropdownItemProps {
  item: SingleDropdownItem;
  onSelect?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ item, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  const handleClick = (e: React.MouseEvent) => {
    soundEngine.playClick();
    if (onSelect) onSelect();
  };

  return (
    <motion.a
      href={item.href}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        soundEngine.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-start gap-3.5 p-3 rounded-xl cursor-pointer relative group overflow-hidden transition-colors"
      animate={{
        backgroundColor: isHovered ? 'rgba(0, 217, 255, 0.1)' : 'transparent',
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Animated Left Glowing Accent Bar */}
      <motion.div
        className="absolute left-0 top-2 bottom-2 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r shadow-[0_0_10px_rgba(0,240,255,0.8)]"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Icon Container with subtle glass ring */}
      <motion.div
        className="w-10 h-10 rounded-lg bg-slate-900/90 border border-white/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-cyan-400/40"
        animate={{
          scale: isHovered ? 1.15 : 1,
          borderColor: isHovered ? 'rgba(0, 217, 255, 0.5)' : 'rgba(255, 255, 255, 0.1)',
        }}
        transition={{ duration: 0.2 }}
      >
        <Icon className={`w-5 h-5 transition-colors ${isHovered ? 'text-cyan-300' : 'text-slate-400'}`} />
      </motion.div>

      {/* Label, Description & Badge */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{
              color: isHovered ? '#00f0ff' : '#ffffff',
              x: isHovered ? 2 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="text-sm font-semibold text-slate-100 tracking-wide block truncate"
          >
            {item.label}
          </motion.span>
          {item.badge && (
            <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shrink-0">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 leading-relaxed font-sans">
          {item.description}
        </p>
      </div>

      {/* Sliding Arrow Icon */}
      <motion.span
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400 text-sm font-mono font-bold"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
        transition={{ duration: 0.2 }}
      >
        →
      </motion.span>
    </motion.a>
  );
};
