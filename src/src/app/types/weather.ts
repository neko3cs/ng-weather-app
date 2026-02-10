export type Weather = {
  current: {
    temperature: number;
    humidity: number | null;
    precipitation: number | null;
    snowfall: number | null;
    windSpeed: number;
    maxTemp: number | null;
    minTemp: number | null;
    sunrise: string | null;
    sunset: string | null;
    weatherCode: number;
  };
  hourly: {
    time: string;
    temperature: number;
    humidity: number;
    precipitation: number;
    weatherCode: number;
  }[];
  daily: {
    date: string;
    maxTemp: number;
    minTemp: number;
    precipitationSum: number;
    snowfallSum: number;
    weatherCode: number;
  }[];
};

export default Weather;
