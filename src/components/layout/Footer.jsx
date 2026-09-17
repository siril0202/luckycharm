import React from 'react';
import { Container } from './Container';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

export function Footer() {
  const [theme, setTheme] = useTheme();

  const footerStyle = {
    padding: 'var(--spacing-12) 0 var(--spacing-8)',
    borderTop: '1px solid var(--color-border)',
    marginTop: 'var(--spacing-24)',
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-8)',
    textAlign: 'center',
  };

  const textStyle = {
    color: 'var(--color-text-muted)',
    fontSize: 'var(--font-size-sm)',
  };

  const linkRowStyle = {
    display: 'flex',
    gap: 'var(--spacing-4)',
    flexWrap: 'wrap',
    justifyContent: 'center',
    color: 'var(--color-text-muted)',
    fontSize: 'var(--font-size-sm)',
  };

  const linkStyle = {
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <div style={contentStyle}>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          
          <div style={linkRowStyle}>
            <a href="#" style={linkStyle}>Discount</a>
            <a href="#" style={linkStyle}>Privacy</a>
            <a href="#" style={linkStyle}>Terms</a>
            <a href="#" style={linkStyle}>Press</a>
            <a href="#" style={linkStyle}>Updates</a>
            <a href="#" style={linkStyle}>Elsewhere</a>
          </div>

          <p style={textStyle}>
            Crafted with care and curiosity by <a href="#" style={linkStyle}>Your Name</a> &middot; <a href="mailto:hello@example.com" style={linkStyle}>Email</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
