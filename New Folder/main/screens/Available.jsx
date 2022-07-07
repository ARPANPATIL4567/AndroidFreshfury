import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AllHeader from "./AllHeader";
import { Ionicons } from "@expo/vector-icons";

const Available = ({ route, navigation }) => {
  const hostphp = useSelector((state) => state.hostphp);
  const { Data } = route.params;
  console.log(Data);

  const Renderer = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.maindiv}
        onPress={() =>
          navigation.navigate("Fooddetail", { data: item, Datalist: Data })
        }
      >
        <Image
          style={styles.imag}
          source={{ uri: hostphp + "restarunt/Admin/" + item[4] }}
        />
        <Text numberOfLines={1} style={styles.h1}>
          {item[1]}
        </Text>
        <Text numberOfLines={1} style={styles.discription}>
          {item[2]}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 270,
            paddingTop: 8,
            paddingBottom: 12,
          }}
        >
          <Text style={styles.price}>
            Price : ₹{item[3]}/-<Text style={styles.off}>(30%off)</Text>
          </Text>
          <View style={styles.ratdiv}>
            <Ionicons
              name="star"
              size={12}
              style={{
                color: "white",
                paddingTop: 1,
              }}
            />
            <Text style={styles.rattxt}>{item[5]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const Bottomspace = () => {
    return <View style={styles.extrabottomspace}></View>;
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <AllHeader navigation={navigation} name={"Chicken"} />
      <FlatList
        data={Data}
        showsVerticalScrollIndicator={false}
        renderItem={Renderer}
        keyExtractor={(a) => a[0]}
        ListFooterComponent={Bottomspace}
      />
    </View>
  );
};

export default Available;

const styles = StyleSheet.create({
  maindiv: {
    backgroundColor: "#f5f5f7",
    alignItems: "center",
    marginBottom: 23,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  imag: {
    width: 290,
    height: 130,
    marginHorizontal: 23,
    marginTop: 15,
    borderRadius: 16,
  },
  h1: {
    fontFamily: "BalsamiqSans_700Bold",
    fontSize: 20,
    width: 270,
    paddingTop: 4,
  },
  discription: {
    width: 270,
    fontFamily: "BalsamiqSans_400Regular",
    color: "gray",
    paddingTop: 4,
    textAlign: "justify",
  },
  price: {
    color: "#27cec8",
    fontFamily: "BalsamiqSans_700Bold",
  },
  ratdiv: {
    backgroundColor: "#27cec8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    borderRadius: 5,
    paddingBottom: 2,
  },
  rattxt: {
    color: "white",
    fontFamily: "BalsamiqSans_700Bold",
  },
  extrabottomspace: {
    height: 120,
  },
  off: {
    fontSize: 10,
    color: "gray",
  },
});
