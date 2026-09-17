import React from 'react';
import { Container } from '../components/layout/Container';
import { SectionHeading } from '../components/ui/SectionHeading';

export function PlatformSection() {
  const sectionStyle = {
    padding: 'var(--spacing-24) 0',
    backgroundColor: 'var(--color-bg-subtle)',
  };

  const contentWrapperStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-16)',
    alignItems: 'center',
  };

  const demoStyle = {
    backgroundColor: '#1c1c1e', /* Apple dark menu bar approx */
    borderRadius: '8px',
    padding: 'var(--spacing-2) var(--spacing-4)',
    color: '#fff',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--spacing-4)',
    fontSize: '14px',
    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    border: '1px solid #333',
    position: 'relative',
    overflow: 'hidden',
  };

  const menuItemsStyle = {
    display: 'flex',
    gap: 'var(--spacing-4)',
    alignItems: 'center',
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)',
  };

  const listItemStyle = {
    display: 'flex',
    gap: 'var(--spacing-3)',
    alignItems: 'flex-start',
  };

  const bulletStyle = {
    color: 'var(--color-accent)',
    fontWeight: 'bold',
  };

  return (
    <section style={sectionStyle}>
      <Container>
        <SectionHeading 
          title="At home on your Mac or PC"
          subtitle="Lucky Dangle lives in the menu bar on Mac and the tray on Windows, and leaves the rest of your machine alone."
        />
        
        <div style={contentWrapperStyle}>
          {/* Demo area */}
          <div>
            <div style={demoStyle}>
              <div style={menuItemsStyle}>
                <span>🧿</span>
                <span>⌁</span>
                <span>100%</span>
                <span>Sat 7:07</span>
              </div>
            </div>
          </div>
          
          {/* Features list */}
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              <span>Stays in the menu bar on Mac and the tray on Windows, with no Dock icon or open window.</span>
            </li>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              <span>Only the charm catches your cursor. Everything else clicks straight through.</span>
            </li>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              <span>Keyboard shortcuts dangle it or perform its ritual. On the Mac, choose your own.</span>
            </li>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              <span>Drag it along the top edge to re-hang it anywhere on your screen.</span>
            </li>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              <span>Meet every charm and its story in the built-in gallery.</span>
            </li>
            <li style={listItemStyle}>
              <span style={bulletStyle}>•</span>
              <span>New charms arrive through free, built-in updates.</span>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
