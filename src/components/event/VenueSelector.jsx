import React from 'react';
import { VENUE_TYPES } from '../../utils/constants';

export default function VenueSelector({ value, onChange }) {
  return (
    <div>
      <label style={{ display: 'block', color: '#88d1ae', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
        Venue Preference
      </label>
      <div style={{ display: 'flex', gap: 10 }}>
        {VENUE_TYPES.map(vt => (
          <button
            key={vt.value}
            onClick={() => onChange(vt.value)}
            style={{
              flex: 1,
              background: value === vt.value ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${value === vt.value ? 'rgba(14,165,233,0.45)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 10,
              color: value === vt.value ? '#38bdf8' : 'rgba(200,230,215,0.7)',
              padding: '12px 8px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: value === vt.value ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
              boxShadow: value === vt.value ? '0 0 12px rgba(14,165,233,0.2)' : 'none',
            }}
          >
            <span style={{ fontSize: 22 }}>{vt.icon}</span>
            <span>{vt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
