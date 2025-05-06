export class WeatherModel {
    temperature: number;
    windSpeed: number;
    weatherCode: number;
    sunrise: string;
    sunset: string;

    constructor(temperature: number, windSpeed: number, weatherCode: number, sunrise: string, sunset: string) {
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.weatherCode = weatherCode;
        this.sunrise = sunrise;
        this.sunset = sunset;
    }
}