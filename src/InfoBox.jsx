
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import "./InfoBox.css";

import SunnyIcon from "@mui/icons-material/Sunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SevereColdIcon from "@mui/icons-material/SevereCold";

export default function InfoBox({ info }) {
  const HOT_URL =
    "https://images.unsplash.com/photo-1760368214914-a14981264de0?w=800&auto=format&fit=crop&q=60";

  const COLD_URL =
    "https://plus.unsplash.com/premium_photo-1672115680863-9353a690495a?w=800&auto=format&fit=crop&q=60";

  const RAIN_URL =
    "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2070&auto=format&fit=crop";

  // Select image according to weather conditions
  const weatherImage =
    info.humidity > 80
      ? RAIN_URL
      : info.temp > 15
        ? HOT_URL
        : COLD_URL;

  // Select icon according to weather conditions
  const weatherIcon =
    info.humidity > 80 ? (
      <ThunderstormIcon />
    ) : info.temp < 15 ? (
      <SevereColdIcon />
    ) : (
      <SunnyIcon />
    );

  return (
    <div className="InfoBox">
      <Card className="currentWeatherMuiCard" elevation={0}>
        <CardMedia
          className="weatherImage"
          component="img"
          image={weatherImage}
          alt="Current weather"
        />

        <CardContent className="weatherCardContent">
          <div className="weatherCity">
            <div>
              <Typography variant="h5" className="cityName">
                {info.city}
              </Typography>

              <Typography className="weatherDescription">
                {info.weather}
              </Typography>
            </div>

            <div className="weatherIcon">
              {weatherIcon}
            </div>
          </div>

          <div className="mainTemperature">
            <span>{Math.round(info.temp)}°</span>
            <span className="temperatureUnit">C</span>
          </div>

          <Typography className="feelsLike">
            Feels like {Math.round(info.feelsLike)}°C
          </Typography>

          <div className="weatherDetails">
            <div className="weatherDetailItem">
              <span className="detailIcon">💧</span>
              <div>
                <p>Humidity</p>
                <strong>{info.humidity}%</strong>
              </div>
            </div>

            <div className="weatherDetailItem">
              <span className="detailIcon">🌡️</span>
              <div>
                <p>Feels Like</p>
                <strong>{Math.round(info.feelsLike)}°C</strong>
              </div>
            </div>

            <div className="weatherDetailItem">
              <span className="detailIcon">❄️</span>
              <div>
                <p>Min Temp</p>
                <strong>{Math.round(info.tempMin)}°C</strong>
              </div>
            </div>

            <div className="weatherDetailItem">
              <span className="detailIcon">☀️</span>
              <div>
                <p>Max Temp</p>
                <strong>{Math.round(info.tempMax)}°C</strong>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
