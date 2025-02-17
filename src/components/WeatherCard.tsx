import { useState, useEffect } from "react";
import { City } from "../types";
import './WeatherCard.css';

const WeatherCard = ({city}: {city: City}) => {
  const [weather, setWeather] = useState({temperature: 0, weather: ""});

  const kelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
  };

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city.name}`)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setWeather({temperature: data.main.temp, weather: data.weather[0].main});
      });
  }, [city]);

  return (
    <div className="weather-card">
      <h2>{city.name}</h2>
      <p className="temperature">{kelvinToCelsius(weather.temperature)}°C</p>
      <p className="weather-type">{weather.weather}</p>
    </div>
  );
};

export default WeatherCard;

