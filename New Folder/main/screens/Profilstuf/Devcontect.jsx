import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import AllHeader from "../AllHeader";
import * as WebBrowser from "expo-web-browser";

export default function Devcontect({ navigation }) {
  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <AllHeader navigation={navigation} name={"Devloper Contect"} />
      <Text style={styles.lable}>Dev Contect</Text>
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
          <Text style={styles.l1}>Application By : </Text>
          <Text style={styles.Appnam}>Kuldeep Kaware</Text>
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
          <Text style={styles.Appnam}>Arpan Patil</Text>
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
        Our Services
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
        Wordpress Devlopment, Android Devlopment, Website Devlopment, All typrs
        of Graphics Designing. Software Making, Website Designing etc.
      </Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
          let result = await WebBrowser.openBrowserAsync(
            "https://kuldeepkaware.com/"
          );
        }}
      >
        <Text
          style={{
            fontFamily: "BalooTammudu2_500Medium",
            fontSize: 19,
            color: "white",
          }}
        >
          Contect Us.
        </Text>
      </TouchableOpacity>
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
