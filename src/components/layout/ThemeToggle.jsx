import React from 'react';

export function ThemeToggle({ theme, setTheme }) {
  const options = [
    { id: 'light', label: 'Light' },
    { id: 'dark', label: 'Dark' },
    { id: 'auto', label: 'Auto' },
  ];

  const containerStyle = {
    display: 'inline-flex',
    backgroundColor: 'var(--color-bg-subtle)',
    borderRadius: 'var(--radius-full)',
    padding: '2px',
    border: '1px solid var(--color-border)',
  };

  const getButtonStyle = (isActive) => ({
    padding: 'var(--spacing-1) var(--spacing-3)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: isActive ? '600' : '400',
    color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
    backgroundColor: isActive ? 'var(--color-bg-card)' : 'transparent',
    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={containerStyle} role="group" aria-label="Theme toggle">
      {options.map((option) => (
        <button
          key={option.id}
          style={getButtonStyle(theme === option.id)}
          onClick={() => setTheme(option.id)}
          aria-pressed={theme === option.id}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
