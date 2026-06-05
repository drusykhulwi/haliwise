import React from 'react';

export default function Button({ children, onClick, disabled, variant = 'primary', fullWidth, style }) {
  if (variant === 'secondary') {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10,
          color: '#b8e5cd',
          padding: '11px 22px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.2s ease',
          width: fullWidth ? '100%' : 'auto',
          ...style,
        }}
        onMouseEnter={e => { if (!disabled) e.target.style.background = 'rgba(255,255,255,0.09)'; }}
        onMouseLeave={e => { if (!disabled) e.target.style.background = 'rgba(255,255,255,0.05)'; }}
      >
        {children}
      </button>
    );
  }
  return (
    <button className="hw-btn-primary" onClick={onClick} disabled={disabled}
      style={{ width: fullWidth ? '100%' : 'auto', ...style }}>
      {children}
    </button>
  );
}
