export type WeatherCode =
    | '0'
    | '1'
    | '2'
    | '3'
    | '45'
    | '48'
    | '51'
    | '53'
    | '55'
    | '56'
    | '57'
    | '61'
    | '63'
    | '65'
    | '66'
    | '67'
    | '71'
    | '73'
    | '75'
    | '77'
    | '80'
    | '81'
    | '82'
    | '85'
    | '86'
    | '95'
    | '96'
    | '99';

export type WeatherData = {
    date: string;
    temperature_2m_max: number;
    temperature_2m_min: number;
    weathercode: WeatherCode;
};

export type LocationResult = {
    id: string;
    name: string;
    latitude: number,
    longitude: number,
    admin1: string,
    admin2: string
};