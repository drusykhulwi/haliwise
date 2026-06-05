export function geocodeLocation(locationName) {
  return fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`,
    { headers: { 'Accept-Language': 'en' } }
  )
    .then(r => r.json())
    .then(data => {
      if (!data.length) throw new Error('Location not found. Try a more specific city name.');
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
        display: data[0].display_name,
      };
    });
}

export function getBrowserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Geolocation not supported'));
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      err => reject(err),
      { timeout: 8000 }
    );
  });
}
