import React, { useEffect, useState } from 'react';
import Card from '../common/Card';

export default function WeatherScore({ score, label, color }) {
  const [animated, setAnimated] = useState(0);
  const r = 52, circ = 2 * Math.PI * r;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const offset = circ - (animated / 100) * circ;

  return (
    <Card className="flex flex-col items-center text-center">
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>Weather Suitability Score</p>
      <div className="relative w-36 h-36 mb-4">
        <svg width="144" height="144" viewBox="0 0 144 144">
          <circle cx="72" cy="72" r={r} fill="none" stroke="rgba(45,140,45,0.15)" strokeWidth="10" />
          <circle
            cx="72" cy="72" r={r} fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color, fontFamily: 'Playfair Display' }}>{score}</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/100</span>
        </div>
      </div>
      <div className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
        {label} conditions for your event
      </div>
    </Card>
  );
}
