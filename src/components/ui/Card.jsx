import React from 'react';

export function Card({ children, className = '', style = {} }) {
  const cardStyle = {
    backgroundColor: 'var(--color-bg-card)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--spacing-6)',
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--color-border)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ...style
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
  };

  return (
    <div 
      style={cardStyle} 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
