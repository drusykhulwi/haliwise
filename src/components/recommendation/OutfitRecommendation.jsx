import React from 'react';
import Card from '../common/Card';

export default function OutfitRecommendation({ outfit }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>👕 Recommended Attire</p>
      <ul className="flex flex-col gap-2.5">
        {outfit.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#d6f0d6', fontFamily: 'DM Sans' }}>
            <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#3da4ff', marginTop: '6px' }} />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
