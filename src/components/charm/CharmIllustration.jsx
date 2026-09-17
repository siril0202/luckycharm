import React from 'react';

export function CharmIllustration({ icon, style = {} }) {
  const illustrationStyle = {
    fontSize: '4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100px',
    width: '100px',
    margin: '0 auto',
    userSelect: 'none',
    ...style
  };

  return (
    <div style={illustrationStyle}>
      {icon}
    </div>
  );
}
