
import InfoBox from "../InfoBox";
import SunInformation from "./SunInformation";
import RainForecast from "./RainForecast";
import "../styles/WeatherDashboard.css";

export default function WeatherDashboard({ info, forecast }) {
  return (
    <div className="WeatherDashboard">

      {/* Left: 5-Day Forecast */}
      <section className="dashboardCard forecastCard">
        <RainForecast forecast={forecast} />
      </section>

      {/* Center: Current Weather */}
      <section className="dashboardCard currentWeatherCard">
        <InfoBox info={info} />
      </section>

      {/* Right: Sunrise and Sunset */}
      <section className="dashboardCard sunInformationCard">
        <SunInformation info={info} />
      </section>

    </div>
  );
}
