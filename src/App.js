import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'  
import clouds from './clouds.png';

export default function App() {
    const [weatherData, setWeatherData] = useState({});

    const [city, setCity] = useState("pune");
    const [weatherDescription, setweatherDescription] = useState("");

    async function loadWeatherData() {

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0405d3c38f14f5a2f80d54d0f9357a7f`)
            setWeatherData(response.data);
        }
        catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        loadWeatherData();
    }, [])

    useEffect(() => {
        loadWeatherData();

    }, [city])

    useEffect(() => {
        setweatherDescription(`${weatherData?.weather?.[0]?.main} (${weatherData?.weather?.[0]?.description})`)
    }, [weatherData])

    return (
        <>
            <div className="main-cont">
                <div className="div1-container">
                    <h1 className="heading">Weather App</h1>
                    <input type="text" placeholder="🔎| Enter city name" value={city} onChange={(e) => {
                        setCity(e.target.value);
                    }} className="searchbar" />
                    <div className="city">

                        <h2 className="city-1">{weatherData?.name}</h2>
                    </div>
                    <div className="cloud-img">
                        <img src={clouds} className="img" />
                    </div>
                    <p className="temp">Temperature: {(weatherData?.main?.temp - 273).toFixed(2)} °C</p>

                </div>


                <div className=" card-container">
                    <div className="card"><span>Visibility </span><p><br /><br />{weatherData?.visibility} meters</p></div>
                    <div className="card"> <span> Minimum temprature</span> <p><br />{(weatherData?.main?.temp_min - 273).toFixed(2)}°C</p> </div>
                    <div className="card"><span>Maximum temprature</span><p><br/>{(weatherData?.main?.temp_max - 273).toFixed(2)}°C</p></div>
                   <div className="card"><span>Speed</span> <p> <br></br>{weatherData?.wind?.speed}km/h</p> </div>
                   <div className="card"> <span> Description</span><p><br></br>{weatherDescription}</p> </div>
                </div>





            </div>
        </>
    )
}