import React, { useEffect, useState } from "react";
import axios from "axios";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import cloud from "/public/cloud.png"


const Weather = () => {
  const [city, setCity] = useState("Lagos");
  const [cities, setCities] = useState("Osogbo");
  const [weather, setWeather] = useState([]);
  const [condition, setCondition] = useState(null);
  const [eather, setEather] = useState([]);
  const [ondition, setOndition] = useState(null);
  const [convert, setConvert] = useState(false);

  const getWeatherData = async () => {
    try {
      const rain = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${
          import.meta.env.VITE_SKY_API
        }`
      );

       const ran = await axios.get(
         `http://api.openweathermap.org/geo/1.0/direct?q=${cities}&limit=1&appid=${
           import.meta.env.VITE_SKY_API
         }`
       );

      console.log(rain.data);
      console.log(ran.data);

      const rainData = rain.data;
      const ranData = ran.data;
    //   if (!rainData || rainData.length === 0) {
    //     console.log("city not found");
    //     return;
    //   }

      setWeather(rainData);
      const { lat, lon } = rainData[0];
      setEather(ranData);
      const { lat: lat2, lon: lon2 } = ranData[0];

      const latlog = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_SKY_API
        }&units=metric`
      );

      const lattlog = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&appid=${
          import.meta.env.VITE_SKY_API
        }&units=metric`
      );

      setCondition(latlog.data);
      console.log(latlog.data);
      setOndition(lattlog.data);
      console.log(lattlog.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, []);

 const toggleUnit = () => {
   setConvert(!convert);
 };

  return (
    <>
      <div className="lg:w-150" id="wett">
        <div className="flex gap-8">
          <Link to="./WeatherApi">
            <button>Location</button>
          </Link>
          <Link to="./Weather">
            <button>Two Locations</button>
          </Link>
        </div>

        <input
          type="text"
          value={city}
          id="put"
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city/state name"
        />

        <input
          type="text"
          value={cities}
          id="put"
          onChange={(e) => setCities(e.target.value)}
          placeholder="Enter city/state name"
        />

        <button
          onClick={getWeatherData}
          className="bg-white text-black p-2 rounded-full">
          <IoSearch />
        </button>

        {weather.map((item, index) => (
          <div key={index}>
            <p>Country: {item.country} </p>
            <p>State: {item.state || "N/A"}</p>
          </div>
        ))}

        {eather.map((item, index) => (
          <div key={index}>
            <p>State: {item.state || "N/A"}</p>
          </div>
        ))}

        {condition && ondition && (
          <div>
            <div>
              <div>
                <img src={cloud} alt="" id="image" />
              </div>

              <p className="sun">
                {convert
                  ? `${Math.abs(
                      condition.main.temp - ondition.main.temp
                    ).toFixed(2)}°F`
                  : `${Math.abs(
                      condition.main.temp - ondition.main.temp
                    ).toFixed(2)}°C`}
              </p>
            </div>

            <p>{condition.weather[0].description}</p>
            <p>{ondition.weather[0].description}</p>

            <div className="flex gap-4">
              <div className="flex">
                <p id="corn">
                  <WiHumidity />
                </p>
                <pre>
                  <p id="cornn">
                    {Math.abs(condition.main.humidity - ondition.main.humidity)}{" "}
                    %
                  </p>
                  <p>Humidity</p>
                </pre>
              </div>

              <div className="flex">
                <p id="corn">
                  <LuWind />
                </p>
                <pre>
                  <p id="cornn">
                    {Math.abs(
                      condition.wind.speed - ondition.wind.speed
                    ).toFixed(2)}{" "}
                    m/s
                  </p>
                  <p>Wind Speed</p>
                </pre>
              </div>
            </div>
          </div>
        )}

        <button onClick={toggleUnit}>
          Show in {convert ? "Celsius (°C)" : "Fahrenheit (°F)"}
        </button>
      </div>
    </>
  );
};

export default Weather;
