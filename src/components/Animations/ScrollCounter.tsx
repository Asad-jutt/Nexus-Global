import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollCounterProps {
  endValue: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

export const ScrollCounter: React.FC<ScrollCounterProps> = ({
  endValue,
  duration = 2.0,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0
}) => {
  const [currentValue, setCurrentValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setCurrentValue(endValue);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = easedProgress * endValue;
      setCurrentValue(value);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, endValue, duration, prefersReduced]);

  const formattedValue = decimals > 0
    ? currentValue.toFixed(decimals)
    : Math.floor(currentValue).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};
