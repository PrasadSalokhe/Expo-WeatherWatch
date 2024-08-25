import { useState, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { LocationResult, WeatherData } from '../../types/weatherAPI';
import { getWeatherDetails, getAreaWeatherSearch } from '../../api/weatherSearchAPI';
import { debounce } from '../../utils/debounce';

export const useWeatherSearch = () => {
    const [location, setLocation] = useState<string>('Bengaluru');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<LocationResult[]>([]);
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    useEffect(() => {
        fetchWeatherData(location);
    }, [location]);

    const fetchWeatherData = async (locationName: string) => {
        try {
            const geoResponse: LocationResult[] = await getAreaWeatherSearch(
                locationName,
            );
            const { latitude, longitude } = geoResponse[0];
            const weatherResponse = await getWeatherDetails(latitude, longitude);
            if (weatherResponse) {
                const dailyData = weatherResponse.daily;

                const parsedData = dailyData.time.map(
                    (date: string, index: number) => ({
                        date,
                        temperature_2m_max: dailyData.temperature_2m_max[index],
                        temperature_2m_min: dailyData.temperature_2m_min[index],
                        weathercode: dailyData.weathercode[index],
                    }),
                );

                setWeatherData(parsedData);
            } else {
                Alert.alert('Warning', 'Failed to load weather data');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to load weather data');
        }
    };

    const fetchSearchResults = async (query: string) => {
        if (query.length < 3) {
            setShowDropdown(false);
            return;
        }
        try {
            const response = await getAreaWeatherSearch(query);
            setSearchResults(response);
            setShowDropdown(true);
        } catch (error) {
            Alert.alert('Error', 'Failed to load location data');
        }
    };

    const selectLocation = (locationName: string) => {
        setLocation(locationName);
        setSearchQuery(locationName);
        setShowDropdown(false);
        fetchWeatherData(locationName);
    };

    const debouncedSearch = useRef(debounce(fetchSearchResults, 2000)).current;


    const onChangeSearchQuery = useCallback((text: string) => {
        setSearchQuery(text);
        debouncedSearch(text);
    }, []);

    return {
        searchQuery,
        setSearchQuery,
        fetchSearchResults,
        showDropdown,
        searchResults,
        selectLocation,
        location,
        weatherData,
        onChangeSearchQuery
    }
}