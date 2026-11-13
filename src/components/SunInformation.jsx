
import "../styles/SunInformation.css";

export default function SunInformation({ info }) {
  // Convert Unix timestamp into local city time
  const formatTime = (timestamp) => {
    const date = new Date(
      (timestamp + info.timezone) * 1000
    );

    return date.toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Don't display until actual sun data is available
  if (!info.sunrise || !info.sunset) {
    return (
      <div className="SunInformation">
        <h3>Sun Information</h3>
        <p className="sunEmpty">
          Sun information is not available.
        </p>
      </div>
    );
  }

  // Calculate total daylight duration
  const daylightSeconds = info.sunset - info.sunrise;

  const daylightHours = Math.floor(
    daylightSeconds / 3600
  );

  const daylightMinutes = Math.floor(
    (daylightSeconds % 3600) / 60
  );

  return (
    <div className="SunInformation">
      <div className="sunHeader">
        <div>
          <h3>Sun Information</h3>
          <p>Daily sunlight details</p>
        </div>
        <span className="sunHeaderIcon">☀️</span>
      </div>

      <div className="sunDetails">
        <div className="sunItem sunriseItem">
          <span className="sunItemIcon">🌅</span>
          <div>
            <h4>Sunrise</h4>
            <p>{formatTime(info.sunrise)}</p>
          </div>
        </div>

        <div className="sunItem sunsetItem">
          <span className="sunItemIcon">🌇</span>
          <div>
            <h4>Sunset</h4>
            <p>{formatTime(info.sunset)}</p>
          </div>
        </div>

        <div className="sunItem daylightItem">
          <span className="sunItemIcon">☀️</span>
          <div>
            <h4>Daylight Duration</h4>
            <p>
              {daylightHours}h {daylightMinutes}m
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
