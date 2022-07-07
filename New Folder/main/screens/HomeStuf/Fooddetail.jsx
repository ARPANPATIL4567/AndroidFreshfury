import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllHeader from "../AllHeader";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function Fooddetail({ route, navigation }) {
  const hostphp = useSelector((state) => state.hostphp);
  const [btntxt, setbtntxt] = useState("Add To Cart");
  const scrollRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const Modelview = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={{
              display: "flex",
              flex: 1,
            }}
            onPress={() => {
              setModalVisible(false);
            }}
          ></TouchableOpacity>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cart Added</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.dispatch(StackActions.replace("Cart"))}
            >
              <Text style={styles.textStyle}>Go to Cart</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  const { data, Datalist } = route.params;
  console.log(Datalist);
  console.log(data[0]);
  const adtocart = async () => {
    try {
      const value = await AsyncStorage.getItem("Cartitem");
      if (value.length > 0) {
        const cartobj = JSON.parse(value);
        console.log("Found privious data " + cartobj);
        cartobj.push(data[0]);
        try {
          await AsyncStorage.setItem("Cartitem", JSON.stringify(cartobj));
          console.log("Storage inserted " + JSON.stringify(cartobj));
          console.log("Storage inserted " + cartobj);
          setbtntxt("Cart Added");
          setModalVisible(true);
        } catch (e) {
          console.log("err inserting");
        }
      } else {
      }
    } catch (e) {
      console.log(e);
      console.log("no privious data");
      try {
        await AsyncStorage.setItem("Cartitem", JSON.stringify([data[0]]));
        console.log("Storage inserted " + JSON.stringify([data[0]]));
        setbtntxt("Cart Added");
        setModalVisible(true);
      } catch (e) {
        console.log("err inserting");
      }
    }
    try {
      const value = await AsyncStorage.getItem("Cartitem");
      console.log(value);
    } catch (e) {
      console.log("err retreving");
    }
  };
  const renderfood = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.maindiv}
        onPress={() => {
          navigation.navigate("Fooddetail", { data: item, Datalist: Datalist });
          console.log(item);
          scrollRef.current?.scrollTo(0, 0, false);
        }}
      >
        <Image
          style={styles.imag}
          source={{ uri: hostphp + "restarunt/Admin/" + item[4] }}
        />
        <Text numberOfLines={2} style={styles.h1}>
          {item[1]}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 270,
            paddingTop: 8,
            paddingBottom: 12,
            width: "90%",
          }}
        >
          <Text style={styles.price}>
            ₹{item[3]}/-<Text style={styles.off}>(30%off)</Text>
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

  return (
    <View style={styles.main}>
      <StatusBar />
      <AllHeader navigation={navigation} name={"Food Details"} />
      <Modelview />
      <ScrollView ref={scrollRef}>
        <Image
          style={styles.headImage}
          source={{
            uri: hostphp + "restarunt/Admin/" + data[4],
          }}
        />

        <Text style={styles.title}>{data[1]}</Text>
        <View style={styles.hr}></View>
        <Text style={styles.disc}>{data[2]}</Text>
        <View style={styles.retingdiv}></View>

        <Text style={styles.deltime}>Estimated delivery in 90 Seconds</Text>
        <View style={styles.pricedatabox}>
          <View style={styles.Box}>
            <Text style={styles.producdetail}>Product Details</Text>
            <View style={styles.boxlistflx}>
              <Text style={styles.producdetaills}>Price :</Text>
              <Text style={styles.producdetaillsend}>
                ₹{data[3]}/-
                <Text style={styles.Cutpric}>(30%off)</Text>
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.Categoiry}>Recomended For You</Text>
        <View>
          <FlatList
            data={Datalist}
            horizontal
            renderItem={renderfood}
            keyExtractor={(a) => a[0]}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomstickbox}>
        <View style={styles.boxstickflx}>
          <Text style={styles.producdetaills}>Total :</Text>
          <Text style={styles.producdetaillsend}>₹{data[3]}/- </Text>
          <TouchableOpacity onPress={adtocart} style={styles.Addtocartbtn}>
            <MaterialCommunityIcons
              style={styles.boxicon}
              name="cart-variant"
              size={34}
              color={"white"}
              style={{
                paddingVertical: 7,
              }}
            />
            <Text style={styles.Addtocart}>{btntxt}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  retingdiv: {
    flexDirection: "row",
    paddingTop: 24,
    paddingLeft: 32,
  },
  Categoiry: {
    fontSize: 18,
    paddingBottom: 14,
    paddingLeft: 20,
    fontFamily: "BalsamiqSans_700Bold",
  },
  headImage: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 23,
    paddingHorizontal: 23,
    paddingTop: 13,
    fontFamily: "BalsamiqSans_700Bold",
  },
  hr: {
    width: 66,
    height: 2,
    borderRadius: 18,
    marginTop: 7,
    marginLeft: 33,
    backgroundColor: "#27cec8",
  },
  disc: {
    paddingHorizontal: 23,
    paddingTop: 13,
    color: "gray",
    fontFamily: "BalsamiqSans_700Bold",
    textAlign: "justify",
  },
  starStyle: {
    width: 100,
    height: 20,
    marginTop: 12,
    paddingLeft: 33,
    paddingTop: 13,
  },
  open: {
    paddingHorizontal: 33,
    paddingTop: 4,
    marginTop: 12,
    color: "gray",
    fontFamily: "BalooTammudu2_600SemiBold",
  },
  mapcontainer: {
    alignItems: "center",
    paddingHorizontal: 22,
    paddingBottom: 22,
  },
  map: {
    width: "100%",
    height: 150,
    backgroundColor: "gray",
  },
  pricedatabox: {
    width: "100%",
    paddingHorizontal: 17,
  },
  Cutpric: {
    color: "gray",
  },
  deltime: {
    color: "gray",
    paddingLeft: 23,
    paddingBottom: 7,
    fontFamily: "BalsamiqSans_400Regular",
    marginBottom: 22,
  },
  Box: {
    backgroundColor: "#f5f5f7",
    borderRadius: 3,
    borderRadius: 13,
    marginBottom: 14,
  },
  producdetail: {
    fontSize: 23,
    color: "#27cec8",
    paddingLeft: 23,
    paddingTop: 12,
    paddingBottom: 13,
    fontFamily: "BalsamiqSans_700Bold",
  },
  boxlistflx: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  producdetaills: {
    color: "gray",
    paddingLeft: 23,
    paddingBottom: 7,
    fontFamily: "BalsamiqSans_400Regular",
  },
  producdetaillsend: {
    color: "#27cec8",
    paddingBottom: 7,
    paddingRight: 22,
    fontFamily: "BalsamiqSans_400Regular",
  },
  bottomstickbox: {
    width: "100%",
    height: 55,
  },
  boxstickflx: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  Addtocart: {
    color: "white",
    fontFamily: "BalsamiqSans_700Bold",
  },
  Addtocartbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 1,
    backgroundColor: "#27cec8",
    paddingHorizontal: 32,
    marginRight: 13,
    borderRadius: 13,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 26,
    borderTopLeftRadius: 26,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.85,
    shadowRadius: 7,
    elevation: 9,
  },
  button: {
    elevation: 2,
    backgroundColor: "#27cec8",
    width: "90%",
    height: 55,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "BalsamiqSans_700Bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 23,
    fontFamily: "BalsamiqSans_700Bold",
  },
  maindiv: {
    backgroundColor: "#f5f5f7",
    alignItems: "center",
    marginBottom: 23,
    borderRadius: 16,
    width: 170,
    marginHorizontal: 12,
  },
  imag: {
    width: "90%",
    height: 100,
    marginTop: 7,
    borderRadius: 16,
  },
  h1: {
    fontFamily: "BalsamiqSans_700Bold",
    fontSize: 16,
    width: "90%",
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
  off: {
    fontSize: 10,
    color: "gray",
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
  vr: {
    backgroundColor: "gray",
    width: 40,
    height: 1,
    position: "absolute",
    right: 27,
    top: 11,
  },
});
