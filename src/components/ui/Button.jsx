import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  href, 
  onClick, 
  className = '', 
  style = {},
  ...props
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-3) var(--spacing-6)',
    borderRadius: 'var(--radius-full)',
    fontWeight: '600',
    fontSize: 'var(--font-size-base)',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
  };

  const variants = {
    primary: {
      backgroundColor: 'var(--color-accent)',
      color: '#fff',
      boxShadow: 'var(--shadow-md)',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text)',
      padding: 'var(--spacing-2) var(--spacing-4)',
    }
  };

  const combinedStyle = { ...baseStyle, ...variants[variant], ...style };

  const handleMouseEnter = (e) => {
    if (variant === 'primary') {
      e.target.style.backgroundColor = 'var(--color-accent-hover)';
      e.target.style.transform = 'translateY(-1px)';
      e.target.style.boxShadow = 'var(--shadow-lg)';
    } else if (variant === 'secondary') {
      e.target.style.backgroundColor = 'var(--color-bg-subtle)';
    }
  };

  const handleMouseLeave = (e) => {
    if (variant === 'primary') {
      e.target.style.backgroundColor = 'var(--color-accent)';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = 'var(--shadow-md)';
    } else if (variant === 'secondary') {
      e.target.style.backgroundColor = 'transparent';
    }
  };

  if (href) {
    return (
      <a 
        href={href} 
        style={combinedStyle} 
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      style={combinedStyle} 
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
