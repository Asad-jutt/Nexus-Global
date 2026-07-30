import React, { ReactNode } from 'react';
import { motion } from 'motion/react';
import { easingPresets } from '../../utils/animationConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollStaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export const ScrollStaggerContainer: React.FC<ScrollStaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  initialDelay = 0.1
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScrollStaggerItemProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
}

export const ScrollStaggerItem: React.FC<ScrollStaggerItemProps> = ({
  children,
  className = '',
  yOffset = 15
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const itemVariants = {
    hidden: { opacity: 0, y: yOffset, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easingPresets.smooth
      }
    }
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
