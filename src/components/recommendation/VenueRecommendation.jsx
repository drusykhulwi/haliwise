import React from 'react';
import Card from '../common/Card';

const colors = {
  good:    { bg: 'rgba(45,140,45,0.12)', border: 'rgba(45,140,45,0.3)',  text: '#78c878' },
  caution: { bg: 'rgba(232,196,74,0.1)', border: 'rgba(232,196,74,0.35)', text: '#e8c44a' },
  warning: { bg: 'rgba(232,90,42,0.1)',  border: 'rgba(232,90,42,0.35)',  text: '#e87a2a' },
};

export default function VenueRecommendation({ venue }) {
  const c = colors[venue.severity] ?? colors.good;
  return (
    <Card>
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Venue Recommendation</p>
      <div className="flex items-center gap-3 mb-4 p-4 rounded-xl" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
        <span className="text-3xl">{venue.icon}</span>
        <div>
          <p className="font-semibold text-lg" style={{ color: c.text, fontFamily: 'Playfair Display' }}>{venue.label}</p>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {venue.reasons.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: c.text, marginTop: '2px' }}>•</span>
            {r}
          </li>
        ))}
      </ul>
    </Card>
  );
}
