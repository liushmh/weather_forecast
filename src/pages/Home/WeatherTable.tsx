// src/WeatherTable.tsx

import { useState } from "react";
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

import {
	formatTemperature,
	getNextDays,
	formatDate,
	formatDateForButton,
} from "../../common/utils";
import useWeatherForecast from "../../hooks/useWeatherForecast";

const WeatherTable: React.FC<{ city: string }> = ({ city }) => {
	const { weatherData, isLoading, isError } = useWeatherForecast(city);
	const [displayedDate, setDisplayedDate] = useState<Date | null>(new Date());

	return (
		<>
			{isLoading && <p>Loading...</p>}
			{isError && <p>Error fetching data.</p>}
			{weatherData && (
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
								{weatherData[displayedDate?.toDateString()].map((data) => (
									<TableRow key={data.dt}>
										<TableCell>{formatDate(data.dt)}</TableCell>
										<TableCell>
											{formatTemperature(Math.round(data.main.temp))}
										</TableCell>
										<TableCell>
											{formatTemperature(data.main.temp_min)}
										</TableCell>
										<TableCell>
											{formatTemperature(data.main.temp_max)}
										</TableCell>
										<TableCell>{Math.round(data.wind.speed)} m/sec</TableCell>
										<TableCell>{data.weather[0]?.description}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<div className="mt-4 space-x-4">
						{getNextDays(Object.keys(weatherData).length ?? 0).map((date) => (
							<Button
								key={date.toISOString()}
								variant={
									displayedDate?.toDateString() === date.toDateString()
										? "contained"
										: "outlined"
								}
								color="primary"
								onClick={() => {
									setDisplayedDate(date);
								}}
								className="mr-2"
							>
								{formatDateForButton(date)}
							</Button>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default WeatherTable;
