import { EVENT_WEIGHTS } from './eventWeights';

function scoreTemperature(temp) {
  if (temp >= 18 && temp <= 28) return 100;
  if (temp >= 14 && temp <  18) return 100 - (18 - temp) * 8;
  if (temp >  28 && temp <= 35) return 100 - (temp - 28) * 7;
  if (temp >  35)               return Math.max(0, 40 - (temp - 35) * 8);
  if (temp >=  5 && temp <  14) return Math.max(0, 30 - (14 - temp) * 3);
  return 0;
}
function scoreRain(prob) {
  if (prob <= 10) return 100;
  if (prob <= 20) return 90;
  if (prob <= 35) return 75;
  if (prob <= 50) return 55;
  if (prob <= 65) return 35;
  if (prob <= 80) return 15;
  return 0;
}
function scoreWind(speed) {
  if (speed <= 10) return 100;
  if (speed <= 20) return 85;
  if (speed <= 30) return 65;
  if (speed <= 45) return 40;
  if (speed <= 60) return 20;
  return 5;
}
function scoreHumidity(hum) {
  if (hum >= 40 && hum <= 60) return 100;
  if (hum < 40)  return Math.max(60, 100 - (40 - hum));
  if (hum <= 80) return Math.max(50, 100 - (hum - 60) * 2);
  return 30;
}

// All fields are post-normalisation (temperature_max, wind_speed, etc.)
export function calculateScore(dayData, current, eventType) {
  const weights = EVENT_WEIGHTS[eventType] || EVENT_WEIGHTS.other;

  const temp = dayData?.temperature_max ?? current?.temperature ?? 22;
  const rain = dayData?.precipitation_probability ?? 10;
  const wind = dayData?.wind_speed ?? current?.wind_speed ?? 10;
  const hum  = current?.humidity ?? 55;

  const raw = Math.round(
    scoreTemperature(temp) * weights.temperature +
    scoreRain(rain) * weights.rain +
    scoreWind(wind) * weights.wind +
    scoreHumidity(hum) * weights.humidity
  );
  const score = Math.min(100, Math.max(0, raw));

  let label, color;
  if (score >= 85)      { label = 'Excellent'; color = '#4aaa4a'; }
  else if (score >= 70) { label = 'Good';      color = '#78c878'; }
  else if (score >= 55) { label = 'Fair';      color = '#e8b84b'; }
  else if (score >= 40) { label = 'Poor';      color = '#e87a2a'; }
  else                  { label = 'Severe';    color = '#e83a2a'; }

  return { score, label, color };
}