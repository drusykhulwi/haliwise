import React from 'react';
import Card from '../common/Card';
import { wmoIcon } from '../../utils/parseWeather';

function Stat({ label, value, unit = '' }) {
  const display = value != null && !isNaN(value) ? value : '—';
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-semibold" style={{ color: '#a8d8ff', fontFamily: 'DM Sans' }}>
        {display}<span className="text-sm ml-0.5 opacity-70">{display !== '—' ? unit : ''}</span>
      </span>
      <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

export default function WeatherCard({ dayData, current, location, daysAway }) {
  const useLive  = daysAway === 0 && current;

  // temperature_max/min come from normalised daily (originally temp_max/temp_min)
  const tempHigh = dayData?.temperature_max != null ? Math.round(dayData.temperature_max) : null;
  const tempLow  = dayData?.temperature_min != null ? Math.round(dayData.temperature_min) : null;
  const rain     = dayData?.precipitation_probability ?? 0;
  // wind_speed comes from normalised daily (originally wind_max)
  const wind     = Math.round(useLive ? (current?.wind_speed ?? dayData?.wind_speed ?? 0) : (dayData?.wind_speed ?? 0));
  const humidity = useLive ? (current?.humidity ?? '—') : '—';
  const condCode = useLive ? (current?.condition_code ?? dayData?.condition_code) : dayData?.condition_code;
  const condLabel= dayData?.condition ?? current?.condition ?? '';

  const dayLabel = daysAway === 0 ? 'Today' : daysAway === 1 ? 'Tomorrow' : `In ${daysAway} days`;

  return (
    <Card>
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
            Forecast · {dayLabel}
          </p>
          <h3 className="text-lg font-semibold" style={{ fontFamily: 'Playfair Display', color: '#d6f0d6' }}>
            {location || 'Your Location'}
          </h3>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {condLabel || 'Fetching conditions...'}
          </p>
        </div>
        <span className="text-5xl">{wmoIcon(condCode)}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y" style={{ borderColor: 'var(--border)' }}>
        <Stat label="High"     value={tempHigh}  unit="°C" />
        <Stat label="Low"      value={tempLow}   unit="°C" />
        <Stat label="Humidity" value={humidity}  unit="%" />
        <Stat label="Wind"     value={wind}      unit=" km/h" />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Rain Probability
          </span>
          <span className="text-sm font-semibold" style={{
            color: rain > 60 ? '#e83a2a' : rain > 35 ? '#e8b84b' : '#4aaa4a'
          }}>
            {rain}%
          </span>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'rgba(45,140,45,0.15)' }}>
          <div className="h-2 rounded-full transition-all duration-700" style={{
            width: `${Math.min(rain, 100)}%`,
            background: rain > 60
              ? 'linear-gradient(90deg,#e87a2a,#e83a2a)'
              : rain > 35
              ? 'linear-gradient(90deg,#e8c44a,#e87a2a)'
              : 'linear-gradient(90deg,#2d8c2d,#4aaa4a)',
          }} />
        </div>
      </div>

      {/* Sunrise / Sunset from daily */}
      {(dayData?.sunrise || dayData?.sunset) && (
        <div className="flex gap-4 mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
          {dayData.sunrise && (
            <span>🌅 {dayData.sunrise.slice(11, 16)}</span>
          )}
          {dayData.sunset && (
            <span>🌇 {dayData.sunset.slice(11, 16)}</span>
          )}
        </div>
      )}
    </Card>
  );
}