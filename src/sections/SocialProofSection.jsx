import React, { useState, useEffect } from 'react';
import { socialProof } from '../data/socialProof';

export function SocialProofSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const sectionStyle = {
    padding: 'var(--spacing-24) 0',
    overflow: 'hidden',
    backgroundColor: 'var(--color-bg-subtle)',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: 'var(--spacing-12)',
    padding: '0 var(--spacing-4)',
  };

  const marqueeContainerStyle = {
    display: 'flex',
    overflow: prefersReducedMotion ? 'auto' : 'hidden',
    position: 'relative',
    width: '100%',
  };

  const getMarqueeStyle = (isSecond) => {
    if (prefersReducedMotion) {
      return {
        display: isSecond ? 'none' : 'flex',
        gap: 'var(--spacing-4)',
        padding: '0 var(--spacing-4)',
      };
    }
    
    return {
      display: 'flex',
      gap: 'var(--spacing-4)',
      animation: 'marquee 30s linear infinite',
      paddingLeft: 'var(--spacing-4)',
    };
  };

  const cardStyle = (bg) => ({
    width: '240px',
    height: '320px',
    backgroundColor: bg,
    borderRadius: 'var(--radius-lg)',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'flex-end',
    padding: 'var(--spacing-4)',
    boxShadow: 'var(--shadow-sm)',
    position: 'relative',
  });

  const handleStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#000',
    backdropFilter: 'blur(4px)',
  };

  return (
    <section style={sectionStyle}>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .marquee-wrapper:hover .marquee-track {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div style={headerStyle}>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-4)' }}>Dangling in the wild</h2>
        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)' }}>
          The lucky charms are finding their homes in screens around the world.
        </p>
      </div>

      <div className="marquee-wrapper" style={marqueeContainerStyle}>
        <div className="marquee-track" style={getMarqueeStyle(false)}>
          {socialProof.map((item) => (
            <div key={item.id} style={cardStyle(item.bg)}>
              <span style={handleStyle}>{item.handle}</span>
            </div>
          ))}
        </div>
        
        {/* Duplicate for seamless infinite loop if animation is enabled */}
        {!prefersReducedMotion && (
          <div className="marquee-track" aria-hidden="true" style={getMarqueeStyle(true)}>
            {socialProof.map((item) => (
              <div key={`${item.id}-dup`} style={cardStyle(item.bg)}>
                <span style={handleStyle}>{item.handle}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 'var(--spacing-12)' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Post your own and you can <a href="#" style={{ textDecoration: 'underline' }}>earn your money back</a>.
        </p>
      </div>
    </section>
  );
}
