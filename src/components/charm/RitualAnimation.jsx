import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function RitualAnimation({ ritualType, children, trigger }) {
  const controls = useAnimation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (trigger > 0 && !prefersReducedMotion) {
      playRitual();
    }
  }, [trigger, prefersReducedMotion]);

  const playRitual = async () => {
    switch (ritualType) {
      case 'pulse':
        await controls.start({ scale: [1, 1.2, 1], transition: { duration: 0.5 } });
        break;
      case 'wave':
        await controls.start({ rotate: [0, -20, 20, -10, 10, 0], transition: { duration: 0.8 } });
        break;
      case 'drop':
        await controls.start({ y: [0, -20, 0], opacity: [1, 0, 1], transition: { duration: 0.6 } });
        break;
      case 'swing':
        await controls.start({ rotate: [0, -30, 25, -15, 10, -5, 0], transition: { duration: 1.5, type: "spring" } });
        break;
      case 'color-cycle':
        await controls.start({ filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"], transition: { duration: 1.5 } });
        break;
      case 'cinch':
        await controls.start({ scaleY: [1, 0.8, 1.1, 1], transition: { duration: 0.6 } });
        break;
      case 'paint-eye':
        await controls.start({ scale: [1, 1.1, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"], transition: { duration: 0.5 } });
        break;
      case 'wings-spread':
        await controls.start({ scaleX: [1, 1.4, 1], transition: { duration: 0.8 } });
        break;
      case 'spin':
        await controls.start({ rotateY: [0, 360], transition: { duration: 1.2, ease: "easeInOut" } });
        break;
      default:
        await controls.start({ scale: [1, 1.1, 1], transition: { duration: 0.3 } });
    }
  };

  return (
    <motion.div animate={controls} style={{ display: 'inline-block' }}>
      {children}
    </motion.div>
  );
}
