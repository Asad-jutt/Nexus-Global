import React from 'react';
import { motion, Variants } from 'motion/react';
import { NavItemData } from './navigationData';
import { DropdownItem } from './DropdownItem';

interface DropdownMenuProps {
  navItem: NavItemData;
  onSelect?: () => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ navItem, onSelect }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 12, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.25,
        ease: 'easeOut',
        staggerChildren: 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: 8,
      scale: 0.97,
      transition: { duration: 0.18, ease: 'easeIn' },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  if (navItem.dropdownType === 'multi' && navItem.multiColumnSections) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] p-5 rounded-2xl bg-[#0a0e27]/95 backdrop-blur-3xl border border-cyan-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(0,240,255,0.12)] z-50 overflow-hidden"
      >
        {/* Subtle top ambient glow bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        <div className="grid grid-cols-2 gap-6">
          {navItem.multiColumnSections.map((section, sIdx) => (
            <div key={section.title} className="space-y-2">
              <div className="px-3 py-1 flex items-center justify-between border-b border-white/5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  {section.title}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">0{sIdx + 1}</span>
              </div>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <DropdownItem item={item} onSelect={onSelect} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (navItem.singleDropdownItems) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 p-3 rounded-2xl bg-[#0a0e27]/95 backdrop-blur-3xl border border-cyan-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(0,240,255,0.12)] z-50 overflow-hidden space-y-1"
      >
        {/* Subtle top ambient glow bar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {navItem.singleDropdownItems.map((item) => (
          <motion.div key={item.label} variants={itemVariants}>
            <DropdownItem item={item} onSelect={onSelect} />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return null;
};
