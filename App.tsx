import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WeatherSearchScreen from "./src/screens/WeatherSearchScreen";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WeatherSearchScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;