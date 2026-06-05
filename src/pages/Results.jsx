import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from '../context/EventContext';
import WeatherCard from '../components/weather/WeatherCard';
import ForecastSummary from '../components/weather/ForecastSummary';
import WeatherScore from '../components/score/WeatherScore';
import VenueRecommendation from '../components/recommendation/VenueRecommendation';
import RiskBadge from '../components/recommendation/RiskBadge';
import OutfitRecommendation from '../components/recommendation/OutfitRecommendation';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { EVENT_TYPES } from '../utils/constants';
import { formatDate, formatTime } from '../utils/formatDate';

export default function Results() {
  const navigate = useNavigate();
  const { results } = useEventContext();

  if (!results) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p style={{ color: 'var(--text-muted)' }}>No results found.</p>
        <Button onClick={() => navigate('/')}>← Go Back</Button>
      </div>
    );
  }

  const { score, venue, outfit, tips, risk, eventForm, weather, daysAway } = results;
  const eventLabel = EVENT_TYPES.find(e => e.value === eventForm.eventType)?.label ?? eventForm.eventType;

  // Location: prefer what the API gave us, fall back to what the user typed
  const locationDisplay = weather?.resolvedLocation || eventForm.location || 'Your location';

  // Forecast context label
  const forecastLabel = daysAway === 0
    ? 'Today\'s forecast'
    : daysAway === 1
    ? 'Tomorrow\'s forecast'
    : `${daysAway}-day forecast`;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 50% at 10% 5%, rgba(26,107,26,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 90% 90%, rgba(20,136,232,0.10) 0%, transparent 50%), #070f07',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-10">
        {/* Nav */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-sm transition-colors"
            style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans', background: 'none', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.target.style.color='#78c878'}
            onMouseLeave={e => e.target.style.color='var(--text-muted)'}
          >
            ← Back
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs"
            style={{ background: 'rgba(45,140,45,0.12)', border: '1px solid rgba(45,140,45,0.25)', color: '#78c878' }}>
            HaliWise Events
          </div>
        </div>

        {/* Event Header */}
        <div className="mb-8">
          <h1 style={{ fontFamily: 'Playfair Display', color: '#d6f0d6' }} className="text-3xl font-bold mb-2">
            {eventForm.eventName}
          </h1>
          <div className="flex flex-wrap gap-x-3 gap-y-1 items-center text-sm" style={{ color: 'var(--text-muted)' }}>
            <span>{eventLabel}</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>{formatDate(eventForm.date)} at {formatTime(eventForm.time)}</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>{locationDisplay}</span>
          </div>
          {/* Forecast day indicator */}
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full text-xs"
            style={{ background: 'rgba(20,136,232,0.1)', border: '1px solid rgba(61,164,255,0.2)', color: '#72c0ff' }}>
            Showing {forecastLabel} for your event date
          </div>
        </div>

        {/* Score + Venue */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <WeatherScore score={score.score} label={score.label} color={score.color} />
          <VenueRecommendation venue={venue} />
        </div>

        {/* Weather card — uses the specific event day's data */}
        <div className="mb-4">
          <WeatherCard dayData={results.dayData} current={weather?.current} location={locationDisplay} daysAway={daysAway} />
        </div>

        {/* 7-day Forecast strip */}
        <div className="mb-4">
          <ForecastSummary weather={weather} eventDayIndex={daysAway} />
        </div>

        {/* Risk + Outfit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <RiskBadge risk={risk} />
          <OutfitRecommendation outfit={outfit} />
        </div>

        {/* Planning Tips */}
        <Card>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>📋 Planning Tips</p>
          <ul className="flex flex-col gap-2.5">
            {tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: '#d6f0d6', fontFamily: 'DM Sans' }}>
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ background: 'rgba(45,140,45,0.25)', color: '#78c878', marginTop: '1px' }}>{i + 1}</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        <div className="mt-8 text-center">
          <Button onClick={() => navigate('/')} variant="secondary" className="px-8">
            ← Plan Another Event
          </Button>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
          Powered by Weather-AI API · HaliWise Events
        </p>
      </div>
    </div>
  );
}