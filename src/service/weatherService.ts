import axios from "axios";
import { WeatherModel } from "../models/WeatherModel";

const url = "https://api.open-meteo.com/v1/forecast?latitude=58.9&longitude=17.5&current&current=windspeed_10m&current=temperature_2m&current=weather_code"

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getWeatherData = async (): Promise<WeatherModel> => {
    return apiClient.get(url).then((res) => res.data.current).then((data) => {
        const weatherModel = new WeatherModel(
            data.temperature_2m,
            data.windspeed_10m,
            data.weather_code
        );
        return weatherModel;
    }
    ).catch((error) => {
        console.error("Error fetching weather data:", error);
        throw error;
    });
}