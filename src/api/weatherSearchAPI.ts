import fetch from '../utils/requestHandler';

export const getWeatherDetails = async (latitude: number, longitude: number) => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`, {});
        return response;
    } catch (err) {
        throw err;
    }
};

export const getAreaWeatherSearch = async (searchedValue: string) => {
    try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${searchedValue}`;
        const response = await fetch(url, {});
        return response.results;
    } catch (error) {
        throw error;
    }
};