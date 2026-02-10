type OpenMeteoResponse = {
  current_weather: {
    temperature: number;
    weathercode: number;
    windspeed: number;
    time: string;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    snowfall_sum: number[];
    sunrise: string[];
    sunset: string[];
    weathercode: number[];
  };
  hourly: {
    time: string[];
    relativehumidity_2m: number[];
    temperature_2m: number[];
    precipitation: number[];
    weathercode: number[];
  };
};

export default OpenMeteoResponse;
