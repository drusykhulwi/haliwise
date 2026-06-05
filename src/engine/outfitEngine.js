export function getOutfitRecommendations(dayData, current, eventType) {
  const rain = dayData?.precipitation_probability ?? 10;
  const wind = dayData?.wind_speed?? current?.wind_speed ?? 0;
  const temp = dayData?.temperature_max ?? current?.temperature ?? 22;

  const items = [];

  // Temperature
  if (temp >= 32) {
    items.push(`Very hot day expected (${temp}°C) — wear lightweight, breathable fabrics like linen or cotton`);
    items.push('Light colours to reflect heat');
    items.push('Wide-brim hat and sunglasses');
    items.push('Apply SPF 30+ sunscreen');
  } else if (temp >= 24) {
    items.push(`Warm day (${temp}°C) — light cotton or linen clothing`);
    items.push('Comfortable breathable footwear');
    items.push('Sunglasses recommended');
  } else if (temp >= 16) {
    items.push(`Mild temperatures (${temp}°C) — layer up with a light jacket or cardigan`);
    items.push('A layered outfit lets you adjust as the day warms or cools');
  } else if (temp >= 8) {
    items.push(`Cool day (${temp}°C) — a warm jacket or coat is needed`);
    items.push('Thermal underlayer recommended');
    items.push('Closed-toe shoes or boots');
  } else {
    items.push(`Very cold (${temp}°C) — heavy winter coat and thermal layers are essential`);
    items.push('Gloves, scarf, and warm hat');
    items.push('Insulated waterproof boots');
  }

  // Rain
  if (rain >= 60) {
    items.push(`High rain chance (${rain}%) — bring a waterproof jacket or poncho`);
    items.push('Waterproof or closed shoes — avoid suede or leather');
    items.push('Carry a compact umbrella');
  } else if (rain >= 30) {
    items.push(`Some rain possible (${rain}%) — pack a compact umbrella just in case`);
    items.push('A water-resistant outer layer is a sensible idea');
  }

  // Wind
  if (wind >= 40) {
    items.push(`Strong winds forecast (${wind} km/h) — secure hats and loose accessories`);
    if (['wedding', 'photoshoot'].includes(eventType)) {
      items.push('Avoid voluminous skirts, veils, or flowing fabrics in high wind');
    }
  } else if (wind >= 25) {
    items.push(`Breezy conditions (${wind} km/h) — a light windproof layer will help`);
  }

  // Event-specific
  if (eventType === 'sports') {
    items.push('Athletic wear with moisture-wicking fabric');
    items.push('Supportive, comfortable footwear');
  }
  if (eventType === 'bbq' || eventType === 'picnic') {
    items.push("Casual, comfortable clothing — you'll be moving around");
    items.push('Flat shoes suitable for grass or uneven ground');
  }
  if (eventType === 'photoshoot') {
    items.push('Avoid all-white or highly reflective clothing that can overexpose in photos');
  }
  if (eventType === 'wedding' || eventType === 'graduation') {
    items.push('Dress shoes — if the event is on grass, opt for block heels over stilettos');
  }
  if (eventType === 'concert' || eventType === 'festival') {
    items.push("Comfortable standing or walking shoes — you'll be on your feet");
  }

  return items;
}