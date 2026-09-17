import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function SuccessView({ orderId }) {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 'var(--spacing-4)',
    backgroundColor: 'var(--color-bg)',
  };

  return (
    <div style={containerStyle}>
      <Card style={{ textAlign: 'center', maxWidth: '550px', width: '100%' }}>
        <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-4)' }}>🎉</div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-2)' }}>Congratulations!</h2>
        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-6)', fontWeight: 'normal' }}>
          Your payment has been received.
        </h3>
        
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-4)', lineHeight: 1.6, fontSize: 'var(--font-size-lg)' }}>
          Your Hangly Charm license key will be sent to your registered email within <strong>1–2 hours</strong>.
        </p>
        
        <div style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-6)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: 'var(--spacing-2)' }}>ORDER REFERENCE</span>
          <span style={{ fontFamily: 'monospace', wordBreak: 'break-all', fontWeight: 'bold' }}>{orderId}</span>
        </div>

        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)', marginBottom: 'var(--spacing-8)' }}>
          ⚠️ Please keep your payment/transaction details until you receive your license.
        </p>

        <Button href="/" style={{ width: '100%' }}>Return to Home</Button>
      </Card>
    </div>
  );
}

