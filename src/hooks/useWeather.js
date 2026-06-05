import { useState } from 'react';
import { fetchWeatherByCoords, fetchWeatherByGeo } from '../services/weatherService';
import { geocodeLocation } from '../services/locationService';

export function useWeather() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  async function fetchForLocation(locationInput, useAutoDetect) {
    setLoading(true);
    setError(null);
    try {
      if (useAutoDetect) {
        return await fetchWeatherByGeo();
      } else {
        const geo = await geocodeLocation(locationInput);
        return await fetchWeatherByCoords(geo.lat, geo.lon, locationInput);
      }
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, fetchForLocation };
}