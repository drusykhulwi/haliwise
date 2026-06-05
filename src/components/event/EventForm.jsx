import React, { useState } from 'react';
import EventTypeSelector from './EventTypeSelector';
import VenueSelector from './VenueSelector';
import Button from '../common/Button';

const today = new Date().toISOString().split('T')[0];

export default function EventForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    eventName: '',
    eventType: 'wedding',
    venuePreference: 'outdoor',
    location: '',
    autoDetect: false,
    date: '',
    time: '14:00',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Event Name */}
      <div>
        <label style={{ color: 'var(--text-muted)' }} className="block text-xs uppercase tracking-widest mb-2">
          Event Name
        </label>
        <input
          className="hw-input"
          placeholder="e.g. Sarah & Jake's Wedding"
          value={form.eventName}
          onChange={e => set('eventName', e.target.value)}
          required
        />
      </div>

      {/* Event Type */}
      <EventTypeSelector value={form.eventType} onChange={v => set('eventType', v)} />

      {/* Venue */}
      <VenueSelector value={form.venuePreference} onChange={v => set('venuePreference', v)} />

      {/* Location */}
      <div>
        <label style={{ color: 'var(--text-muted)' }} className="block text-xs uppercase tracking-widest mb-2">
          Location
        </label>
        <div className="flex gap-2 mb-2">
          <Button
            variant={!form.autoDetect ? 'secondary' : 'ghost'}
            onClick={() => set('autoDetect', false)}
            className="flex-1 text-xs"
          >
            Enter Manually
          </Button>
          <Button
            variant={form.autoDetect ? 'sky' : 'secondary'}
            onClick={() => set('autoDetect', true)}
            className="flex-1 text-xs"
          >
            Auto-Detect
          </Button>
        </div>
        {!form.autoDetect && (
          <input
            className="hw-input"
            placeholder="e.g. Nairobi, Kenya"
            value={form.location}
            onChange={e => set('location', e.target.value)}
            required={!form.autoDetect}
          />
        )}
        {form.autoDetect && (
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            Location will be detected from your IP address via Weather-AI
          </p>
        )}
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label style={{ color: 'var(--text-muted)' }} className="block text-xs uppercase tracking-widest mb-2">
            Event Date
          </label>
          <input
            type="date"
            className="hw-input"
            min={today}
            value={form.date}
            onChange={e => set('date', e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ color: 'var(--text-muted)' }} className="block text-xs uppercase tracking-widest mb-2">
            Start Time
          </label>
          <input
            type="time"
            className="hw-input"
            value={form.time}
            onChange={e => set('time', e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={loading} className="w-full py-4 text-base">
        {loading ? 'Analysing weather...' : 'Analyse Event Conditions'}
      </Button>
    </form>
  );
}
