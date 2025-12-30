type OpenMeteoResponse = {
  current_weather: {
    temperature: number;
    weathercode: number;
    windspeed: number;
  };
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    snowfall_sum: number[];
    sunrise: string[];
    sunset: string[];
  };
  hourly: {
    relativehumidity_2m: number[];
    temperature_2m: number[];
    precipitation: number[];
  };
};

export default OpenMeteoResponse;
