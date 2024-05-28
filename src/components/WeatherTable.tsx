// src/WeatherTable.tsx

import { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
} from "@mui/material";
import { formatTemperature, getNextDays } from "../common/utils";

interface WeatherData {
	dt: number;
	main: { temp: number; temp_min: number; temp_max: number };
	wind: { speed: number };
	weather: Array<{ description: string }>;
}

const WeatherTable: React.FC<{ city: string }> = ({ city }) => {
	const [weatherData, setWeatherData] = useState<
		Record<string, Array<WeatherData>>
	>({});
	const [displayedDate, setDisplayedDate] = useState<Date | null>(null);

	const groupDataByDate = (data: Array<WeatherData>) => {
		return data.reduce(
			(acc, item) => {
				const date = new Date(item.dt * 1000).toDateString();
				if (!acc[date]) {
					acc[date] = [];
				}
				acc[date]?.push(item);
				return acc;
			},
			{} as Record<string, Array<WeatherData>>
		);
	};

	useEffect(() => {
		const fetchWeatherData = async () => {
			const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
			const url = `https://api.openweathermap.org/data/2.5/forecast?id=${city}&appid=${apiKey}&units=metric`;

			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				const groupedData = groupDataByDate(data.list as Array<WeatherData>);
				console.log("groupedData:", groupedData);

				setWeatherData(groupedData);
				setDisplayedDate(new Date(data.list[0].dt * 1000));
			} catch (error) {
				console.error("Error fetching the weather data", error);
			}
		};

		if (city) {
			fetchWeatherData().then(
				() => {},
				() => {}
			);
		}
	}, [city]);

	// const sortedData = weatherData.sort((a, b) => a.dt - b.dt);

	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp * 1000);
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "short" });
		const hour = date.getHours();
		const ampm = hour >= 12 ? "PM" : "AM";
		const hourFormatted = hour % 12 || 12; // Convert 24-hour time to 12-hour time

		return `${day} ${month} ${hourFormatted}${ampm}`;
	};

	const formatDateForButton = (date: Date) => {
		const day = date.getDate();
		const month = date.toLocaleString("default", { month: "short" });

		return `${day} ${month}`;
	};

	const handleDateChange = (date: Date) => {
		setDisplayedDate(date);
	};

	const selectedDateString = displayedDate
		? displayedDate.toDateString()
		: null;
	console.log("selectedDateString:", selectedDateString);
	const filteredData = selectedDateString
		? weatherData[selectedDateString] || []
		: [];

	return (
		<div>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Temp</TableCell>
							<TableCell>Min Temp</TableCell>
							<TableCell>Max Temp</TableCell>
							<TableCell>Wind</TableCell>
							<TableCell>Description</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredData.map((data) => (
							<TableRow key={data.dt}>
								<TableCell>{formatDate(data.dt)}</TableCell>
								<TableCell>{formatTemperature(data.main.temp)}</TableCell>
								<TableCell>{formatTemperature(data.main.temp_min)}</TableCell>
								<TableCell>{formatTemperature(data.main.temp_max)}</TableCell>
								<TableCell>{data.wind.speed} m/sec</TableCell>
								<TableCell>{data.weather[0]?.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<div className="mt-4 space-x-4">
				{getNextDays(6).map((date) => (
					<Button
						key={date.toISOString()}
						variant={
							displayedDate?.toDateString() === date.toDateString()
								? "contained"
								: "outlined"
						}
						color="primary"
						onClick={() => {
							handleDateChange(date);
						}}
						className="mr-2"
					>
						{formatDateForButton(date)}
					</Button>
				))}
			</div>
		</div>
	);
};

export default WeatherTable;
