import React, { useEffect, useState } from "react";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";

const WeatherApi = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [condition, setCondition] = useState(null);

  const getWeatherData = async () => {
    try {
      const rain = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
          import.meta.env.VITE_SKY_API
        }`
      );

      console.log(rain.data);

      const rainData = rain.data;
    //   if (!rainData || rainData.length === 0) {
    //     console.log("city not found");
    //     return;
    //   }

      setWeather(rainData);
      const { lat, lon } = rainData[0];

      const latlog = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_SKY_API
        }&units=metric`
      );

      setCondition(latlog.data);
      console.log(latlog.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <>
      <h2>The weather condition of {city}</h2>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city/state name"
      />

      <button onClick={getWeatherData}>Weather Update</button>

      {weather.map((item, index) => (
        <div key={index}>
          <p>Country: {item.country} </p>
          <p>State: {item.state || "N/A"}</p>
        </div>
      ))}

      <WiHumidity />
      <LuWind />
      {condition ? (
        <div>
          <h2>Weather Details</h2>
          <p>Temperature: {condition.main.temp}°C</p>
          <p>Condition: {condition.weather[0].description}</p>
          <p>Humidity: {condition.main.humidity}%</p>
          <p>Wind Speed: {condition.wind.speed} m/s</p>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default WeatherApi;
