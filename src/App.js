import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

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
                <h1 className="heading">Weather App</h1>
                <input type="text" value={city} onChange={(e) => {
                    setCity(e.target.value);
                }} className="searchbar" />
                <div className="city">
                   
                <h2 className="city-1">City:{weatherData?.name}</h2>
                </div>
                
               
                    <p className="temp">Temperature: {(weatherData?.main?.temp - 273).toFixed(2)} °C</p>

                    <p className="des"> Description:{weatherDescription}</p>
                    <p className="visibility">
                        Visibility :{weatherData?.visibility} meters
                    </p>

        

            </div>
        </>
    )
}