import { enrichWeatherResponse } from '../utils/parseWeather';

/**
 * In production (Vercel), we call our own /api/* serverless proxies to avoid CORS.
 * In local dev, CRA's dev server doesn't need a proxy since we call the API directly
 * and browsers allow localhost cross-origin requests during development.
 */
const IS_PROD = process.env.NODE_ENV === 'production';
const PROXY_BASE = '/api';
const DIRECT_BASE = 'https://api.weather-ai.co/v1';

function directHeaders() {
  return { Authorization: `Bearer ${process.env.REACT_APP_WEATHER_API_KEY}` };
}

export async function fetchWeatherByCoords(lat, lon, locationName = '') {
  let res;

  if (IS_PROD) {
    // Call our Vercel proxy — no API key or CORS needed client-side
    res = await fetch(`${PROXY_BASE}/weather?lat=${lat}&lon=${lon}&days=7&units=metric`);
  } else {
    res = await fetch(
      `${DIRECT_BASE}/weather?lat=${lat}&lon=${lon}&days=7&units=metric`,
      { headers: directHeaders() }
    );
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Weather API error: ${res.status}`);
  }

  const raw = await res.json();
  const enriched = await enrichWeatherResponse(raw);

  // If reverse geocode only returned a short country code, prefer the user's typed location
  if (!enriched.resolvedLocation || enriched.resolvedLocation.length <= 3) {
    enriched.resolvedLocation = locationName || 'Your Location';
  }
  return enriched;
}

export async function fetchWeatherByGeo() {
  let res;

  if (IS_PROD) {
    res = await fetch(`${PROXY_BASE}/weather-geo?days=7&units=metric`);
  } else {
    res = await fetch(
      `${DIRECT_BASE}/weather-geo?ip=auto&days=7&units=metric`,
      { headers: directHeaders() }
    );
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Geo weather error: ${res.status}`);
  }

  const raw = await res.json();
  return enrichWeatherResponse(raw);
}