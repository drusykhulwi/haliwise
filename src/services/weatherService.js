import { enrichWeatherResponse } from '../utils/parseWeather';

const BASE_URL = 'https://api.weather-ai.co/v1';

function headers() {
  return { Authorization: `Bearer ${process.env.REACT_APP_WEATHER_API_KEY}` };
}

export async function fetchWeatherByCoords(lat, lon, locationName = '') {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&days=7&units=metric`,
    { headers: headers() }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Weather API error: ${res.status}`);
  }
  const raw = await res.json();
  const enriched = await enrichWeatherResponse(raw);
  // If reverse geocode only got the country code, prefer what the user typed
  if (!enriched.resolvedLocation || enriched.resolvedLocation.length <= 3) {
    enriched.resolvedLocation = locationName || 'Your Location';
  }
  return enriched;
}

export async function fetchWeatherByGeo() {
  const res = await fetch(
    `${BASE_URL}/weather-geo?ip=auto&days=7&units=metric`,
    { headers: headers() }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Geo weather error: ${res.status}`);
  }
  const raw = await res.json();
  return enrichWeatherResponse(raw);
}