import React from 'react';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CharmCard } from '../components/charm/CharmCard';
import { charmsData } from '../data/charms';

export function CharmCollectionSection() {
  const sectionStyle = {
    padding: 'var(--spacing-24) 0',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: 'var(--spacing-6)',
    marginBottom: 'var(--spacing-12)',
  };

  const footerStyle = {
    textAlign: 'center',
    color: 'var(--color-text-muted)',
  };

  return (
    <section id="collection" style={sectionStyle}>
      <Container>
        <SectionHeading 
          title="Choose your charm" 
          subtitle="Each one comes from a tradition around the world, with a small ritual of its own. Pick a charm to hang it on this page."
          centered
        />
        
        <div style={gridStyle}>
          {charmsData.map((charm) => (
            <CharmCard key={charm.id} charm={charm} />
          ))}
        </div>
        
        <p style={footerStyle}>
          Missing the charm you grew up with? <a href="mailto:hello@example.com?subject=Suggest%20a%20dangle" style={{ textDecoration: 'underline' }}>Suggest a dangle.</a> New charms arrive in free updates.
        </p>
      </Container>
    </section>
  );
}
