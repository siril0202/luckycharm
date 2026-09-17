import React from 'react';

export function SectionHeading({ title, subtitle, centered = false }) {
  const containerStyle = {
    textAlign: centered ? 'center' : 'left',
    marginBottom: 'var(--spacing-12)',
    maxWidth: centered ? '800px' : '100%',
    margin: centered ? '0 auto var(--spacing-12)' : '0 0 var(--spacing-12) 0'
  };

  const titleStyle = {
    fontSize: 'var(--font-size-3xl)',
    marginBottom: 'var(--spacing-4)',
    color: 'var(--color-text)',
  };

  const subtitleStyle = {
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-text-muted)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{title}</h2>
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
    </div>
  );
}
