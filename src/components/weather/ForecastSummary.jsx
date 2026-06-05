import React from 'react';
import Card from '../common/Card';
import { wmoIcon } from '../../utils/parseWeather';

function shortDate(dateStr, index) {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  if (!dateStr) return `Day ${index + 1}`;
  // Use noon to avoid timezone-shift date bugs
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });
}

export default function ForecastSummary({ weather, eventDayIndex = 0 }) {
  const days = weather?.daily?.slice(0, 7) ?? [];
  if (!days.length) return null;

  return (
    <Card>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
        7-Day Forecast
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => {
          const isEventDay = i === eventDayIndex;
          // temperature_max is already normalised from temp_max
          const high = d.temperature_max != null ? `${Math.round(d.temperature_max)}°` : '—';
          const low  = d.temperature_min != null ? `${Math.round(d.temperature_min)}°` : '';
          const rain = d.precipitation_probability ?? 0;

          return (
            <div key={i}
              className="flex-1 min-w-[72px] flex flex-col items-center gap-1 py-3 px-2 rounded-xl"
              style={{
                background: isEventDay ? 'rgba(20,136,232,0.15)' : 'rgba(15,61,15,0.35)',
                border: isEventDay ? '1px solid rgba(61,164,255,0.45)' : '1px solid rgba(45,140,45,0.12)',
              }}>
              <span className="text-xs font-medium text-center leading-tight"
                style={{ color: isEventDay ? '#72c0ff' : 'var(--text-muted)' }}>
                {shortDate(d.date, i)}
              </span>
              {isEventDay && (
                <span className="px-1.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(61,164,255,0.2)', color: '#72c0ff', fontSize: '9px' }}>
                  EVENT
                </span>
              )}
              <span className="text-2xl">{wmoIcon(d.condition_code)}</span>
              <span className="text-sm font-semibold" style={{ color: '#d6f0d6' }}>{high}</span>
              {low && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{low}</span>}
              <span className="text-xs mt-0.5" style={{ color: rain > 40 ? '#e8b84b' : '#72c0ff' }}>
                {rain}% 💧
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}