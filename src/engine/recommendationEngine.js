export function getPlanningTips(dayData, current, eventType) {
  const rain = dayData?.precipitation_probability ?? 10;
  const wind = dayData?.wind_speed               ?? current?.wind_speed ?? 0;
  const temp = dayData?.temperature_max          ?? current?.temperature ?? 22;
  const tips = [];

  if (rain >= 50) {
    tips.push('Set up a covered backup area — marquee, tent, or nearby indoor space');
    tips.push('Brief all vendors and caterers on the rain contingency plan');
    if (eventType === 'wedding')  tips.push('Ask your photographer to prepare a rainy-day shot list');
    if (['concert', 'festival'].includes(eventType)) tips.push('Ensure all sound and electrical equipment is waterproofed or sheltered');
  }
  if (temp >= 32) {
    tips.push('Arrange shade structures, misting fans, or parasols for guest comfort');
    tips.push('Stock extra chilled water and cold beverages throughout the event');
    tips.push('Schedule outdoor activities for early morning or late afternoon to avoid peak heat');
  }
  if (temp < 12) {
    tips.push('Arrange outdoor heaters or fire pits for guest comfort');
    tips.push('Offer a warm drinks station — hot chocolate, tea, or coffee');
  }
  if (wind >= 30) {
    tips.push('Anchor all signage, banners, and table centrepieces securely');
    tips.push('Use low, wind-resistant floral arrangements');
  }
  if (eventType === 'sports' && rain >= 40) {
    tips.push("Check the venue's wet-weather policy — know the postponement process in advance");
  }
  if (eventType === 'wedding' && rain >= 30) {
    tips.push('Plan an indoor-outdoor flow so the ceremony can move inside quickly if needed');
  }
  if (rain < 20 && wind < 20 && temp >= 18 && temp <= 30) {
    tips.push('Conditions look great — consider maximising outdoor space and photo opportunities');
  }
  if (tips.length === 0) {
    tips.push('Weather looks cooperative — no special precautions needed. Enjoy your event!');
  }
  return tips;
}