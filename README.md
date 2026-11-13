# 🌦️ WeatherTrack – Real-Time Weather Intelligence Platform

WeatherTrack is a full-stack weather application that provides real-time weather information and five-day forecasts using the OpenWeather API. It features location-based weather detection, city search, rainfall predictions, and detailed sunrise and sunset information through a responsive and user-friendly interface.

## 🚀 Features

- **Real-Time Weather:** Displays current temperature, feels-like temperature, humidity, and weather conditions.
- **Location-Based Weather:** Automatically detects the user's location using browser geolocation.
- **City Search:** Search for weather information by entering a city name.
- **Five-Day Forecast:** Displays upcoming weather forecasts with temperature ranges and weather conditions.
- **Rainfall Prediction:** Shows precipitation probability and expected rainfall.
- **Sunrise & Sunset:** Provides sunrise, sunset, and daylight duration information.
- **Dynamic Weather UI:** Displays weather icons and condition-based backgrounds.
- **Responsive Design:** User-friendly interface for different screen sizes.
- **Secure API Integration:** Uses a Node.js and Express backend to protect the OpenWeather API key.

## 🛠️ Technologies Used

**Frontend**

- React.js
- JavaScript
- Material UI (MUI)
- HTML5
- CSS3
- Vite

**Backend**

- Node.js
- Express.js
- REST APIs
- CORS
- dotenv

**API**

- OpenWeather API

**Tools**

- VS Code
- Git & GitHub
- npm

## 🏗️ Project Architecture

```text
WeatherTrack/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── .env
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── RainForecast.jsx
│   │   ├── SunInformation.jsx
│   │   └── WeatherDashboard.jsx
│   │
│   ├── styles/
│   ├── App.jsx
│   ├── WeatherApp.jsx
│   ├── SearchBox.jsx
│   ├── InfoBox.jsx
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run WeatherTrack locally.

### 1. Clone the Repository

```bash
git clone https://github.com/thefaisalrahmani/WeatherTrack.git
```

### 2. Navigate to the Project Directory

```bash
cd WeatherTrack
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Backend Dependencies

```bash
cd backend
npm install
```

### 5. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5001
OPENWEATHER_API_KEY=your_openweather_api_key
```

Get your API key from [OpenWeather](https://openweathermap.org/api).

**Important:** Never share or commit your actual API key. The `.env` file is excluded through `.gitignore`.

### 6. Start the Backend Server

From the `backend` directory, run:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5001
```

### 7. Start the Frontend

Open a new terminal in the main project directory and run:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Open the frontend URL in your browser to use WeatherTrack.

## 🔗 Backend API Endpoints

The Express backend provides the following endpoints:

| Method | Endpoint                            | Description                      |
| ------ | ----------------------------------- | -------------------------------- |
| GET    | `/api/weather?q=London`             | Current weather by city          |
| GET    | `/api/weather?lat=51.50&lon=-0.12`  | Current weather by coordinates   |
| GET    | `/api/forecast?q=London`            | Five-day forecast by city        |
| GET    | `/api/forecast?lat=51.50&lon=-0.12` | Five-day forecast by coordinates |

The backend communicates with OpenWeather and returns weather data to the React frontend.

## 🔐 Security

- OpenWeather API credentials are stored in backend environment variables.
- Environment files are excluded from Git using `.gitignore`.
- API requests are handled through the Express backend rather than directly from the frontend.

## 🔮 Future Enhancements

- Weather alerts and severe weather notifications.
- Hourly weather forecasts.
- Historical weather data.
- Air quality monitoring.
- Improved loading states and error handling.

## 👨‍💻 Author

**Faisal Rahmani**

- GitHub: [@thefaisalrahmani](https://github.com/thefaisalrahmani)

---

⭐ If you find this project useful, consider giving it a star on GitHub!
