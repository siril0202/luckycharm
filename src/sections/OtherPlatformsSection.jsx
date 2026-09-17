import React from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';

export function OtherPlatformsSection() {
  const sectionStyle = {
    padding: 'var(--spacing-24) 0',
    backgroundColor: 'var(--color-bg-subtle)',
    textAlign: 'center',
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  return (
    <section style={sectionStyle}>
      <Container>
        <div style={containerStyle}>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-6)' }}>
            Not on a Mac or PC?
          </h2>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-8)', lineHeight: 1.6 }}>
            Lucky Dangle hangs from Mac and Windows screens today. Tell me where you'd like it next — Linux, iPhone, iPad or Android — and you'll get one email when it's ready. That's all.
          </p>
          <Button variant="secondary">
            Tell me where &rarr;
          </Button>
        </div>
      </Container>
    </section>
  );
}
