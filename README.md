# 🌦 HaliWise Events

> Smart weather-aware event planning and outfit recommendation platform.

Live demo: 

---

## What It Does

HaliWise Events connects to the **Weather-AI API** to fetch real-time forecasts and transform raw data into actionable event planning intelligence:

- **Weather Suitability Score** (0–100) tailored to your event type
- **Venue Recommendation** — Outdoor, Indoor, or Hybrid, based on conditions
- **Risk Assessment** — Rain, Wind, Heat, and Cold risk levels
- **Outfit Suggestions** — Weather-appropriate attire for your event
- **Planning Tips** — Practical advice based on forecast conditions
- **5-Day Forecast** summary
- **Auto-detect location** via Weather-AI IP lookup

---

## Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Frontend     | React (Create React App)    |
| Styling      | Tailwind CSS v3             |
| Routing      | React Router DOM v6         |
| API          | Weather-AI (`api.weather-ai.co`) |
| Geocoding    | OpenStreetMap Nominatim     |
| Deployment   | Vercel                     |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/drusykhulwi/haliwise.git
cd haliwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Create a `.env` file in the project root:


Then edit `.env` and replace the placeholder with your real key:

```
REACT_APP_WEATHER_API_KEY=wai_your_key_here
```

Get your key from [weather-ai.co](https://weather-ai.co).

> Never commit your `.env` file. It is already in `.gitignore`.

### 4. Run locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)


---

## API Endpoints Used

| Endpoint              | Purpose                                  |
|-----------------------|------------------------------------------|
| `GET /v1/weather`     | Fetch forecast by coordinates (lat/lon)  |
| `GET /v1/weather-geo` | Auto-detect location from IP + forecast  |

All requests use `units=metric` and the **Free plan** (7-day forecast).

---

## Environment Variables

| Variable                      | Required | Description            |
|-------------------------------|----------|------------------------|
| `REACT_APP_WEATHER_API_KEY`   | Yes   | Your Weather-AI API key|

---
