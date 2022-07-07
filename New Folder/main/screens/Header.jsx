import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ navigation }) {
  const onPress = () => {
    console.log("searched");
    navigation.push("Search");
  };
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={styles.headiconback}
          onPress={() => {
            navigation.navigate("Address");
          }}
        >
          <Ionicons
            name="md-location"
            size={24}
            style={{
              color: "black",
            }}
          />
        </TouchableOpacity>
        <Text style={styles.h1}>Fresh Fury</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <MaterialCommunityIcons
            style={styles.icon}
            name="cart-heart"
            size={34}
            color={"black"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchviewmain}>
        <Ionicons
          name="md-search-sharp"
          size={25}
          style={{ marginTop: 8, color: "#1E1F20" }}
        />
        <TouchableWithoutFeedback onPress={onPress} style={styles.searchview}>
          <Text style={styles.search}>Search Food</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingTop: StatusBar.currentHeight,
    width: "100%",
    elevation: 4,
    shadowColor: "gray",
  },
  h1: {
    fontFamily: "BalsamiqSans_700Bold",
    fontSize: 28,
    paddingRight: 15,
  },
  searchviewmain: {
    flexDirection: "row",
    backgroundColor: "#f2f4f8",
    borderRadius: 9,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 5,
    paddingLeft: 10,
  },
  search: {
    color: "#a9a9a9",
    padding: 11,
    width: "100%",
    fontFamily: "BalsamiqSans_400Regular",
  },
  headiconback: {
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 4,
    marginTop: 7,
  },
  icon: {
    position: "relative",
    right: 22,
    top: 5,
    paddingTop: 6,
  },
});
