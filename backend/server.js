const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Validate city or coordinates
function getWeatherParams(query) {
  const { q, city, lat, lon } = query;

  if (q || city) {
    return { q: q || city };
  }

  if (lat !== undefined && lon !== undefined) {
    const latitude = Number(lat);
    const longitude = Number(lon);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new Error("Invalid coordinates");
    }

    return { lat: latitude, lon: longitude };
  }

  throw new Error("Please provide a city or valid coordinates");
}

// Common OpenWeather API request
async function fetchWeather(endpoint, params) {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is not configured");
  }

  const url = new URL(`${BASE_URL}/${endpoint}`);

  url.search = new URLSearchParams({
    ...params,
    appid: API_KEY,
    units: "metric",
  }).toString();

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "OpenWeather request failed");
  }

  return data;
}

// Test route
app.get("/", (req, res) => {
  res.send("WeatherTrack Backend is running!");
});

// Current weather API
app.get("/api/weather", async (req, res) => {
  try {
    const params = getWeatherParams(req.query);
    const data = await fetchWeather("weather", params);

    res.json(data);
  } catch (error) {
    const status =
      error.message === "Invalid coordinates" ||
      error.message.startsWith("Please provide")
        ? 400
        : 500;

    res.status(status).json({
      message: error.message,
    });
  }
});

// Five-day forecast API
app.get("/api/forecast", async (req, res) => {
  try {
    const params = getWeatherParams(req.query);
    const data = await fetchWeather("forecast", params);

    res.json(data);
  } catch (error) {
    const status =
      error.message === "Invalid coordinates" ||
      error.message.startsWith("Please provide")
        ? 400
        : 500;

    res.status(status).json({
      message: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`WeatherTrack backend running on port ${PORT}`);
});
