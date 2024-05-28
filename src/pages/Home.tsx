// import React, { useState } from "react";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";

import type { FunctionComponent } from "../common/types";
import WeatherForecast from "../components/WeatherForecast";

// import "./App.css";

export const Home = (): FunctionComponent => {
	return (
		<div className="App">
			<div className="flex flex-col items-left space-y-4 m-10 bg-gray-50">
				<WeatherForecast />
				<footer className="mt-8 bg-gray-200 p-4">
					<div className="text-left">
						<h6>Weather App</h6>
						<p className="text-sm text-gray-500">by Yiming Liu</p>
					</div>
				</footer>
			</div>
		</div>
	);
};
