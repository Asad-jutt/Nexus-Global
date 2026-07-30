import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'motion/react';
import { easingPresets } from '../../utils/animationConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollRevealProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 20,
  duration = 0.6,
  once = true,
  ...props
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        duration,
        ease: easingPresets.smooth,
        delay
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
