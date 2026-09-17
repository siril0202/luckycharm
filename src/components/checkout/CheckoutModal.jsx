import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

export function CheckoutModal({ plan, onClose }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    padding: 'var(--spacing-4)',
    overflowY: 'auto',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)',
    marginTop: 'var(--spacing-6)',
  };

  const inputStyle = {
    padding: 'var(--spacing-3)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-base)',
    width: '100%',
  };

  const qrContainerStyle = {
    textAlign: 'center',
    padding: 'var(--spacing-4)',
    backgroundColor: 'var(--color-bg-subtle)',
    borderRadius: 'var(--radius-lg)',
    marginTop: 'var(--spacing-4)',
  };

  const numericPrice = parseFloat(plan.price.replace(/[^0-9.]/g, ''));
  const upiLink = `upi://pay?pa=santhanasiril0202@okicici&pn=Hangly%20Charm&am=${numericPrice}&cu=INR`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      if (!supabase) throw new Error("Supabase is not configured");

      // Create a pending order directly in Supabase
      const { data, error: dbError } = await supabase
        .from('orders')
        .insert([
          {
            customer_email: email,
            product_id: plan.id,
            amount: numericPrice,
            payment_status: 'pending',
            // No payment_reference because they aren't entering a UTR
          }
        ])
        .select()
        .single();

      if (dbError) throw new Error(dbError.message || 'Failed to submit order');
      
      // Redirect to the success view with the order ID in the URL to poll
      window.location.href = `/?order_id=${data.id}`;

    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={modalStyle}>
      <Card style={{ width: '100%', maxWidth: '450px', position: 'relative', margin: 'auto' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: 'var(--spacing-4)', right: 'var(--spacing-4)', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}
        >
          &times;
        </button>
        
        <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--spacing-2)' }}>Get {plan.name}</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>{plan.price} &middot; One-time payment</p>
        
        <div style={qrContainerStyle}>
          <p style={{ fontWeight: 'bold', marginBottom: 'var(--spacing-2)' }}>Scan to Pay {plan.price}</p>
          <img 
            src="/qr.png" 
            alt="UPI QR Code" 
            style={{ width: '200px', height: '200px', margin: '0 auto', borderRadius: '8px' }} 
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML += '<div style="width:200px;height:200px;margin:0 auto;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px dashed #ccc;">[Place public/qr.png here]</div>';
            }}
          />
          <p style={{ marginTop: 'var(--spacing-3)', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
            Or pay to UPI ID: <strong>santhanasiril0202@okicici</strong>
          </p>

          <div style={{ marginTop: 'var(--spacing-4)' }}>
            <Button href={upiLink} variant="secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              Pay via UPI App (Mobile)
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {error && <div style={{ color: 'var(--color-accent)', fontSize: 'var(--font-size-sm)' }}>{error}</div>}
          
          <div>
            <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: 'var(--font-size-sm)' }}>
              Email address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: 'var(--spacing-2)' }}>
            {loading ? 'Submitting...' : 'I have paid'}
          </Button>
          
          <p style={{ fontSize: '12px', textAlign: 'center', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-2)' }}>
            Your license will be issued after your payment is verified.
          </p>
        </form>
      </Card>
    </div>
  );
}
