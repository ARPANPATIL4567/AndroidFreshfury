import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllHeader from "./AllHeader";

export default function Notificanscreen({ navigation }) {
  const [Name, setName] = useState("Guest");
  const getData = async () => {
    try {
      let arr = await AsyncStorage.getItem("Data");
      let name = JSON.parse(arr).Name;
      console.log(name);
      setName(name);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <AllHeader navigation={navigation} name="Notification's" />
      <View
        style={{
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Text style={styles.lable}>Today</Text>
        <View style={styles.mainview}>
          <View style={styles.notimainboxs}>
            <Image
              style={styles.headImage}
              source={require("../../assets/ffffff.png")}
            />
            <View style={styles.dot}></View>
            <View style={styles.ritBox}>
              <Text numberOfLines={1} style={styles.maintxt}>
                Fresh Fury
              </Text>
              <Text numberOfLines={2} style={styles.content}>
                Welcome {Name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lable: {
    fontSize: 23,
    paddingTop: 10,
    paddingLeft: 19,
    fontFamily: "BalsamiqSans_400Regular",
  },
  mainview: {
    paddingHorizontal: 8,
  },
  notimainboxs: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#f5f5f7",
    marginHorizontal: 10,
    borderRadius: 13,
  },
  headImage: {
    width: 54,
    height: 54,
    borderRadius: 44,
    marginLeft: 14,
    marginVertical: 13,
  },
  dot: {
    width: 13,
    height: 13,
    backgroundColor: "#5de21f",
    borderRadius: 10,
    position: "absolute",
    left: 57,
    top: 51,
    borderWidth: 2,
    borderColor: "white",
  },
  ritBox: {
    width: "75%",
  },
  maintxt: {
    paddingLeft: 13,
    fontSize: 22,
    fontFamily: "BalsamiqSans_400Regular",
  },
  content: {
    paddingLeft: 13,
    fontFamily: "BalsamiqSans_400Regular",
    color: "gray",
  },
});
