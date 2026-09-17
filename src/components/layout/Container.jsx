import React from 'react';

export function Container({ children, className = '' }) {
  const styles = {
    maxWidth: 'var(--max-w-container)',
    margin: '0 auto',
    padding: '0 var(--spacing-4)',
    width: '100%'
  };

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
}
