export const easingPresets = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  elastic: [0.34, 1.56, 0.64, 1],
  easeOut: [0.0, 0.0, 0.58, 1.0],
  easeInOut: [0.42, 0, 0.58, 1]
} as const;

export const animationTiming = {
  heroTitle: { duration: 0.6, delay: 0 },
  heroSubtitle: { duration: 0.6, delay: 0.15 },
  heroGeometry: { duration: 0.8, delay: 0.2 },
  heroCta: { duration: 0.5, delay: 0.5 },
  scrollHint: { duration: 0.4, delay: 0.8 },
  
  cardGrid: { duration: 0.5, stagger: 0.08, delay: 0.1 },
  fadeIn: { duration: 0.6, delay: 0.1 },
  clipReveal: { duration: 0.8, delay: 0.1 },
  textWord: { duration: 0.3, stagger: 0.04 },
  counter: { duration: 2.0, delay: 0.1 }
} as const;

export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easingPresets.smooth,
      delay: customDelay
    }
  })
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: (staggerDelay: number = 0.08) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1
    }
  })
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.97 },
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

export const clipPathVariants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easingPresets.elastic
    }
  }
};
