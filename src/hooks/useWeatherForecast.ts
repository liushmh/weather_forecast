import useSWR from "swr";
import type { WeatherForecastData } from "../common/types";
import { fetcher } from "../common/utils";

const groupDataByDate = (data: Array<WeatherForecastData>) => {
	return data.reduce(
		(acc, item) => {
			const date = new Date(item.dt * 1000).toDateString();
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date]?.push(item);
			return acc;
		},
		{} as Record<string, Array<WeatherForecastData>>
	);
};

const useWeatherForecast = (city: string) => {
	const apiBaseUrl = import.meta.env.VITE_OPENWEATHERMAP_URL;
	const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
	const url = city
		? `${apiBaseUrl}/forecast?id=${city}&appid=${apiKey}&units=metric`
		: null;

	const { data, isLoading, error } = useSWR(url, fetcher);

	const groupedData = data
		? groupDataByDate(data.list as Array<WeatherForecastData>)
		: null;

	return {
		weatherData: groupedData,
		isLoading,
		isError: error,
	};
};

export default useWeatherForecast;
