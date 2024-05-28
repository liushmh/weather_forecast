import useSWR from 'swr';
import type { WeatherData } from "../common/types";

import { fetcher } from "../common/utils";

const useWeatherData = (selectedCity: string) => {
  const apiBaseUrl = import.meta.env.VITE_OPENWEATHERMAP_URL;
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const url = selectedCity ? `${apiBaseUrl}/weather?id=${selectedCity}&appid=${apiKey}&units=metric` : null;

  const { data, error, isLoading } = useSWR<WeatherData>(url, fetcher);

  return {
    weatherData: data,
    isLoading,
    isError: error,
  };
};

export default useWeatherData;
