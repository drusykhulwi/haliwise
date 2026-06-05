import React from 'react';
import { EVENT_TYPES } from '../../utils/constants';

export default function EventTypeSelector({ value, onChange }) {
  return (
    <div>
      <label style={{ display: 'block', color: '#88d1ae', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
        Event Type
      </label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
        {EVENT_TYPES.map(et => (
          <button
            key={et.value}
            onClick={() => onChange(et.value)}
            style={{
              background: value === et.value ? 'rgba(45,150,105,0.18)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${value === et.value ? 'rgba(45,150,105,0.5)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 10,
              color: value === et.value ? '#54b688' : 'rgba(200,230,215,0.7)',
              padding: '10px 8px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: value === et.value ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              boxShadow: value === et.value ? '0 0 12px rgba(45,150,105,0.2)' : 'none',
            }}
          >
            <span style={{ fontSize: 20 }}>{et.emoji}</span>
            <span>{et.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
