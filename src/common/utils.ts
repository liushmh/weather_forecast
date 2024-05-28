export const formatTemperature = (temp: number): string => {
    return `${temp} °C`;
};

export const getNextDays = (n: number): Array<Date> => {
    const dates = new Array<Date>();
    const today = new Date();
    for (let i = 0; i < n; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        dates.push(date); // Format: YYYY-MM-DD
    }
    return dates;
};


export const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const hour = date.getHours();
    const ampm = hour >= 12 ? "PM" : "AM";
    const hourFormatted = hour % 12 || 12; // Convert 24-hour time to 12-hour time

    return `${day} ${month} ${hourFormatted}${ampm}`;
};

export const formatDateForButton = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    return `${day} ${month}`;
};

export const fetcher = async (url: string): Promise<any> => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data;
};