import React from 'react';
import { motion } from 'motion/react';
import { easingPresets } from '../../utils/animationConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollWordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
}

export const ScrollWordReveal: React.FC<ScrollWordRevealProps> = ({
  text,
  className = '',
  wordClassName = 'inline-block mr-[0.25em]',
  stagger = 0.04
}) => {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');

  if (prefersReduced) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: easingPresets.smooth
      }
    }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={wordVariants} className={wordClassName}>
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
