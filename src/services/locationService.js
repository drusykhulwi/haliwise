/**
 * Geocode a city name to lat/lon using OpenStreetMap Nominatim.
 */
export async function geocodeLocation(locationName) {
  // Try city-level first
  const cityRes = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=3&featuretype=city&addressdetails=1`,
    { headers: { 'Accept-Language': 'en' } }
  );
  let results = await cityRes.json();

  // If no city-level result, fall back to general search
  if (!results.length) {
    const fallbackRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=3&addressdetails=1`,
      { headers: { 'Accept-Language': 'en' } }
    );
    results = await fallbackRes.json();
  }

  if (!results.length) {
    throw new Error(`Location "${locationName}" not found. Try a different city name.`);
  }

  // Pick the best result: prefer place_rank <= 16 (city/town level)
  const best = results.find(r => parseInt(r.place_rank) <= 16) ?? results[0];

  return {
    lat: parseFloat(best.lat),
    lon: parseFloat(best.lon),
    // Always show what the user typed — clean and unambiguous
    display: locationName,
  };
}