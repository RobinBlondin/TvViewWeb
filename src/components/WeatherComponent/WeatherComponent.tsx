import React, { useEffect, useState } from "react";
import { getWeatherData } from "../../service/weatherService";
import { WeatherModel } from "../../models/WeatherModel";
import { Container, Typography } from "@mui/material";
import { WeatherMap } from "./WeatherMap";
import "./WeatherComponent.css";

const WeatherComponent: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherModel>();
  const [weatherIcon, setWeatherIcon] = useState<string>();

  const fetchWeaterData = async () => {
    await getWeatherData().then((data) => {
      setWeatherData(data);
    });
  };

  const updateWeatherIcon = (weatherCode: number | undefined) => {
    if (!isSunSet()) {
      setWeatherIcon(WeatherMap[weatherCode || "0"]?.day?.image);
    } else {
      setWeatherIcon(WeatherMap[weatherCode || "0"]?.night?.image);
    }
  };

  const setDegreeToDirection = (degree: number | undefined): string => {
    if (!degree) return "";

    if (degree >= 335 && degree <= 25) {
      return "↓";
    } else if (degree >= 290 && degree < 335) {
      return "↘︎";
    } else if (degree >= 250 && degree < 290) {
      return "→";
    } else if (degree >= 205 && degree < 250) {
      return "↗︎";
    } else if (degree >= 155 && degree < 205) {
      return "↑";
    } else if (degree >= 110 && degree < 155) {
      return "↖︎";
    } else if (degree >= 70 && degree < 110) {
      return "←";
    } else {
      return "↙︎";
    }
  };

  const isSunSet = (): boolean => {
    const now = new Date();
    const sunset = new Date(weatherData?.sunset || "");
    const sunrise = new Date(weatherData?.sunrise || "");
    return now > sunset && now < sunrise;
  };

  useEffect(() => {
    fetchWeaterData();
    setInterval(() => {
      fetchWeaterData();
    }, 1000 * 60 * 15);
  }, []);

  useEffect(() => {
    updateWeatherIcon(weatherData?.weatherCode);
  }, [weatherData]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        padding: "0 !important",
        marginTop:
          weatherData &&
          weatherData.weatherCode >= 0 &&
          weatherData.weatherCode < 4
            ? "2em"
            : "0",
      }}
    >
      <Container
        sx={{
          height: "100%",
          width: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={weatherIcon}
          alt=""
          className="weather-icon"
          style={{
            marginBottom:
              weatherData &&
              weatherData.weatherCode >= 0 &&
              weatherData.weatherCode < 4
                ? "0em"
                : "0",
          }}
        />
        <Container
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "start",
            padding: "0 !important",
            gap: "0.5em",
          }}
        >
          <img
            src="/icons/percipitation.png"
            alt=""
            style={{ width: "1.5em" }}
          />
          <Typography
            sx={{
              fontSize: "1.3em",
              fontWeight: 500,
              lineHeight: 1,
              color: "lightgray",
            }}
          >
            Nedb: {weatherData?.precipitation}mm
          </Typography>
        </Container>

        <Typography sx={{ fontSize: "4em", fontWeight: 600, lineHeight: 1 }}>
          {weatherData?.temperature}°C
        </Typography>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            padding: "0 !important",
            gap: "0.5em",
          }}
        >
          <img src="/icons/wind.svg" alt="" style={{ width: "2em" }} />
          <Typography
            sx={{
              fontSize: "1.5em",
              fontWeight: 500,
              lineHeight: 1,
              color: "lightgray",
            }}
          >
            {`${setDegreeToDirection(weatherData?.windDirection)} ${
              weatherData?.windSpeed
            }m/s`}
          </Typography>
        </Container>
      </Container>
    </Container>
  );
};

export default WeatherComponent;
