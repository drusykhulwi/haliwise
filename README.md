# HaliWise Events

> Smart weather-aware event planning — powered by the Weather-AI API.

HaliWise Events takes the guesswork out of event planning. Enter your event details and get a real-time weather suitability score, venue recommendation, personalised outfit suggestions, and practical planning tips — all driven by live forecast data.

**Live demo:** [haliwise.vercel.app](https://haliwise.vercel.app)

---

## Features

| Feature | Description |
|---|---|
| Weather Suitability Score | 0–100 score tailored to your event type and forecast conditions |
| Venue Recommendation | Outdoor / Indoor / Hybrid advice based on rain, wind, and temperature |
| Risk Assessment | Rain, wind, heat, and cold risk levels for your event day |
| Outfit Suggestions | Clothing advice that embeds real forecast values (e.g. "17°C — layer up") |
| Planning Tips | Practical, condition-specific advice for vendors, guests, and logistics |
| 7-Day Forecast Strip | Visual strip with the event day highlighted |
| Auto-detect location | IP-based location via Weather-AI geo endpoint |
| Date validation | Blocks dates beyond the 7-day forecast window for the free tier with a clear message |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (Create React App) |
| Styling | Tailwind CSS v3 |
| Routing | React Router DOM v6 |
| Weather data | [Weather-AI API](https://weather-ai.co) |
| Geocoding | OpenStreetMap Nominatim (reverse geocode for city name) |
| Serverless proxy | Vercel Functions (`/api/weather`, `/api/weather-geo`) |
| Deployment | Vercel |

---

## Project Structure

```
haliwise-events/
├── api/                        # Vercel serverless proxy functions
│   ├── weather.js              # Proxies /v1/weather (by lat/lon)
│   └── weather-geo.js          # Proxies /v1/weather-geo (IP auto-detect)
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── common/             # Button, Card, Loader
│   │   ├── event/              # EventForm, EventTypeSelector, VenueSelector
│   │   ├── weather/            # WeatherCard, ForecastSummary
│   │   ├── recommendation/     # VenueRecommendation, OutfitRecommendation, RiskBadge
│   │   └── score/              # WeatherScore (animated SVG ring)
│   │
│   ├── engine/                 # Decision logic — no API calls, pure functions
│   │   ├── scoringEngine.js    # Calculates 0–100 suitability score
│   │   ├── venueEngine.js      # Recommends outdoor / indoor / hybrid
│   │   ├── outfitEngine.js     # Generates clothing suggestions
│   │   ├── recommendationEngine.js  # Generates planning tips
│   │   └── eventWeights.js     # Per-event-type scoring weights
│   │
│   ├── hooks/
│   │   ├── useWeather.js       # Fetches and manages weather state
│   │   └── useEventPlanner.js  # Orchestrates all engines
│   │
│   ├── services/
│   │   ├── weatherService.js   # API calls (proxy in prod, direct in dev)
│   │   └── locationService.js  # Nominatim geocoding for manual location entry
│   │
│   ├── utils/
│   │   ├── parseWeather.js     # Normalises API response + WMO code → label/icon
│   │   ├── getForecastDay.js   # Picks the correct forecast day for the event date
│   │   ├── calculateRisk.js    # Derives risk levels from forecast values
│   │   └── formatDate.js       # Date/time formatting helpers
│   │
│   ├── context/
│   │   └── EventContext.jsx    # Passes results between Home and Results pages
│   │
│   ├── pages/
│   │   ├── Home.jsx            # Event form + date validation
│   │   └── Results.jsx         # Full results dashboard
│   │
│   └── routes/
│       └── AppRoutes.jsx
│
├── vercel.json                 # Build config + serverless function routing
├── .env.example                # Environment variable template
└── README.md
```

---

## How It Works

```
User fills in event details (name, type, venue, location, date)
                │
                ▼
        Date validation
        (blocks > 7 days out with a clear message)
                │
                ▼
    weatherService.js
    ├── Production → calls /api/weather (Vercel proxy, no CORS)
    └── Development → calls Weather-AI API directly
                │
                ▼
        parseWeather.js
        ├── Normalises daily field names (temp_max → temperature_max)
        ├── Maps WMO condition codes → emoji + label
        └── Reverse geocodes lat/lon → city name (Nominatim)
                │
                ▼
        getForecastDay.js
        Selects the daily entry matching the event date
                │
                ▼
        Decision Engine Layer
        ├── scoringEngine   → Weather Suitability Score (0–100)
        ├── venueEngine     → Outdoor / Indoor / Hybrid recommendation
        ├── outfitEngine    → Clothing suggestions with real temp/rain values
        └── recommendationEngine → Planning tips
                │
                ▼
        Results Dashboard
        ├── Score ring (animated SVG)
        ├── Venue recommendation card
        ├── Weather card (high/low/wind/humidity/rain bar + sunrise/sunset)
        ├── 7-day forecast strip (event day highlighted)
        ├── Risk badges (Rain / Wind / Heat / Cold)
        ├── Outfit suggestions
        └── Planning tips
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Weather-AI API key — [get one free at weather-ai.co](https://weather-ai.co)

### 1. Clone the repository

```bash
git clone https://github.com/drusykhulwi/haliwise.git
cd haliwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your API key

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder:

```
REACT_APP_WEATHER_API_KEY=wai_your_actual_key_here
```

> ⚠️ Never commit `.env` — it is already in `.gitignore`.

### 4. Run locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** In local development, the app calls the Weather-AI API directly from the browser. This works fine on localhost. In production (Vercel), all API calls are routed through serverless proxy functions in `/api/` to avoid CORS restrictions.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `REACT_APP_WEATHER_API_KEY` | ✅ Yes | Your Weather-AI API key (`wai_...`) |

---

## API Endpoints Used

| Endpoint | Plan | Purpose |
|---|---|---|
| `GET /v1/weather` | Free | Forecast by lat/lon (up to 7 days) |
| `GET /v1/weather-geo` | Free | Auto-detect location from IP + forecast |


---

## Design

- **Brand colours:** Forest green (`#1a6b1a`) + sky blue (`#1488e8`) on a deep dark background (`#070f07`)
- **Typography:** Playfair Display (headings) + DM Sans (body)
- **Theme:** Dark, minimal, glass-morphism cards

---