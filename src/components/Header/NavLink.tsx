import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { NavItemData } from './navigationData';
import { DropdownMenu } from './DropdownMenu';
import { soundEngine } from '../../utils/audio';

interface NavLinkProps {
  navItem: NavItemData;
}

export const NavLink: React.FC<NavLinkProps> = ({ navItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative py-2"
      onMouseEnter={() => {
        setIsHovered(true);
        soundEngine.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        href={navItem.href}
        animate={{
          color: isHovered ? '#00f0ff' : '#cbd5e1',
          scale: isHovered ? 1.04 : 1,
          letterSpacing: isHovered ? '0.5px' : '0px',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="text-sm font-medium tracking-normal text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer py-1 select-none font-sans"
      >
        <span>{navItem.label}</span>
        {navItem.hasDropdown && (
          <motion.div
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-cyan-400 opacity-70"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </motion.a>

      {/* Animated Underline */}
      {isHovered && (
        <motion.div
          layoutId="underline"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.8)]"
          initial={{ width: '0%', opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          exit={{ width: '0%', opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        />
      )}

      {/* Dropdown Menu Overlay */}
      <AnimatePresence>
        {navItem.hasDropdown && isHovered && (
          <DropdownMenu navItem={navItem} onSelect={() => setIsHovered(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};
