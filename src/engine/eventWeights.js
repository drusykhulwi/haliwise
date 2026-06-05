// Weight of each factor per event type (must sum to 1.0)
export const EVENT_WEIGHTS = {
  wedding:    { temperature: 0.25, rain: 0.40, wind: 0.25, humidity: 0.10 },
  concert:    { temperature: 0.20, rain: 0.35, wind: 0.20, humidity: 0.25 },
  sports:     { temperature: 0.20, rain: 0.30, wind: 0.30, humidity: 0.20 },
  picnic:     { temperature: 0.30, rain: 0.45, wind: 0.15, humidity: 0.10 },
  bbq:        { temperature: 0.30, rain: 0.40, wind: 0.15, humidity: 0.15 },
  corporate:  { temperature: 0.20, rain: 0.25, wind: 0.15, humidity: 0.40 },
  birthday:   { temperature: 0.25, rain: 0.35, wind: 0.20, humidity: 0.20 },
  graduation: { temperature: 0.25, rain: 0.40, wind: 0.20, humidity: 0.15 },
  festival:   { temperature: 0.20, rain: 0.35, wind: 0.25, humidity: 0.20 },
  conference: { temperature: 0.15, rain: 0.20, wind: 0.10, humidity: 0.55 },
  photoshoot: { temperature: 0.20, rain: 0.50, wind: 0.20, humidity: 0.10 },
  other:      { temperature: 0.25, rain: 0.35, wind: 0.20, humidity: 0.20 },
};

export function getWeights(eventType) {
  return EVENT_WEIGHTS[eventType] || EVENT_WEIGHTS.other;
}