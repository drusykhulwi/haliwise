/**
 * Vercel serverless proxy for Weather-AI /v1/weather
 * Forwards lat, lon, days, units to the upstream API server-side,
 * avoiding CORS restrictions that block direct browser requests.
 *
 * Frontend calls: GET /api/weather?lat=...&lon=...&days=7&units=metric
 */
export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lon, days = 7, units = 'metric' } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'lat and lon are required' });
  }

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const upstream = await fetch(
      `https://api.weather-ai.co/v1/weather?lat=${lat}&lon=${lon}&days=${days}&units=${units}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    const data = await upstream.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate'); // cache 10 min
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream weather API failed', detail: err.message });
  }
}