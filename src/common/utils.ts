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