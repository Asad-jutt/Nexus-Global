import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { easingPresets } from '../../utils/animationConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollClipRevealProps {
  children: ReactNode;
  className?: string;
  type?: 'circle' | 'ltr' | 'ttb';
  duration?: number;
  delay?: number;
}

export const ScrollClipReveal: React.FC<ScrollClipRevealProps> = ({
  children,
  className = '',
  type = 'ltr',
  duration = 0.8,
  delay = 0.1
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const clipPaths = {
    circle: {
      hidden: 'circle(0% at center)',
      visible: 'circle(100% at center)'
    },
    ltr: {
      hidden: 'inset(0 100% 0 0)',
      visible: 'inset(0 0 0 0)'
    },
    ttb: {
      hidden: 'inset(100% 0 0 0)',
      visible: 'inset(0 0 0 0)'
    }
  };

  return (
    <motion.div
      initial={{ clipPath: clipPaths[type].hidden, opacity: 0 }}
      whileInView={{ clipPath: clipPaths[type].visible, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        ease: easingPresets.elastic,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
