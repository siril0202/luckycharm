import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CharmIllustration } from './CharmIllustration';
import { RitualAnimation } from './RitualAnimation';

export function CharmCard({ charm }) {
  const [trigger, setTrigger] = useState(0);

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
  };

  const contentStyle = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-4)',
  };

  const titleStyle = {
    fontSize: 'var(--font-size-lg)',
    marginBottom: 'var(--spacing-1)',
  };

  const descStyle = {
    color: 'var(--color-text-muted)',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 1.6,
  };

  return (
    <Card style={cardStyle}>
      <div style={contentStyle}>
        <RitualAnimation ritualType={charm.ritualType} trigger={trigger}>
          <CharmIllustration icon={charm.icon} />
        </RitualAnimation>
        
        <div>
          <h3 style={titleStyle}>{charm.name}</h3>
          <Badge>{charm.origin}</Badge>
        </div>
        
        <p style={descStyle}>{charm.description}</p>
      </div>
      
      <div style={{ marginTop: 'var(--spacing-6)' }}>
        <Button 
          variant="secondary" 
          style={{ width: '100%' }}
          onClick={() => setTrigger(prev => prev + 1)}
        >
          {charm.actionLabel}
        </Button>
      </div>
    </Card>
  );
}
