import { calculateScore } from '../engine/scoringEngine';
import { getVenueRecommendation } from '../engine/venueEngine';
import { getOutfitRecommendations } from '../engine/outfitEngine';
import { getPlanningTips } from '../engine/recommendationEngine';
import { calculateRisk } from '../utils/calculateRisk';
import { getForecastDay } from '../utils/getForecastDay';

export function useEventPlanner() {
  function processResults(weather, eventForm) {
    const current = weather?.current ?? {};

    // Find the forecast day that matches the event date
    const { dayData, withinRange, daysAway } = getForecastDay(weather, eventForm.date);

    const score  = calculateScore(dayData, current, eventForm.eventType);
    const venue  = getVenueRecommendation(dayData, current, eventForm.venuePreference);
    const outfit = getOutfitRecommendations(dayData, current, eventForm.eventType);
    const tips   = getPlanningTips(dayData, current, eventForm.eventType, venue);
    const risk   = calculateRisk(dayData, current);

    return { score, venue, outfit, tips, risk, eventForm, weather, dayData, withinRange, daysAway };
  }

  return { processResults };
}