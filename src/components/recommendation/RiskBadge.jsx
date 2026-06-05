import React from 'react';
import Card from '../common/Card';

const riskColor = { High: '#e83a2a', Medium: '#e8b84b', Low: '#4aaa4a' };
const riskBg    = { High: 'rgba(232,58,42,0.12)', Medium: 'rgba(232,184,75,0.12)', Low: 'rgba(74,170,74,0.12)' };

function Badge({ label, level }) {
  const color = riskColor[level] ?? '#4aaa4a';
  const bg    = riskBg[level] ?? riskBg.Low;
  return (
    <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: bg, border: `1px solid ${color}30` }}>
      <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans' }}>{label}</span>
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${color}20`, color }}>
        {level}
      </span>
    </div>
  );
}

export default function RiskBadge({ risk }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Risk Assessment</p>
      <div className="flex flex-col gap-2">
        <Badge label="🌧 Rain Risk"  level={risk.rain} />
        <Badge label="💨 Wind Risk"  level={risk.wind} />
        <Badge label="🌡 Heat Risk"  level={risk.heat} />
        {risk.cold !== 'Low' && <Badge label="🧊 Cold Risk" level={risk.cold} />}
      </div>
    </Card>
  );
}
