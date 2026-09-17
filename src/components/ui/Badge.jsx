import React from 'react';

export function Badge({ children }) {
  const style = {
    display: 'inline-block',
    padding: 'var(--spacing-1) var(--spacing-3)',
    backgroundColor: 'var(--color-bg-subtle)',
    color: 'var(--color-text-muted)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: '500',
    border: '1px solid var(--color-border)',
  };

  return (
    <span style={style}>
      {children}
    </span>
  );
}
