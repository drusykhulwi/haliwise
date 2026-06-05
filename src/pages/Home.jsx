import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/event/EventForm';
import Loader from '../components/common/Loader';
import { useWeather } from '../hooks/useWeather';
import { useEventPlanner } from '../hooks/useEventPlanner';
import { useEventContext } from '../context/EventContext';

function daysFromToday(dateStr) {
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(dateStr); d.setHours(0,0,0,0);
  return Math.round((d - today) / (1000 * 60 * 60 * 24));
}

export default function Home() {
  const navigate = useNavigate();
  const { fetchForLocation, loading, error } = useWeather();
  const { processResults } = useEventPlanner();
  const { setResults } = useEventContext();
  const [formError, setFormError] = useState('');

  async function handleSubmit(form) {
    setFormError('');

    // Validate date range before hitting the API
    const daysAway = daysFromToday(form.date);
    if (daysAway < 0) {
      setFormError('Please choose a future date for your event.');
      return;
    }
    if (daysAway > 6) {
      setFormError(
        `Your event is ${daysAway} days away. Our weather forecast currently shows  only data up to 7 days out. ` +
        `Please check back closer to ${new Date(form.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.`
      );
      return;
    }

    const weather = await fetchForLocation(form.location, form.autoDetect);
    if (!weather) return; // error already set in hook

    const computed = processResults(weather, form);
    setResults(computed);
    navigate('/results');
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(26,107,26,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(20,136,232,0.12) 0%, transparent 55%), #070f07',
      }} />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6"
            style={{ background: 'rgba(45,140,45,0.15)', border: '1px solid rgba(45,140,45,0.3)', color: '#78c878' }}>
            Weather-Aware Event Intelligence
          </div>
          <h1 style={{ fontFamily: 'Playfair Display', color: '#d6f0d6', lineHeight: 1.1 }}
            className="text-5xl font-bold mb-3">
            HaliWise<br />
            <span style={{ color: '#3da4ff' }}>Events</span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans' }}>
            Plan smarter. Get real-time weather analysis, suitability scores, and personalised recommendations for your event.
          </p>
        </div>

        <div className="glass rounded-2xl p-7 shadow-2xl"
          style={{ boxShadow: '0 32px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(45,140,45,0.2)' }}>
          {loading
            ? <Loader message="Fetching weather forecast..." />
            : <EventForm onSubmit={handleSubmit} loading={loading} />
          }

          {/* Show form validation error OR API error */}
          {(formError || (!loading && error)) && (
            <div className="mt-4 p-4 rounded-xl text-sm flex items-start gap-3"
              style={{ background: 'rgba(232,58,42,0.08)', border: '1px solid rgba(232,58,42,0.3)', color: '#f08080' }}>
              <span className="text-lg leading-none mt-0.5">⚠</span>
              <span>{formError || error}</span>
            </div>
          )}
        </div>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
          Powered by Weather-AI API · Built for HaliWise
        </p>
      </div>
    </div>
  );
}