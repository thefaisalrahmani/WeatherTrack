
import "../styles/RainForecast.css";

export default function RainForecast({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="RainForecast">
        <h3>5-Day Weather Forecast</h3>
        <p className="forecastEmpty">
          Forecast data is not available.
        </p>
      </div>
    );
  }

  // Group forecast entries by date
  const groupedForecast = forecast.reduce((groups, item) => {
    const date = item.time.split(" ")[0];

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(item);
    return groups;
  }, {});

  // Calculate daily weather information
  const dailyForecast = Object.entries(groupedForecast).map(
    ([date, items]) => {
      const probability = Math.round(
        Math.max(...items.map((item) => item.pop)) * 100
      );

      const rainfall = items.reduce(
        (total, item) => total + item.rainfall,
        0
      );

      const tempMin = Math.min(
        ...items.map((item) => item.tempMin)
      );

      const tempMax = Math.max(
        ...items.map((item) => item.tempMax)
      );

      const representativeWeather = items.reduce((highest, current) =>
        current.pop > highest.pop ? current : highest
      );

      return {
        date,
        probability,
        rainfall: Number(rainfall.toFixed(2)),
        tempMin: Math.round(tempMin),
        tempMax: Math.round(tempMax),
        weatherId: representativeWeather.weatherId,
        weatherDescription: representativeWeather.weatherDescription,
      };
    }
  );

  // Select icon using OpenWeather condition ID
  const getWeatherIcon = (weatherId) => {
    if (!weatherId) return "🌤️";

    if (weatherId >= 200 && weatherId < 300) return "⛈️";
    if (weatherId >= 300 && weatherId < 400) return "🌦️";
    if (weatherId >= 500 && weatherId < 600) return "🌧️";
    if (weatherId >= 600 && weatherId < 700) return "❄️";
    if (weatherId >= 700 && weatherId < 800) return "🌫️";
    if (weatherId === 800) return "☀️";
    if (weatherId === 801) return "🌤️";
    if (weatherId === 802) return "⛅";
    if (weatherId >= 803 && weatherId <= 804) return "☁️";

    return "🌤️";
  };

  const formatDay = (date) => {
    return new Date(`${date}T12:00:00`).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        day: "numeric",
      }
    );
  };

  return (
    <div className="RainForecast">
      <div className="forecastHeader">
        <div>
          <h3>5-Day Weather Forecast</h3>
          <p>Daily weather predictions</p>
        </div>
        <span className="forecastBadge">5 Days</span>
      </div>

      <div className="dailyForecast">
        {dailyForecast.slice(0, 5).map((item) => (
          <div className="dailyRainItem" key={item.date}>
            <div className="forecastDayInfo">
              <span className="dailyDay">
                {formatDay(item.date)}
              </span>

              <span
                className="dailyWeatherIcon"
                title={item.weatherDescription}
              >
                {getWeatherIcon(item.weatherId)}
              </span>
            </div>

            <div className="dailyTemperature">
              <strong>{item.tempMax}°</strong>
              <span>{item.tempMin}°</span>
            </div>

            <div className="forecastRainInfo">
              <div className="dailyProgress">
                <div
                  className="dailyProgressFill"
                  style={{
                    width: `${item.probability}%`,
                  }}
                />
              </div>

              <strong className="dailyProbability">
                {item.probability}%
              </strong>
            </div>

            {item.rainfall > 0 && (
              <p className="dailyRainfall">
                💧 {item.rainfall} mm expected
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
