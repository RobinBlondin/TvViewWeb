import React, { useEffect, useState } from 'react'
import { getWeatherData } from '../../service/weatherService';
import { WeatherModel } from '../../models/WeatherModel';
import { Container, Typography } from '@mui/material';
import { WeatherMap } from './WeatherMap';
import './WeatherComponent.css'


const WeatherComponent: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherModel>()
    const [weatherIcon, setWeatherIcon] = useState<string>()
    const [weatherDesc, setWeatherDesc] = useState<string>()

    const fetchWeaterData = async () => {
        await getWeatherData().then(data => setWeatherData(data));
    }

    const updateWeatherIcon = (weatherCode: number | undefined) => {
        if(!isSunSet()) {
            setWeatherIcon(WeatherMap[weatherCode || "0"]?.day?.image)
            setWeatherDesc(WeatherMap[weatherCode || "0"]?.day?.description)
        } else {
            setWeatherIcon(WeatherMap[weatherCode || "0"]?.night?.image)
            setWeatherDesc(WeatherMap[weatherCode || "0"]?.night?.description)
        }
    }

    const displayWindSpeedAsMeterPerSecond = (speed: number | undefined): number => {
        return Math.round((speed || 0 / 3.6) * 10) / 10
    }

    const isSunSet = (): boolean => {
        const now = new Date();
        const sunset = new Date(weatherData?.sunset || "");
        const sunrise = new Date(weatherData?.sunrise || "");
        return now > sunset && now < sunrise
    }

    useEffect(() => {
        fetchWeaterData();
        setInterval(() => {
            fetchWeaterData();
        }, 1000 * 60 * 15);
    }, [])

    useEffect(() => {
        updateWeatherIcon(weatherData?.weatherCode)
    }, [weatherData])

    
   
    return (
        <Container sx={{ 
                display: "flex", 
                justifyContent: "center",
                alignItems: "center", 
                color: "white",
                padding: "0 !important"
            }}
        >
            <Container sx={{ height: '100%', width: "auto", display: "flex", flexDirection: "column"}}>
                <img src={weatherIcon} alt="" className="weather-icon"/>
                <Typography sx={{fontSize: "5em", fontWeight: 600, lineHeight: 1}}>
                    {weatherData?.temperature }°C
                </Typography>
                <Typography sx={{fontSize: "2em", fontWeight: 500}}>{ displayWindSpeedAsMeterPerSecond( weatherData?.windSpeed) }m/s</Typography>
            </Container>
        </Container>
    )
}

export default WeatherComponent