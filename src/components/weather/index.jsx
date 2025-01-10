import { useState } from "react";
import Search from "../search";
import { useEffect } from "react";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response =
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=6035aeaafa88feab2b87fc5f8a305418
        `);
      const data = await response.json();

      console.log(data, "data");
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("toronto");
  }, []);

  return (
    <div>
      <Search
        serach={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Loading ... </div>
      ) : (
        <div>
          <div className="city">
            <h2>
              {weatherData?.name},<span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div>
            {weatherData?.main?.temp}
            <p className="description">
              {weatherData && weatherData.weather && weatherData.weather[0]
                ? weatherData.weather[0].description
                : ""}
            </p>
            <div className="weather-info">
              <div>
                <div>
                  <p className="wind">{weatherData?.wind?.speed}</p>
                  <p>Wind Speed</p>
                </div>
              </div>
              <div>
                <div>
                  <p className="humidity">{weatherData?.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
