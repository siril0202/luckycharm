import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export function DangleCharm({ icon = "🍀", ritualType = "pulse" }) {
  const constraintsRef = useRef(null);
  const charmRef = useRef(null);
  const controls = useAnimation();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    pointerEvents: 'none', // Let clicks pass through container
    zIndex: 20,
  };

  const stringStyle = {
    position: 'absolute',
    top: 0,
    width: '2px',
    height: '150px',
    backgroundColor: 'var(--color-charm-string)',
    transformOrigin: 'top center',
  };

  const charmWrapperStyle = {
    position: 'absolute',
    top: '150px',
    pointerEvents: 'auto', // Re-enable pointer events for the charm
    cursor: 'grab',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80px',
    height: '80px',
    fontSize: '4rem',
    userSelect: 'none',
  };

  const handleDragEnd = (event, info) => {
    // Snap back with spring
    if (!prefersReducedMotion) {
      controls.start({
        x: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 200,
          damping: 10,
          mass: 1
        }
      });
    } else {
      controls.start({ x: 0, y: 0, transition: { duration: 0.1 } });
    }
  };

  return (
    <div style={containerStyle} ref={constraintsRef}>
      {/* Visual string - could be animated to follow the charm but keeping it simple for now */}
      <div style={stringStyle}></div>
      
      <motion.div
        ref={charmRef}
        style={charmWrapperStyle}
        drag={!prefersReducedMotion}
        dragConstraints={constraintsRef}
        dragElastic={0.8}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ cursor: "grabbing" }}
        whileHover={{ scale: 1.05 }}
      >
        <span style={{ display: 'block', transform: 'translateY(-10px)' }}>
          {icon}
        </span>
      </motion.div>
    </div>
  );
}
