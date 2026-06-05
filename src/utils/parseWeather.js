/**
 * WMO condition codes → human label + emoji icon
 */
const WMO = {
  0:  { label: 'Clear Sky',              icon: '☀️' },
  1:  { label: 'Mainly Clear',           icon: '🌤️' },
  2:  { label: 'Partly Cloudy',          icon: '⛅' },
  3:  { label: 'Overcast',              icon: '☁️' },
  45: { label: 'Foggy',                  icon: '🌫️' },
  48: { label: 'Icy Fog',               icon: '🌫️' },
  51: { label: 'Light Drizzle',          icon: '🌦️' },
  53: { label: 'Drizzle',               icon: '🌦️' },
  55: { label: 'Heavy Drizzle',          icon: '🌧️' },
  61: { label: 'Light Rain',             icon: '🌧️' },
  63: { label: 'Rain',                  icon: '🌧️' },
  65: { label: 'Heavy Rain',             icon: '🌧️' },
  71: { label: 'Light Snow',             icon: '❄️' },
  73: { label: 'Snow',                  icon: '❄️' },
  75: { label: 'Heavy Snow',             icon: '❄️' },
  77: { label: 'Snow Grains',            icon: '❄️' },
  80: { label: 'Light Showers',          icon: '🌦️' },
  81: { label: 'Showers',               icon: '🌧️' },
  82: { label: 'Heavy Showers',          icon: '🌧️' },
  85: { label: 'Snow Showers',           icon: '❄️' },
  86: { label: 'Heavy Snow Showers',     icon: '❄️' },
  95: { label: 'Thunderstorm',           icon: '⛈️' },
  96: { label: 'Thunderstorm w/ Hail',   icon: '⛈️' },
  99: { label: 'Severe Thunderstorm',    icon: '⛈️' },
};

export function wmoLabel(code) {
  return WMO[parseInt(code, 10)]?.label ?? 'Unknown';
}
export function wmoIcon(code) {
  return WMO[parseInt(code, 10)]?.icon ?? '🌤️';
}

/**
 * Normalise a single daily entry from the API into consistent field names.
 * The API uses temp_min/temp_max/wind_max — we map to temperature_min/max/wind_speed.
 */
function normaliseDay(d) {
  return {
    date:                     d.date,
    temperature_max:          d.temp_max   ?? d.temperature_max ?? null,
    temperature_min:          d.temp_min   ?? d.temperature_min ?? null,
    wind_speed:               d.wind_max   ?? d.wind_speed      ?? 0,
    precipitation_probability: d.precipitation_probability      ?? 0,
    precipitation_sum:        d.precipitation_sum               ?? 0,
    condition_code:           d.condition_code,
    condition:                wmoLabel(d.condition_code),
    icon:                     d.icon ?? '',
    sunrise:                  d.sunrise,
    sunset:                   d.sunset,
  };
}

/**
 * Enrich the raw API response:
 *  - Normalise the real daily[] array (temp_min → temperature_min, etc.)
 *  - Add condition label to current
 *  - Resolve a readable location via Nominatim reverse geocoding
 */
export async function enrichWeatherResponse(raw) {
  // Normalise daily array using the real API daily field names
  const daily = (raw.daily ?? []).map(normaliseDay);

  const current = {
    ...raw.current,
    condition: wmoLabel(raw.current?.condition_code),
  };

  // Reverse geocode lat/lon → city name
  const lat = raw.location?.lat;
  const lon = raw.location?.lon;
  let resolvedLocation = '';

  if (lat != null && lon != null) {
    try {
      const r = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const geo = await r.json();
      const city    = geo.address?.city || geo.address?.town || geo.address?.village || geo.address?.county || '';
      const country = geo.address?.country || '';
      resolvedLocation = [city, country].filter(Boolean).join(', ');
    } catch (_) {}
  }

  // Never fall back to client_geo (that's the proxy country, not the user's city)
  if (!resolvedLocation) {
    resolvedLocation = raw.location?.timezone?.split('/')[1]?.replace('_', ' ') ?? 'Your Location';
  }

  return { ...raw, current, daily, resolvedLocation };
}