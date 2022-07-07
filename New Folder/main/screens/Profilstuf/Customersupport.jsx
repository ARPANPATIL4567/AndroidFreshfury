import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AllHeader from "../AllHeader";

export default function Customersupport({ navigation }) {
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <AllHeader navigation={navigation} name={"Customer support"} />

      <Text style={styles.lable}>Costomer</Text>
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
          <Text style={styles.l1}>Email : </Text>
          <Text style={styles.Appnam}>info@freshfury.com</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 12,
            paddingLeft: 12,
          }}
        >
          <Text style={styles.l1}>Phone : </Text>
          <Text style={styles.Appnam}>+91 89597 34219</Text>
        </View>
      </View>
      <Text
        style={{
          textAlign: "center",
          fontFamily: "BalooTammudu2_500Medium",
          fontSize: 19,
          paddingTop: 22,
        }}
      >
        Tips
      </Text>
      <Text
        style={{
          fontFamily: "BalooTammudu2_500Medium",
          fontSize: 19,
          color: "gray",
          paddingVertical: 15,
          lineHeight: 36,
          textAlign: "justify",
          paddingHorizontal: 22,
        }}
      >
        To give us feedback or any complain or any question please email or
        contect us.
      </Text>
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
  btn: {
    justifyContent: "center",
    backgroundColor: "#27cec8",
    marginHorizontal: 12,
    borderRadius: 13,
    paddingTop: 12,
    alignItems: "center",
  },
});
