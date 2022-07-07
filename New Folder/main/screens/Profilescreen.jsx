import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Share,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AllHeader from "./AllHeader";
import * as WebBrowser from "expo-web-browser";

export default function Profilescreen({ navigation }) {
  const [Name, setName] = useState("");
  const [email, setemail] = useState("");
  const [mobno, setmobno] = useState("");
  const hostphp = useSelector((state) => state.hostphp);

  const getAsyncStorage = async () => {
    let Data;
    try {
      Data = JSON.parse(await AsyncStorage.getItem("Data"));
      console.log("User Data ", Data);
      setName(Data.Name);
      setemail(Data.Email);
      setmobno(Data.Mobile);
    } catch (e) {
      console.log("err inserting");
    }
  };

  const Shareapp = async () => {
    console.log("share");
    try {
      const result = await Share.share({
        title: "Fresh Fury",
        message:
          "Fresh Fury.Best Online food ordering app. Install now, AppLink :https://play.google.com/store/apps/details?id=com.Freshfuerymypp.dd",
        url: "https://play.google.com/store/apps/details?id=com.Freshfuerymypp.dd",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("1");
        } else {
          console.log("1.1");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("2");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getAsyncStorage();
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <AllHeader navigation={navigation} name="Profile" />
      <ScrollView>
        <View style={styles.mainview}>
          <View style={styles.profilimgtopflx}>
            <Image
              style={styles.profilimg}
              source={require("../../assets/bbb.png")}
            />
            <View style={styles.profillefttxt}>
              <Text numberOfLines={1} style={styles.Name}>
                {Name}
              </Text>
              <Text numberOfLines={1} style={styles.email}>
                {email}
              </Text>

              <Text numberOfLines={1} style={styles.email}>
                +91 {mobno}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.man2}>
          <View style={styles.hr}></View>
          <View style={styles.flxrow}>
            <TouchableOpacity
              style={styles.touchbox}
              onPress={() => navigation.navigate("Order")}
            >
              <MaterialCommunityIcons
                style={styles.boxicon}
                name="food"
                size={28}
                color={"#27cec8"}
              />
              <Text
                style={{
                  color: "gray",
                  fontFamily: "BalsamiqSans_400Regular",
                }}
              >
                My Orders
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchbox}
              onPress={() => navigation.navigate("Cart")}
            >
              <MaterialCommunityIcons
                style={styles.boxicon}
                name="cart-variant"
                size={28}
                color={"#27cec8"}
              />
              <Text
                style={{
                  color: "gray",
                  fontFamily: "BalsamiqSans_400Regular",
                }}
              >
                My Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchbox}
              onPress={() => navigation.navigate("Notifications")}
            >
              <MaterialCommunityIcons
                style={styles.boxicon}
                name="bell-circle-outline"
                size={28}
                color={"#27cec8"}
              />
              <Text
                style={{
                  color: "gray",
                  fontFamily: "BalsamiqSans_400Regular",
                }}
              >
                Notificatin
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.touchlist}
            onPress={() => navigation.navigate("Address")}
          >
            <View style={styles.flxrowlist}>
              <MaterialCommunityIcons
                name="map-marker-radius-outline"
                size={24}
                color={"#27cec8"}
              />
              <Text style={styles.listtxt}>Address</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchlist} onPress={() => Shareapp()}>
            <View style={styles.flxrowlist}>
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={24}
                color={"#27cec8"}
              />
              <Text style={styles.listtxt}>Share App</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchlist}
            onPress={() => navigation.navigate("Customersupport")}
          >
            <View style={styles.flxrowlist}>
              <MaterialCommunityIcons
                name="message-question"
                size={24}
                color={"#27cec8"}
              />
              <Text style={styles.listtxt}>Customer Support</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchlist}
            onPress={async () => {
              let result = await WebBrowser.openBrowserAsync(
                hostphp + "restarunt/Users/Privicy-Policy-converted.html"
              );
            }}
          >
            <View style={styles.flxrowlist}>
              <MaterialCommunityIcons
                name="shield-account"
                size={24}
                color={"#27cec8"}
              />
              <Text style={styles.listtxt}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchlist}
            onPress={() => navigation.navigate("Devcontect")}
          >
            <View style={styles.flxrowlist}>
              <MaterialCommunityIcons
                name="codepen"
                size={24}
                color={"#27cec8"}
              />
              <Text style={styles.listtxt}>Developer Contact</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchlistlast}
            onPress={() => navigation.navigate("Appinfo")}
          >
            <View style={styles.flxrowlist}>
              <MaterialCommunityIcons
                name="information-outline"
                size={24}
                color={"#27cec8"}
              />
              <Text style={styles.listtxt}>App Info</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profilimgtopflx: {
    flexDirection: "row",
  },
  profilimg: {
    width: 120,
    height: 120,
    marginTop: 23,
  },
  profillefttxt: {
    marginTop: 40,
    marginLeft: 13,
  },
  Name: {
    height: 40,
    fontSize: 26,
    fontFamily: "BalsamiqSans_700Bold",
  },
  email: {
    height: 28,
    fontSize: 14,
    fontFamily: "BalsamiqSans_400Regular",
    color: "gray",
  },
  man2: {
    marginTop: 20,
    alignItems: "center",
  },
  hr: {
    width: "90%",
    height: 2,
    backgroundColor: "#27cec8",
    marginBottom: 12,
  },
  flxrow: {
    flexDirection: "row",
    paddingHorizontal: "10%",
    paddingTop: 6,
    paddingBottom: 25,
  },
  touchbox: {
    width: "30%",
    alignItems: "center",
    backgroundColor: "#f5f5f7",
    marginHorizontal: 11,
    borderRadius: 8,
    paddingBottom: 4,
  },
  boxicon: {
    marginTop: 11,
  },
  flxrowlist: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  listtxt: {
    paddingLeft: 12,
    fontFamily: "BalsamiqSans_400Regular",
    fontSize: 17,
  },
  touchlist: {
    width: "85%",
  },
  touchlistlast: {
    width: "85%",
    marginBottom: 32,
  },
});
