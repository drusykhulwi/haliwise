/**
 * Vercel serverless proxy for Weather-AI /v1/weather-geo
 * Detects user location from their real IP via the upstream API,
 * then returns forecast data — all server-side, no CORS issues.
 *
 * Frontend calls: GET /api/weather-geo?days=7&units=metric
 *
 * IMPORTANT: Vercel forwards the real client IP in x-forwarded-for,
 * which the Weather-AI API reads for geo-detection.
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { days = 7, units = 'metric' } = req.query;

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Forward the real client IP so the geo-detection works correctly
  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || req.connection?.remoteAddress
    || '';

  try {
    const upstream = await fetch(
      `https://api.weather-ai.co/v1/weather-geo?ip=auto&days=${days}&units=${units}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          // Pass real client IP through so Weather-AI geo-detects the user, not Vercel's server
          'X-Forwarded-For': clientIp,
          'X-Real-IP': clientIp,
        }
      }
    );

    const data = await upstream.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream weather-geo API failed', detail: err.message });
  }
}