import React, { useState } from "react";
import axios from "axios";
import "./Style.css";
import searchIcon from "../Assets/image.png";
import cloud3 from "../Assets/pngegg (1).png";
import clear from "../Assets/pngegg.png";
import rain from "../Assets/Rain_002.jpg";
import mist from "../Assets/743.jpg";
import humidityIcon from "../Assets/humidity.png";     
import windIcon from "../Assets/wind.png";  

const Weather = () => {
  const [data, setData] = useState({
    celcius: 10,
    name: "Karachi",
    humidity: '',
    speed: 2,
    image: cloud3,  
  });

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=93771c6dcdb2b5de1e1b1470a9c87f22&units=metric`;

      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = cloud3; 

          if (res.data.weather[0].main === "Clouds") {
            imagePath = cloud3;
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = clear;
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = rain;
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = rain;
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = mist;
          }

          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });

          setError("");
        })
        .catch((err) => {
          if (err.response && err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError("Something went wrong");
          }
          console.error(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
    
        <div className="search">
          <input
            type="text"
            placeholder="Enter City Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>
            <img src={searchIcon} alt="Search" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

      
        <div className="winfo">
          <img src={data.image} alt="Weather Icon" className="icon" />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>

          <div className="details">
            <div className="col">
              <img src={humidityIcon} alt="Humidity" />
              <div className="humidity">
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className="col">
              <img src={windIcon} alt="Wind Speed" />
              <div className="wind">
                <p>{Math.round(data.speed)} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
