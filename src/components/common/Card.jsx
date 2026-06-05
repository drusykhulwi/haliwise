import React from 'react';

export default function Card({ children, className = '', style }) {
  return (
    <div className={`glass-card ${className}`} style={{ padding: '24px', ...style }}>
      {children}
    </div>
  );
}
