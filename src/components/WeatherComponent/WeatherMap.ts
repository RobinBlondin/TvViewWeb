type TimeOfDay = {
  description: string;
  image: string;
};

type WeatherEntry = {
  day: TimeOfDay;
  night: TimeOfDay;
};

type WeatherMapType = {
  [code: string]: WeatherEntry | undefined;
};

export const WeatherMap: WeatherMapType = {
  "0": {
    day: {
      description: "Soligt",
      image: "/icons/clear-day.svg",
    },
    night: {
      description: "Klart",
      image: "/icons/clear-night.svg",
    },
  },
  "1": {
    day: {
      description: "Soligt",
      image: "/icons/clear-day.svg",
    },
    night: {
      description: "Klart",
      image: "/icons/clear-night.svg",
    },
  },
  "2": {
    day: {
      description: "Molnigt",
      image: "/icons/cloudy-2-day.svg",
    },
    night: {
      description: "Molnigt",
      image: "/icons/cloudy-2-night.svg",
    },
  },
  "3": {
    day: {
      description: "Molnigt",
      image: "/icons/cloudy.svg",
    },
    night: {
      description: "Molnigt",
      image: "/icons/cloudy.svg",
    },
  },
  "45": {
    day: {
      description: "Dimma",
      image: "/icons/fog.svg",
    },
    night: {
      description: "Dimma",
      image: "/icons/fog.svg",
    },
  },
  "48": {
    day: {
      description: "Dimma",
      image: "/icons/fog.svg",
    },
    night: {
      description: "Dimma",
      image: "/icons/fog.svg",
    },
  },
  "51": {
    day: {
      description: "Regn",
      image: "/icons/rainy-1.svg",
    },
    night: {
      description: "Regn",
      image: "/icons/rainy-1.svg",
    },
  },
  "53": {
    day: {
      description: "Regn",
      image: "/icons/rainy-2.svg",
    },
    night: {
      description: "Regn",
      image: "/icons/rainy-2.svg",
    },
  },
  "55": {
    day: {
      description: "Regn",
      image: "/icons/rainy-3.svg",
    },
    night: {
      description: "Regn",
      image: "/icons/rainy-3.svg",
    },
  },
  "56": {
    day: {
      description: "Underkylt Regn",
      image: "/icons/rainy-and-sleet-mix.svg",
    },
    night: {
      description: "Underkylt Regn",
      image: "/icons/rainy-and-sleet-mix.svg",
    },
  },
  "57": {
    day: {
      description: "Underkylt Regn",
      image: "/icons/rainy-and-sleet-mix.svg",
    },
    night: {
      description: "Underkylt Regn",
      image: "/icons/rainy-and-sleet-mix.svg",
    },
  },
  "61": {
    day: {
      description: "Regn",
      image: "/icons/rainy-1.svg",
    },
    night: {
      description: "Regn",
      image: "/icons/rainy-1.svg",
    },
  },
  "63": {
    day: {
      description: "Regn",
      image: "/icons/rainy-2.svg",
    },
    night: {
      description: "Regn",
      image: "/icons/rainy-2.svg",
    },
  },
  "65": {
    day: {
      description: "Regn",
      image: "/icons/rainy-3.svg",
    },
    night: {
      description: "Regn",
      image: "/icons/rainy-3.svg",
    },
  },
  "66": {
    day: {
      description: "Snöblandat Regn",
      image: "/icons/rain-and-snow-mix.svg",
    },
    night: {
      description: "Snöblandat Regn",
      image: "/icons/rain-and-snow-mix.svg",
    },
  },
  "67": {
    day: {
      description: "Snöblandat Regn",
      image: "/icons/rain-and-snow-mix.svg",
    },
    night: {
      description: "Snöblandat Regn",
      image: "/icons/rain-and-snow-mix.svg",
    },
  },
  "71": {
    day: {
      description: "Snöfall",
      image: "/icons/snowy-1.svg",
    },
    night: {
      description: "Snöfall",
      image: "/icons/snowy-1.svg",
    },
  },
  "73": {
    day: {
      description: "Snöfall",
      image: "/icons/snowy-2.svg",
    },
    night: {
      description: "Snöfall",
      image: "/icons/snowy-2.svg",
    },
  },
  "75": {
    day: {
      description: "Snöfall",
      image: "/icons/snowy-3.svg",
    },
    night: {
      description: "Snöfall",
      image: "/icons/snowy-3.svg",
    },
  },
  "77": {
    day: {
      description: "Snöfall",
      image: "/icons/snowy-3.svg",
    },
    night: {
      description: "Snöfall",
      image: "/icons/snowy-3.svg",
    },
  },
  "80": {
    day: {
      description: "Regnskurar",
      image: "/icons/rainy-1.svg",
    },
    night: {
      description: "Regnskurar",
      image: "/icons/rainy-1.svg",
    },
  },
  "81": {
    day: {
      description: "Regnskurar",
      image: "/icons/rainy-2.svg",
    },
    night: {
      description: "Regnskurar",
      image: "/icons/rainy-2.svg",
    },
  },
  "82": {
    day: {
      description: "Regnskurar",
      image: "/icons/rainy-3.svg",
    },
    night: {
      description: "Regnskurar",
      image: "/icons/rainy-3.svg",
    },
  },
  "85": {
    day: {
      description: "Snöbyar",
      image: "/icons/snowy-1.svg",
    },
    night: {
      description: "Snöbyar",
      image: "/icons/snowy-1.svg",
    },
  },
  "86": {
    day: {
      description: "Snöbyar",
      image: "/icons/snowy-2.svg",
    },
    night: {
      description: "Snöbyar",
      image: "/icons/snowy-2.svg",
    },
  },
  "95": {
    day: {
      description: "Åskväder",
      image: "/icons/thunderstorms.svg",
    },
    night: {
      description: "Åskväder",
      image: "/icons/thunderstorms.svg",
    },
  },
  "96": {
    day: {
      description: "Åskväder med hagel",
      image: "/icons/thunderstorms.svg",
    },
    night: {
      description: "Åskväder med hagel",
      image: "/icons/thunderstorms.svg",
    },
  },
  "99": {
    day: {
      description: "Åskväder med hagel",
      image: "/icons/thunderstorms.svg",
    },
    night: {
      description: "Åskväder med hagel",
      image: "/icons/thunderstorms.svg",
    },
  },
};
