import React from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { DangleCharm } from '../components/charm/DangleCharm';

export function HeroSection() {
  const sectionStyle = {
    position: 'relative',
    padding: 'calc(var(--spacing-32) + var(--spacing-16)) 0 var(--spacing-24)',
    textAlign: 'center',
    overflow: 'hidden',
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    letterSpacing: '-0.02em',
    marginBottom: 'var(--spacing-6)',
    lineHeight: 1.05,
  };

  const subtitleStyle = {
    fontSize: 'var(--font-size-xl)',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--spacing-6)',
    fontWeight: '400',
  };

  const bodyStyle = {
    fontSize: 'var(--font-size-md)',
    color: 'var(--color-text-muted)',
    maxWidth: '600px',
    margin: '0 auto var(--spacing-12)',
    lineHeight: 1.6,
  };

  const ctaGroupStyle = {
    display: 'flex',
    gap: 'var(--spacing-4)',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 'var(--spacing-8)',
  };

  const hintStyle = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic',
  };

  return (
    <section style={sectionStyle}>
      <DangleCharm icon="🍀" ritualType="pulse" />
      
      <Container>
        <h1 style={titleStyle}>Lucky Dangle</h1>
        <p style={subtitleStyle}>A lucky charm for your screen.</p>
        
        <p style={bodyStyle}>
          Choose a charm and hang it from the top of your screen, on Mac or Windows. It sways while you work, stays out of every click, and drops in when you call it.
        </p>
        
        <div style={ctaGroupStyle}>
          <Button href="#pricing" variant="primary">Get Lucky Dangle</Button>
          <Button href="#collection" variant="secondary">Meet the charms</Button>
        </div>
        
        <p style={hintStyle}>
          Try the charm: grab it and give it a flick.
        </p>
      </Container>
    </section>
  );
}
