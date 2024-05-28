// src/CityDropdown.tsx

import { useState, useEffect } from "react";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	type SelectChangeEvent,
} from "@mui/material";

import WeatherTable from "./WeatherTable";

import cities from "../cities.json";

interface City {
	id: number;
	name: string;
	country: string;
}

interface WeatherData {
	weather: Array<{ main: string; description: string }>;
	main: { temp: number };
	wind: { speed: number };
}

const WeatherForecast: React.FC = () => {
	const [selectedCity, setSelectedCity] = useState<string>("");
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [showForecast, setShowForecast] = useState<boolean>(false);

	const handleChange = (event: SelectChangeEvent<string>): void => {
		setSelectedCity(event.target.value);
	};

	const toggleForecast = (): void => {
		setShowForecast(!showForecast);
	};

	useEffect(() => {
		const fetchWeatherData = async (): Promise<void> => {
			const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
			// console.log();
			const url = `https://api.openweathermap.org/data/2.5/weather?id=${selectedCity}&appid=${apiKey}&units=metric`;

			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				console.log(data);
				setWeatherData(data as WeatherData);
			} catch (error) {
				console.error("Error fetching the weather data", error);
			}
		};
		if (selectedCity !== "") {
			fetchWeatherData().then(
				() => {},
				() => {}
			);
		}
	}, [selectedCity]);

	return (
		<div className="flex flex-col items-left space-y-4 ml-10">
			<h1 className="text-6xl mb-4">Weather forecast</h1>

			<div className="flex flex-row">
			<div className="basis-1/12 space-y-4">
				<FormControl variant="standard" fullWidth>
					<InputLabel id="city-select-label">City</InputLabel>
					<Select
						labelId="city-select-label"
						id="city-select"
						value={selectedCity}
						label="City"
						onChange={handleChange}
					>
						{(cities as Array<City>).map((city) => (
							<MenuItem key={city.id} value={city.id}>
								{city.name}, {city.country}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{weatherData && (
					<div className="space-y-4">
						<div>
							<h2 className="text-1xl">{weatherData.weather[0]?.main}</h2>
							<p className="text-sm">{weatherData.weather[0]?.description}</p>
						</div>
						<div>
							<h2 className="text-1xl">{weatherData.main.temp}°C</h2>
							<p className="text-base">Wind {weatherData.wind.speed} m/s</p>
						</div>
					</div>
				)}

				{selectedCity && (
					<Button
						variant="contained"
						color="primary"
						onClick={toggleForecast}
						className="mt-4"
					>
						{showForecast ? "Close" : "See Forecast"}
					</Button>
				)}
			</div>
			</div>
			<div className="flex flex-row">
				<div className="basis-5/12">
					{showForecast && <WeatherTable city={selectedCity} />}
				</div>
			</div>
		</div>
	);
};

export default WeatherForecast;
