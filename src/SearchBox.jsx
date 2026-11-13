
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState, useEffect } from "react";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

// Common function to communicate with our backend
const fetchBackend = async (endpoint, params) => {
    const queryString = new URLSearchParams(params).toString();

    const response = await fetch(
        `${API_BASE_URL}/${endpoint}?${queryString}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

export default function SearchBox({ updateInfo, updateForecast }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    // Transform current weather response
    const formatWeatherData = (data) => ({
        city: data.name,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feelsLike: data.main.feels_like,
        weather: data.weather[0].description,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        timezone: data.timezone,
    });

    // Transform forecast response
    const formatForecastData = (data) => {
        return data.list.map((item) => ({
            time: item.dt_txt,
            pop: item.pop,
            rainfall: item.rain?.["3h"] || 0,
            weatherId: item.weather[0].id,
            weatherDescription: item.weather[0].description,
            tempMin: item.main.temp_min,
            tempMax: item.main.temp_max,
        }));
    };

    // Fetch weather and forecast using city or coordinates
    const getWeatherData = async (params) => {
        const currentData = await fetchBackend("weather", params);
        const forecastData = await fetchBackend("forecast", params);

        updateInfo(formatWeatherData(currentData));
        updateForecast(formatForecastData(forecastData));
    };

    // Automatically detect user's location
    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const params = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    };

                    await getWeatherData(params);
                } catch (err) {
                    setError(err.message);
                }
            },
            (err) => {
                setError(err.message);
            }
        );
    }, []);

    // Handle city input
    const handleChange = (evt) => {
        setCity(evt.target.value);
        setError("");
    };

    // Search weather by city
    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            await getWeatherData({ q: city.trim() });

            setCity("");
            setError("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="city"
                    label="City Name"
                    variant="outlined"
                    required
                    value={city}
                    onChange={handleChange}
                />

                <br />
                <br />

                <Button variant="contained" type="submit">
                    Search
                </Button>

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}
