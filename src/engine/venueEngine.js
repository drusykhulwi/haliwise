export function getVenueRecommendation(dayData, current, preferredVenue) {
  const rain = dayData?.precipitation_probability ?? 10;
  const wind = dayData?.wind_speed               ?? current?.wind_speed ?? 0;
  const temp = dayData?.temperature_max          ?? current?.temperature ?? 22;
  const cond = (dayData?.condition               ?? current?.condition  ?? '').toLowerCase();

  let recommended = 'outdoor';
  let reasons     = [];
  let severity    = 'good';

  if (cond.includes('thunder') || cond.includes('storm')) {
    recommended = 'indoor'; severity = 'warning';
    reasons.push('Thunderstorm forecast — outdoor venue is unsafe');
  } else if (rain >= 70) {
    recommended = 'indoor'; severity = 'warning';
    reasons.push(`${rain}% chance of rain — indoor venue strongly recommended`);
  } else if (wind >= 50) {
    recommended = 'indoor'; severity = 'warning';
    reasons.push(`High winds forecast (${wind} km/h) — unsafe for outdoor events`);
  } else if (temp >= 38) {
    recommended = 'indoor'; severity = 'warning';
    reasons.push(`Extreme heat expected (${temp}°C) — indoor climate control essential`);
  } else if (rain >= 40 || wind >= 30) {
    recommended = 'hybrid'; severity = 'caution';
    if (rain >= 40) reasons.push(`${rain}% rain probability — have a covered backup area ready`);
    if (wind >= 30) reasons.push(`Gusty winds expected (${wind} km/h) — secure all décor`);
  } else {
    reasons.push('Weather conditions look favourable for an outdoor event');
    if (temp > 28) reasons.push(`Warm day (${temp}°C) — provide shade and chilled drinks`);
    if (temp < 15) reasons.push(`Cool day (${temp}°C) — consider heating arrangements for guests`);
  }

  if (preferredVenue === 'indoor') {
    recommended = 'indoor';
    if (severity === 'good') {
      reasons = ['Weather is lovely — your indoor choice works perfectly too'];
    }
  }

  const labels = { outdoor: 'Outdoor Recommended', indoor: 'Indoor Venue Recommended', hybrid: 'Hybrid Venue Suggested' };
  const icons  = { outdoor: '🌿', indoor: '🏢', hybrid: '⛺' };

  return { recommended, label: labels[recommended], icon: icons[recommended], reasons, severity };
}