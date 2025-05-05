import React, { useEffect, useState } from 'react'
import { getWeatherData } from '../../service/weatherService';
import { WeatherModel } from '../../models/WeatherModel';
import { Container } from '@mui/material';


const WeatherComponent: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherModel>()

    const fetchWeaterData = async () => {
        await getWeatherData().then(data => setWeatherData(data));
    }

    useEffect(() => {
        fetchWeaterData();
        setInterval(() => {
            fetchWeaterData();
        }, 1000 * 60 );
    }, [])

    
   
    return (
        <Container sx={{ 
                display: "flex", 
                justifyContent: "center",
                alignItems: "center", 
                flexDirection: "column", 
                color: "white", 
                fontSize: "3em"
            }}
        >
            <div>Temp: {weatherData?.temperature }</div>
            <div>Wind speed: { weatherData?.windSpeed }</div>
            <div>Weather code: { weatherData?.weatherCode }</div>

        </Container>
    )
}

export default WeatherComponent