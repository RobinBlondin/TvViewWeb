export class WeatherModel {
    temperature: number;
    windSpeed: number;
    weatherCode: number;

    constructor(temperature: number, windSpeed: number, weatherCode: number) {
        this.temperature = temperature;
        this.windSpeed = windSpeed;
        this.weatherCode = weatherCode;
    }
}