export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatTime(timeStr) {
  if (!timeStr) return '';
  return timeStr.slice(0, 5);
}
