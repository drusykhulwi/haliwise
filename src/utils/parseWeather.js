const WMO = {
  0:  { label: 'Clear Sky',            icon: '☀️' },
  1:  { label: 'Mainly Clear',         icon: '🌤️' },
  2:  { label: 'Partly Cloudy',        icon: '⛅' },
  3:  { label: 'Overcast',             icon: '☁️' },
  45: { label: 'Foggy',                icon: '🌫️' },
  48: { label: 'Icy Fog',              icon: '🌫️' },
  51: { label: 'Light Drizzle',        icon: '🌦️' },
  53: { label: 'Drizzle',              icon: '🌦️' },
  55: { label: 'Heavy Drizzle',        icon: '🌧️' },
  61: { label: 'Light Rain',           icon: '🌧️' },
  63: { label: 'Rain',                 icon: '🌧️' },
  65: { label: 'Heavy Rain',           icon: '🌧️' },
  71: { label: 'Light Snow',           icon: '❄️' },
  73: { label: 'Snow',                 icon: '❄️' },
  75: { label: 'Heavy Snow',           icon: '❄️' },
  77: { label: 'Snow Grains',          icon: '❄️' },
  80: { label: 'Light Showers',        icon: '🌦️' },
  81: { label: 'Showers',              icon: '🌧️' },
  82: { label: 'Heavy Showers',        icon: '🌧️' },
  85: { label: 'Snow Showers',         icon: '❄️' },
  86: { label: 'Heavy Snow Showers',   icon: '❄️' },
  95: { label: 'Thunderstorm',         icon: '⛈️' },
  96: { label: 'Thunderstorm w/ Hail', icon: '⛈️' },
  99: { label: 'Severe Thunderstorm',  icon: '⛈️' },
};

export function wmoLabel(code) {
  return WMO[parseInt(code, 10)]?.label ?? 'Unknown';
}
export function wmoIcon(code) {
  return WMO[parseInt(code, 10)]?.icon ?? '🌤️';
}

function normaliseDay(d) {
  return {
    date:                      d.date,
    temperature_max:           d.temp_max   ?? d.temperature_max ?? null,
    temperature_min:           d.temp_min   ?? d.temperature_min ?? null,
    wind_speed:                d.wind_max   ?? d.wind_speed      ?? 0,
    precipitation_probability: d.precipitation_probability       ?? 0,
    precipitation_sum:         d.precipitation_sum               ?? 0,
    condition_code:            d.condition_code,
    condition:                 wmoLabel(d.condition_code),
    icon:                      d.icon ?? '',
    sunrise:                   d.sunrise ?? null,
    sunset:                    d.sunset  ?? null,
  };
}

/**
 * Synchronous enrichment — no async Nominatim call here.
 * Location resolution is handled in weatherService so failures
 * can never cause the whole response to blow up.
 */
export function enrichWeatherResponse(raw) {
  const daily = (raw.daily ?? []).map(normaliseDay);

  const current = {
    ...raw.current,
    condition: wmoLabel(raw.current?.condition_code),
  };

  return { ...raw, current, daily };
}

/**
 * Separate async helper — called in weatherService with its own try/catch.
 * Returns a human-readable city name or empty string on failure.
 */
export async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=10`,
      { headers: { 'Accept-Language': 'en' } }
    );
    const geo = await res.json();
    // zoom=10 returns city level; prefer city > town > village > county
    const city    = geo.address?.city || geo.address?.town || geo.address?.village || geo.address?.county || '';
    const country = geo.address?.country || '';
    return [city, country].filter(Boolean).join(', ');
  } catch {
    return '';
  }
}