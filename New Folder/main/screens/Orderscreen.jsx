import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AllHeader from "./AllHeader";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";

const NoOrders = () => {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "white",
        paddingHorizontal: 53,
        paddingTop: 145,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/ddd.png")}
        style={{ width: "70%", height: 183 }}
      />
      <Text
        style={{
          color: "gray",
          textAlign: "center",
          fontSize: 22,
          fontFamily: "BalsamiqSans_700Bold",
        }}
      >
        No Order's Yet!
      </Text>
    </View>
  );
};

export default function Orderscreen({ navigation }) {
  const hostphp = useSelector((state) => state.hostphp);
  const hostnode = useSelector((state) => state.hostnode);
  const [foodlistarr, setfoodlistarr] = useState([]);
  const [fooddata, setfooddata] = useState([]);
  const [isempty, setisempty] = useState(true);
  const [isnoorders, setisnoorders] = useState(true);

  const Render = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.mainlistbox}>
        <Image
          style={styles.foodtinyLogo}
          source={{
            uri: hostphp + "restarunt/Admin/" + item.image,
          }}
        />
        <View
          style={{
            width: "76%",
          }}
        >
          <Text numberOfLines={1} style={styles.txth1}>
            {item.foodname}
          </Text>
          <Text style={styles.txtcount}>Contity : {item.count}</Text>
          <Text style={styles.txtprice}>
            Total Price :
            <Text style={{ color: "#27cec8" }}>
              ₹{item.totalprice}/-
              <Text style={styles.Cutpric}>(30%off)</Text>
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  const Footer = () => {
    console.log(fooddata);
    return (
      <View style={styles.footermain}>
        <Text style={styles.note}>
          Note:To make new order Pleace Cancel the existing order
        </Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            backgroundColor: "#f5f5f7",
            padding: 18,
            marginTop: 12,
            borderRadius: 13,
          }}
        >
          <Text
            style={{
              paddingLeft: 15,
              color: "gray",
              fontFamily: "BalsamiqSans_700Bold",
            }}
          >
            Total:
          </Text>
          <Text
            style={{ paddingRight: 15, fontFamily: "BalsamiqSans_700Bold" }}
          >
            ₹{fooddata.Price}/-
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttontrack}
          onPress={() => navigation.navigate("Trackscreen", { data: fooddata })}
        >
          <Text
            style={{ color: "white", fontFamily: "BalsamiqSans_400Regular" }}
          >
            Track Order
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getnyallorderdata = async () => {
    console.log("call");
    let foodIDarray = new Array();
    let userData;
    let jsn;
    let foodlistarr;
    let fooddata;
    let fooddatacount;
    let isempty = false;

    try {
      userData = JSON.parse(await AsyncStorage.getItem("Data"));
    } catch (e) {
      console.log("err retreving", e);
    }

    let myid = {
      myid: userData.id,
    };
    let config = {
      method: "post",
      url: hostnode + "Givmyordersdetail",
      headers: {
        "Content-Type": "application/Json",
      },
      data: myid,
    };
    await axios(config).then((res) => {
      console.log(res.data);
      if (res.data.length <= 0) {
        console.log("execut");
        isempty = true;
        setfoodlistarr([]);
        setisnoorders(false);
        return;
      }
      setisnoorders(true);
      jsn = JSON.parse(res.data[0].OrderFood_Id);
      fooddata = res.data[0];
      for (let j = 0; j < jsn.length; j++) {
        foodIDarray.push(jsn[j].id);
      }
    });
    if (!isempty) {
      foodIDarray = JSON.stringify(foodIDarray);
      let config2 = {
        method: "post",
        url: hostnode + "GivemycartDetail?array=" + foodIDarray,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios(config2).then((res) => {
        if (res.data.errno || res.data == "") {
          console.log("err");
        } else {
          foodlistarr = res.data;
        }
      });
      // setup

      for (let i = 0; i < foodlistarr.length; i++) {
        for (let j = 0; j < jsn.length; j++) {
          if (foodlistarr[i].id == jsn[j].id) {
            foodlistarr[i].count = jsn[j].count;
            foodlistarr[i].totalprice = jsn[j].price;
          }
        }
      }
      setfooddata(fooddata);
      setfoodlistarr(foodlistarr);
      setisempty(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getnyallorderdata();
      console.log("Function Call on TAb change");
    }, [])
  );

  return (
    <View>
      <AllHeader navigation={navigation} name="My Orders" />
      {isnoorders ? (
        isempty ? (
          <View style={styles.loadview}>
            <ActivityIndicator size="large" color="#27cec8" />
          </View>
        ) : (
          <View style={styles.flatlistback}>
            <FlatList
              data={foodlistarr}
              renderItem={Render}
              keyExtractor={(a) => a.id}
              ListFooterComponent={<Footer />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )
      ) : (
        <NoOrders />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  loadview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 178,
  },
  flatlistback: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    height: "90%",
  },
  mainlistbox: {
    backgroundColor: "#f5f5f7",
    padding: 13,
    borderRadius: 13,
    marginTop: 14,
    flexDirection: "row",
  },
  foodtinyLogo: {
    width: "30%",
    height: 63,
    borderRadius: 13,
  },
  txth1: {
    paddingLeft: 10,
    fontSize: 16,
    marginRight: 10,
    fontFamily: "BalsamiqSans_700Bold",
  },
  txtcount: {
    paddingLeft: 10,
    color: "gray",
    fontFamily: "BalsamiqSans_700Bold",
  },
  txtprice: {
    paddingLeft: 10,
    color: "gray",
    fontFamily: "BalsamiqSans_400Regular",
  },
  footermain: {
    marginTop: 14,
  },
  note: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "#fcf5d9",
    padding: 13,
    borderRadius: 13,
    color: "gray",
    fontFamily: "BalsamiqSans_400Regular",
  },
  buttontrack: {
    backgroundColor: "#27cec8",
    height: 55,
    marginTop: 23,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    marginBottom: 66,
  },
  vr: {
    backgroundColor: "gray",
    width: 34,
    height: 1,
    position: "absolute",
    left: 130,
    bottom: 8,
  },
  Cutpric: {
    color: "gray",
    fontSize: 10,
  },
});
