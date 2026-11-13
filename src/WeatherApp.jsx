import SearchBox from "./SearchBox";
import WeatherDashboard from "./components/WeatherDashboard";
import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Mumbai",
    feelsLike: 24.84,
    temp: 25.05,
    tempMin: 25.05,
    tempMax: 25.05,
    humidity: 47,
    weather: "haze",
    sunrise: null,
    sunset: null,
    timezone: 0,
  });

  const [forecast, setForecast] = useState([]);

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const updateForecast = (newForecast) => {
    setForecast(newForecast);
  };

  return (
    <main className="weatherApp">
      <header className="weatherHeader">
        <h1>Weather Track</h1>
        <p>Check the weather conditions in your city</p>
      </header>

      <section className="weatherSearch">
        <SearchBox updateInfo={updateInfo} updateForecast={updateForecast} />
      </section>

      <section className="weatherContent">
        <WeatherDashboard info={weatherInfo} forecast={forecast} />
      </section>
    </main>
  );
}
