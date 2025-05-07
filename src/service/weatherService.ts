import axios from "axios";
import { WeatherModel } from "../models/WeatherModel";

const latitude = 58.9;
const longitude = 17.5;
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current&current=windspeed_10m&current=wind_direction_10m&current=temperature_2m&current=weather_code&daily=sunrise&daily=sunset&daily=precipitation_sum&wind_speed_unit=ms`;

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getWeatherData = async (): Promise<WeatherModel> => {
    return apiClient.get(weatherUrl).then((res) => res.data).then((data) => {
        const weatherModel = new WeatherModel(
            data.current.temperature_2m,
            data.current.windspeed_10m,
            data.current.weather_code,
            data.daily.sunrise[1],
            data.daily.sunset[0],
            data.daily.precipitation_sum[0],
            data.current.wind_direction_10m
        );
        return weatherModel;
    }
    ).catch((error) => {
        console.error("Error fetching weather data:", error);
        throw error;
    });
}