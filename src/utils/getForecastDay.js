/**
 * Given the full weather API response and an event date string (YYYY-MM-DD),
 * returns:
 *   { dayData, dayIndex, withinRange, daysAway }
 *
 * dayData  — the matching daily forecast object (or today's if out of range)
 * dayIndex — index in the daily array (0 = today)
 * withinRange — false if the event is more than 7 days away
 * daysAway    — how many days from today
 */
export function getForecastDay(weather, eventDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(eventDateStr);
  eventDate.setHours(0, 0, 0, 0);

  const daysAway = Math.round((eventDate - today) / (1000 * 60 * 60 * 24));
  const withinRange = daysAway >= 0 && daysAway <= 6; // 7-day = indices 0..6

  const daily = weather?.daily ?? [];

  // Try to match by date string in the forecast array
  let dayData = null;
  let dayIndex = 0;

  if (withinRange && daily.length > daysAway) {
    dayData  = daily[daysAway];
    dayIndex = daysAway;
  } else {
    // Out of range — use index 0 as a baseline but flag it
    dayData  = daily[0] ?? {};
    dayIndex = 0;
  }

  return { dayData, dayIndex, withinRange, daysAway };
}