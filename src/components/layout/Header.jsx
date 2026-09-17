import React from 'react';
import { Container } from './Container';

export function Header() {
  const headerStyle = {
    padding: 'var(--spacing-6) 0',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    fontSize: 'var(--font-size-md)',
    color: 'var(--color-text)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
  };

  return (
    <header style={headerStyle}>
      <Container>
        <nav style={navStyle}>
          <a href="/" style={logoStyle}>
            <span style={{ fontSize: '1.2em' }}>🍀</span> Lucky Dangle
          </a>
        </nav>
      </Container>
    </header>
  );
}
