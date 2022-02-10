import React from 'react';

const Weatherdata = ({ dateTitle, weatherDatas }) => {
    return (
        <center>
            <h2>{dateTitle}</h2>
            <ul>
                {weatherDatas.map((weatherData) => {
                    return (
                        <li key={weatherData.datetime}>
                            <h1>{weatherData.temp}<sup>0</sup>C</h1>
                            <p>Wind-direction: {weatherData.winddir}</p>
                            <p>Wind-speed: {weatherData.windspeed}</p>
                            <p>Pressure: {weatherData.pressure}</p>
                            <p>Sunrise: {weatherData.sunrise}</p>
                            <p>Sunset: {weatherData.sunset}</p>
                            <p>Dew: {weatherData.dew}</p>
                            <p>Humidity: {weatherData.humidity}</p>
                            <h3>{weatherData.description}</h3>
                        </li>
                    );
                })}
            </ul>
        </center>
    );
}

export default Weatherdata;
