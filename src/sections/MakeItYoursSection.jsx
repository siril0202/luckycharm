import React from 'react';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { makeItYoursData } from '../data/makeItYours';

export function MakeItYoursSection() {
  const sectionStyle = {
    padding: 'var(--spacing-24) 0',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-8)',
    marginBottom: 'var(--spacing-16)',
  };

  const itemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)',
  };

  const iconStyle = {
    fontSize: '2rem',
    marginBottom: 'var(--spacing-2)',
  };

  const titleStyle = {
    fontSize: 'var(--font-size-lg)',
    marginBottom: 'var(--spacing-1)',
  };

  const descStyle = {
    color: 'var(--color-text-muted)',
    lineHeight: 1.6,
  };

  const codeBlockContainerStyle = {
    backgroundColor: 'var(--color-bg-subtle)',
    padding: 'var(--spacing-8)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border)',
  };

  const codeBlockStyle = {
    backgroundColor: 'var(--color-bg-card)',
    padding: 'var(--spacing-6)',
    borderRadius: 'var(--radius-md)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: '0.9rem',
    color: 'var(--color-text)',
    overflowX: 'auto',
    marginTop: 'var(--spacing-6)',
    border: '1px solid var(--color-border)',
  };

  return (
    <section style={sectionStyle}>
      <Container>
        <SectionHeading 
          title="Make it yours"
          subtitle="Leave it there for company or call it down when the moment needs something extra."
        />
        
        <div style={gridStyle}>
          {makeItYoursData.map((item) => (
            <div key={item.id} style={itemStyle}>
              <div style={iconStyle}>{item.icon}</div>
              <h3 style={titleStyle}>{item.title}</h3>
              <p style={descStyle}>{item.description}</p>
            </div>
          ))}
        </div>
        
        <div style={codeBlockContainerStyle}>
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-2)' }}>Bless a moment</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Lucky Dangle also listens for <code>luckydangle://</code>. Add one line to a script, shortcut, or git hook and the charm comes forward, drops in, and performs its ritual right on cue.
          </p>
          <pre style={codeBlockStyle}>
            <code>
<span style={{ color: 'var(--color-text-muted)' }}># before a deploy, a demo, a big meeting</span><br/>
open "luckydangle://bless"
            </code>
          </pre>
        </div>
      </Container>
    </section>
  );
}
