export type FunctionComponent = React.ReactElement | null;

type HeroIconSVGProps = React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> &
	React.RefAttributes<SVGSVGElement>;
type IconProps = HeroIconSVGProps & {
	title?: string;
	titleId?: string;
};
export type Heroicon = React.FC<IconProps>;

export type City = {
	id: number;
	name: string;
	country: string;
}

export type WeatherData = {
	city: {
	  name: string;
	};
	main: {
	  temp: number;
	};
	weather: Array<{
	  description: string;
	}>;
	wind: {
	  speed: number;
	};
  }

export type WeatherForecastData = {
	dt: number;
	main: { temp: number; temp_min: number; temp_max: number };
	wind: { speed: number };
	weather: Array<{ description: string }>;
}