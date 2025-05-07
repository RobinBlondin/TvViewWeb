export class WeatherModel {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
    sunrise: string;
    sunset: string;
    precipitation: number;
    windDirection: number;

    constructor(
        temperature: number, 
        windSpeed: number, 
        weatherCode: number, 
        sunrise: string, 
        sunset: string, 
        precipitation: number, 
        windDirection: number
    ) {
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.weatherCode = weatherCode;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.precipitation = precipitation;
        this.windDirection = windDirection;
    }
}