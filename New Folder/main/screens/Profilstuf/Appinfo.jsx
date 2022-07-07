import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AllHeader from "../AllHeader";

export default function Appinfo({ navigation }) {
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <AllHeader navigation={navigation} name={"App info"} />
      <Text style={styles.lable}>Application Information</Text>
      <View
        style={{
          backgroundColor: "#f5f5f7",
          marginLeft: 15,
          marginRight: 15,
          borderRadius: 13,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={styles.l1}>App Name : </Text>
          <Text style={styles.Appnam}>Fresh Fury</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={styles.l1}>Version : </Text>
          <Text style={styles.Appnam}>0.1.0</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={styles.l1}>Application by : </Text>
          <Text style={styles.Appnam}>Fresh Fury</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={styles.l1}>Licence No. : </Text>
          <Text style={styles.Appnam}>HFI58VYE4O</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={styles.l1}>Devloped By : </Text>
          <Text style={styles.Appnam}>Fresh Fury</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lable: {
    paddingLeft: 22,
    paddingTop: 22,
    fontSize: 28,
    fontFamily: "BalooTammudu2_500Medium",
  },
  l1: {
    fontFamily: "BalooTammudu2_500Medium",
    fontSize: 19,
  },
  Appnam: {
    fontFamily: "BalooTammudu2_500Medium",
    fontSize: 19,
  },
});
