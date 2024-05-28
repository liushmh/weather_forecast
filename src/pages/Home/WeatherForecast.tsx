import { useState } from "react";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	type SelectChangeEvent,
	FormHelperText,
} from "@mui/material";

import type { City } from "../../common/types";
import WeatherTable from "./WeatherTable";

import cities from "../../cities.json";
import { formatTemperature } from "../../common/utils";
import useWeatherData from "../../hooks/useWeather";

const WeatherForecast: React.FC = () => {
	const [selectedCity, setSelectedCity] = useState<string>("");
	const [showForecast, setShowForecast] = useState<boolean>(false);

	const { weatherData, isLoading, isError } = useWeatherData(selectedCity);

	return (
		<div className="flex flex-col items-left space-y-4 ml-10">
			<h1 className="text-6xl mb-4">Weather forecast</h1>

			<div className="flex flex-row">
				<div className="basis-1/6 space-y-4">
					<FormControl variant="standard" sx={{ minWidth: 210 }}>
						<InputLabel id="city-select-label">City</InputLabel>
						<Select
							labelId="city-select-label"
							id="city-select"
							value={selectedCity}
							label="City"
							onChange={(event: SelectChangeEvent<string>) => {
								setSelectedCity(event.target.value);
							}}
						>
							{(cities as Array<City>).map((city) => (
								<MenuItem key={city.id} value={city.id}>
									{city.name}, {city.country}
								</MenuItem>
							))}
						</Select>
						{selectedCity === "" && (
							<FormHelperText>
								Please select city to see the forecast
							</FormHelperText>
						)}
					</FormControl>
					<div>
						{isLoading && <p>Loading...</p>}
						{isError && <p>Error fetching data.</p>}
						{weatherData && (
							<div className="space-y-4">
								<div>
									<h2 className="text-1xl">{weatherData.weather[0]?.main}</h2>
									<p className="text-sm">
										{weatherData.weather[0]?.description}
									</p>
								</div>
								<div>
									<h2 className="text-1xl">
										{formatTemperature(Math.round(weatherData.main.temp))}
									</h2>
									<p className="text-base">
										Wind {Math.round(weatherData.wind.speed)} m/sec
									</p>
								</div>
							</div>
						)}
					</div>
					{selectedCity && (
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setShowForecast(!showForecast);
							}}
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
