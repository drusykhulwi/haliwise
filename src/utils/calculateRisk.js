export function calculateRisk(dayData, current) {
  const rain = dayData?.precipitation_probability ?? 10;
  const wind = dayData?.wind_speed               ?? current?.wind_speed ?? 0;
  const temp = dayData?.temperature_max          ?? current?.temperature ?? 20;

  return {
    rain:    rain >= 70 ? 'High' : rain >= 40 ? 'Medium' : 'Low',
    wind:    wind >= 40 ? 'High' : wind >= 20 ? 'Medium' : 'Low',
    heat:    temp >= 36 ? 'High' : temp >= 30 ? 'Medium' : 'Low',
    cold:    temp <=  8 ? 'High' : temp <= 14 ? 'Medium' : 'Low',
    rainVal: rain,
    windVal: wind,
    tempVal: temp,
  };
}