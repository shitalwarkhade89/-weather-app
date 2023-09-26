import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

export default function App(){
    const [weatherData, setWeatherData] =useState({});

    const [city ,setCity] =useState("pune");
const [weatherDescription,setweatherDescription] =useState("");

    async function loadWeatherData(){
     
      try{
       const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0405d3c38f14f5a2f80d54d0f9357a7f`)
       setWeatherData (response.data);
      }
      catch(error){
        console.log(error);
      }
      
    }
   
    useEffect(() => {
        loadWeatherData();
    },[])
    useEffect(() => {
        loadWeatherData();

    },[city])
    
    useEffect(() => {
     setweatherDescription(`${weatherData?.weather?.[0]?.main} (${weatherData?.weather?.[0]?.description})`)
    },[weatherData] )

    return(
        <>
        <div>
            <h1>Weather App of {city}</h1>
            <input type="text" value={city} onChange={(e) => {
                setCity(e.target.value);
            }}/>
            <h2>{weatherData.name}</h2>
            <p>City:{weatherData?.name}</p>
            <p>Temperature: {(weatherData?.main?.temp -273). toFixed(2)} °C</p>

            <p> Description:{weatherDescription}</p>
            <p>
              Visibility :{weatherData?.visibility} meters 
            </p>
        </div>
        </>
    )
}