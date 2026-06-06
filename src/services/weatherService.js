import { enrichWeatherResponse, reverseGeocode } from '../utils/parseWeather';

const IS_PROD = process.env.NODE_ENV === 'production';
const PROXY   = '/api';
const DIRECT  = 'https://api.weather-ai.co/v1';

function directHeaders() {
  return { Authorization: `Bearer ${process.env.REACT_APP_WEATHER_API_KEY}` };
}

export async function fetchWeatherByCoords(lat, lon, userTypedLocation = '') {
  const url = IS_PROD
    ? `${PROXY}/weather?lat=${lat}&lon=${lon}&days=7&units=metric`
    : `${DIRECT}/weather?lat=${lat}&lon=${lon}&days=7&units=metric`;

  const res = await fetch(url, IS_PROD ? {} : { headers: directHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Weather API error: ${res.status}`);
  }

  const raw      = await res.json();
  const enriched = enrichWeatherResponse(raw); // synchronous, never throws

  // Use what the user typed as the display name — it's already what they expect
  // Fall back to reverse geocode only if they used auto-detect (no typed input)
  let resolvedLocation = userTypedLocation;
  if (!resolvedLocation) {
    resolvedLocation = await reverseGeocode(raw.location?.lat, raw.location?.lon);
  }
  if (!resolvedLocation) {
    resolvedLocation = raw.location?.timezone?.split('/').pop()?.replace(/_/g, ' ') ?? 'Your Location';
  }

  return { ...enriched, resolvedLocation };
}

export async function fetchWeatherByGeo() {
  const url = IS_PROD
    ? `${PROXY}/weather-geo?days=7&units=metric`
    : `${DIRECT}/weather-geo?ip=auto&days=7&units=metric`;

  const res = await fetch(url, IS_PROD ? {} : { headers: directHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Geo weather error: ${res.status}`);
  }

  const raw      = await res.json();
  const enriched = enrichWeatherResponse(raw);

  // Reverse geocode to get city name from the detected lat/lon
  let resolvedLocation = await reverseGeocode(raw.location?.lat, raw.location?.lon);
  if (!resolvedLocation) {
    resolvedLocation = raw.location?.timezone?.split('/').pop()?.replace(/_/g, ' ') ?? 'Your Location';
  }

  return { ...enriched, resolvedLocation };
}