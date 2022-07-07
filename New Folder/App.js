import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Mainnavigation from "./main/Mainnavigation";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

export default function App() {
  const [splas, setsplas] = useState(false);
  setTimeout(() => {
    setsplas(true);
  }, 1000);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Mainnavigation />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
