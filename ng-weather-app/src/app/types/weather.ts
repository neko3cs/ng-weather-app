export type Weather = {
  temperature: number;
  humidity: number | null;
  precipitation: number | null;
  snowfall: number | null;
  windSpeed: number;
  maxTemp: number | null;
  minTemp: number | null;
  sunrise: string | null;
  sunset: string | null;
};

export default Weather;
