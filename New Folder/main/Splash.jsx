import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADD_DATA } from "../redux/act_red";
import { useDispatch } from "react-redux";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
  BalooTammudu2_400Regular,
  BalooTammudu2_500Medium,
  BalooTammudu2_600SemiBold,
  BalooTammudu2_700Bold,
  BalooTammudu2_800ExtraBold,
} from "@expo-google-fonts/baloo-tammudu-2";

import {
  BalsamiqSans_400Regular,
  BalsamiqSans_400Regular_Italic,
  BalsamiqSans_700Bold,
  BalsamiqSans_700Bold_Italic,
} from "@expo-google-fonts/balsamiq-sans";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
// Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifiations

export default function Splash({ navigation }) {
  const [islogin, setislogin] = useState("null");
  const dispatch = useDispatch();

  const getItem = async () => {
    try {
      const value = await AsyncStorage.getItem("Data");
      console.log(value);
      if (value.length > 0) {
        setislogin("Home");
        dispatch(ADD_DATA(value));
      }
    } catch (e) {
      setislogin("Signin");
      console.log("err retreving");
    }
  };
  let [fontsLoaded, error] = useFonts({
    BalooTammudu2_400Regular,
    BalooTammudu2_500Medium,
    BalooTammudu2_600SemiBold,
    BalooTammudu2_700Bold,
    BalooTammudu2_800ExtraBold,
    BalsamiqSans_400Regular,
    BalsamiqSans_400Regular_Italic,
    BalsamiqSans_700Bold,
    BalsamiqSans_700Bold_Italic,
  });

  if (fontsLoaded) {
    if (islogin == "Home") {
      navigation.dispatch(StackActions.replace("Home"));
    } else if (islogin == "Signin") {
      navigation.dispatch(StackActions.replace("Signin"));
    }
  }
  useEffect(() => {
    getItem();
  }, []);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#27cec8" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
