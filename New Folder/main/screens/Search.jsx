import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Search({ navigation }) {
  const onPress = () => {
    console.log("searched");
    navigation.push("Search");
  };
  return (
    <View>
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 42,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 11,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#CDCDD2",
            marginTop: StatusBar.currentHeight,
          }}
        >
          <Ionicons
            name="chevron-back"
            size={32}
            style={{
              color: "#CDCDD2",
            }}
          />
        </TouchableOpacity>
        <View style={styles.searchviewmain}>
          <Ionicons
            name="md-search-sharp"
            size={26}
            style={{ marginTop: 8, color: "black" }}
          />
          <View style={styles.searchview}>
            <TextInput autoFocus={true} style={styles.search} />
          </View>
        </View>
      </View>
      <View style={{ height: "100%", backgroundColor: "white" }}>
        <Text
          style={{
            textAlign: "center",
            paddingTop: 22,
          }}
        >
          No Data
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 5,
    shadowColor: "#black",
  },
  searchviewmain: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    backgroundColor: "#f2f4f8",
    borderRadius: 9,
    marginRight: 15,
    marginLeft: 7,
    marginBottom: 5,
    paddingLeft: 10,
    flexGrow: 1,
  },
  searchview: {
    flexGrow: 1,
  },
  search: {
    padding: 8,
  },
});
