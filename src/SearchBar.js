import React, { useState } from "react";
import "./searchBar.css";
import axios from "axios";
import AdditionalWeatherInfo from "./AdditionalWeatherInfo";
import CityInfo from "./CityInfo";
import { MagnifyingGlass } from "react-loader-spinner";

export default function Form(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [temperature, setTemperature] = useState();
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  function showCity(event) {
    setCity(event.target.value);
  }
  function handlesubmit(event) {
    event.preventDefault();
    let apiKey = `25fad9f7e87157d33dde0f82ab269ee8`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayWeather);
  }

  function displayWeather(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(Math.round(response.data.main.humidity));
    setWind(Math.round(response.data.wind.speed));
    setIcon(
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  if (temperature) {
    return (
      <div className="Form">
        <form id="city-form" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Enter the city"
            autoFocus="on"
            autoComplete="on"
            id="search-input"
            onChange={showCity}
          />
          <button id="search-button">
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
          <button id="current-location-button">
            <span role="img" aria-label="location">
              📍
            </span>
          </button>
        </form>
        <CityInfo city={city} icon={icon} />
        <AdditionalWeatherInfo
          temperature={temperature}
          description={description}
          humidity={humidity}
          wind={wind}
        />
      </div>
    );
  } else {
    return (
      <div className="Form">
        <form id="city-form" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Enter the city"
            autoFocus="on"
            autoComplete="on"
            id="search-input"
            onChange={showCity}
          />
          <button id="search-button">
            <span role="img" aria-label="search">
              🔍
            </span>
          </button>
          <button id="current-location-button">
            <span role="img" aria-label="location">
              📍
            </span>
          </button>
        </form>
        <h1>Search Weather</h1>
        <MagnifyingGlass
          visible={true}
          height="100"
          width="100"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }
}
