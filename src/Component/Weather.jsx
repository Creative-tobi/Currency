import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("Abuja");
  const [weather, setWeather] = useState([]);
  const [condition, setCondition] = useState(null);

  const getWeatherData = async () => {
    try {
      // Get latitude and longitude from city name
      const geoRes = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
          import.meta.env.VITE_SKY_API
        }`
      );

      const geoData = geoRes.data;

      if (!geoData || geoData.length === 0) {
        console.log("City not found");
        return;
      }

      setWeather(geoData);
      const { lat, lon } = geoData[0];

      // Get weather condition using lat/lon
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_SKY_API
        }&units=metric`
      );

      setCondition(weatherRes.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div>
      <h1>Search Result for {city}</h1>

      {/* Show location info */}
      {weather.map((item, index) => (
        <div key={index}>
          <p>Country: {item.country}</p>
          <p>State: {item.state || "N/A"}</p>
        </div>
      ))}

      {/* Show weather info */}
      {condition ? (
        <div>
          <h2>Weather Details</h2>
          <p>Temperature: {condition.main.temp}°C</p>
          <p>Condition: {condition.weather[0].description}</p>
          <p>Humidity: {condition.main.humidity}%</p>
          <p>Wind Speed: {condition.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;

