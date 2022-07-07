import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function AllHeader(props) {
  return (
    <View style={styles.Cartstatus}>
      <View style={styles.CartHeaderBox}>
        <View style={styles.backaro}>
          <TouchableOpacity
            style={styles.headiconback}
            onPress={() => props.navigation.goBack()}
          >
            <Ionicons
              name="md-chevron-back"
              size={26}
              style={{
                color: "#CDCDD2",
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.hedeertxt}>{props.name}</Text>
        <Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Cartstatus: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  CartHeaderBox: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 59,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headiconback: {
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CDCDD2",
  },
  hedeertxt: {
    fontFamily: "BalooTammudu2_700Bold",

    fontSize: 17,
    color: "#1E1F20",
    paddingRight: 44,
  },
});
