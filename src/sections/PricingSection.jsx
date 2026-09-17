import React, { useState } from 'react';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { pricingPlans } from '../data/pricingPlans';
import { CheckoutModal } from '../components/checkout/CheckoutModal';

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const sectionStyle = {
    padding: 'var(--spacing-24) 0',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-8)',
    maxWidth: '800px',
    margin: '0 auto var(--spacing-12)',
  };

  const listStyle = {
    marginBottom: 'var(--spacing-8)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-3)',
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-3)',
  };

  const checkStyle = {
    color: 'var(--color-accent)',
  };

  return (
    <section id="pricing" style={sectionStyle}>
      <Container>
        <SectionHeading 
          title="Lucky pricing"
          subtitle="You pay once and it's yours forever."
          centered
        />
        
        <div style={gridStyle}>
          {pricingPlans.map((plan) => (
            <Card key={plan.id} style={{ 
              display: 'flex', 
              flexDirection: 'column',
              border: plan.popular ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
              position: 'relative'
            }}>
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  Most Popular
                </div>
              )}
              
              <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-2)' }}>
                {plan.name}
              </h3>
              <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold', marginBottom: 'var(--spacing-8)' }}>
                {plan.price}
              </div>
              
              <ul style={{ ...listStyle, flexGrow: 1 }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={listItemStyle}>
                    <span style={checkStyle}>✓</span>
                    <span dangerouslySetInnerHTML={{ __html: feature.replace('*', '<sup>*</sup>') }} />
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => setSelectedPlan(plan)}
                variant={plan.popular ? 'primary' : 'secondary'}
                style={{ width: '100%' }}
              >
                {plan.ctaText}
              </Button>
            </Card>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-muted)' }}>
          <p style={{ marginBottom: 'var(--spacing-2)' }}>
            One purchase covers both platforms. On Mac, a direct download for macOS 14 or later, notarized by Apple. On Windows, a signed installer for Windows 10 and 11.
          </p>
          <p>
            Looking for a discount? <a href="#" style={{ textDecoration: 'underline' }}>There is a way.</a>
          </p>
          <p style={{ marginTop: 'var(--spacing-4)', fontSize: '0.8rem' }}>
            *not measurable
          </p>
        </div>
      </Container>
      
      {selectedPlan && (
        <CheckoutModal 
          plan={selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
        />
      )}
    </section>
  );
}
