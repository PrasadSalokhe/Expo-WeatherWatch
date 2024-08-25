import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import getWeatherImage from '../../helpers/getWeatherImage';
import { WeatherData } from '../../types/weatherAPI';
import { useWeatherSearch } from './hooks';

const WeatherSearchScreen = () => {
  const {
    searchQuery,
    showDropdown,
    searchResults,
    selectLocation,
    location,
    weatherData,
    onChangeSearchQuery
  } = useWeatherSearch();

  const renderForecastItem = ({ item }: { item: WeatherData }) => {
    const getImage = getWeatherImage(item.weathercode);

    return (
      <View style={styles.forecastItem}>
        <Text style={styles.weahtherDate}>{item.date}</Text>

        <View>
          <Text style={styles.weahtherDate}>
            {Math.round((item.temperature_2m_max + item.temperature_2m_min) / 2)}
            °C
          </Text>
          <Text style={styles.weahtherDate}>{getImage.day.description}</Text>
        </View>
        <Image
          source={{
            uri: `${getImage.day.image}`,
          }}
          style={styles.weatherImage}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={onChangeSearchQuery}
          testID='input'
        />
      </View>

      {showDropdown ? (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectLocation(item.name)}>
              <Text
                style={
                  styles.locationItem
                }>{`${item.admin1},${item.admin2} `}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      ) : null}

      <Text style={styles.locationName}>{location}</Text>
      <FlatList
        data={weatherData}
        renderItem={renderForecastItem}
        keyExtractor={item => item.date}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ADD8E6',
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: '#000000',
    marginTop: 20,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white'
  },
  dropdown: {
    maxHeight: 200,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  locationItem: {
    padding: 10,
    borderBottomWidth: 1,
    color: '#000000',
    borderColor: '#000000',
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000000',
  },

  weahtherDate: {
    fontSize: 20,
    color: '#000000',
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  weatherImage: {
    width: 60,
    height: 60,
  },
});

export default WeatherSearchScreen;