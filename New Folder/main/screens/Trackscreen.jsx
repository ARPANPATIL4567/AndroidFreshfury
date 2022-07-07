import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import AllHeader from "./AllHeader";

const Trackscreen = ({ route, navigation }) => {
  const Data = route.params.data;
  let namemobarra = Data.Name_mobile.split("-");
  let name = namemobarra[0];
  let mob1 = namemobarra[1].split("/")[0];
  let mob2 = namemobarra[1].split("/")[1];
  let orderstate = Data.OrderState;
  let img;

  if (orderstate == "Pending") {
    img = require("../../assets/t1.png");
  } else if (orderstate == "Conform") {
    img = require("../../assets/t2.png");
  } else if (orderstate == "Prepaired ") {
    img = require("../../assets/t3.png");
  } else if (orderstate == "On the way") {
    img = require("../../assets/t4.png");
  } else if (orderstate == "Delevered") {
    img = require("../../assets/t5.png");
  } else {
    img = require("../../assets/t1.png");
  }
  // let orderstate = route.params.Data.OrderState;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <AllHeader navigation={navigation} name="Delevery Status" />
      <View style={styles.mainview}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.headtxt}>Track Order</Text>
          <View style={styles.trackimgdiv}>
            <Image
              source={img}
              style={{
                width: 200,
                height: 246,
              }}
            />
          </View>
          <View style={styles.Detailmainview}>
            <View style={styles.detailrow}>
              <Text style={styles.detailtxt}>Email : </Text>
              <Text style={styles.detailtxt}>{Data.email}</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.detailrow}>
              <Text style={styles.detailtxt}>Price : </Text>
              <Text style={styles.detailtxt}>₹{Data.Price}/-</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.detailrow}>
              <Text style={styles.detailtxt}>Payment method : </Text>
              <Text style={styles.detailtxt}>{Data.Pay_method}</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.detailrow}>
              <Text style={styles.detailtxt}>Payment state : </Text>
              <Text style={styles.detailtxt}>{Data.paystat}</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.detailrow}>
              <Text style={styles.detailtxt}>Name : </Text>
              <Text style={styles.detailtxt}>{name}</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.detailrow}>
              <Text style={styles.detailtxt}>Mobile No : </Text>
              <Text style={styles.detailtxt}>{mob1}</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.detailrow}>
              <Text style={styles.detailtxt}>Mobile No : </Text>
              <Text style={styles.detailtxt}>{mob2}</Text>
            </View>
          </View>
          <View style={styles.Detailaddredd}>
            <Text style={styles.Addresstxt}>Address : {Data.AddressFull}</Text>
          </View>
          <Text style={styles.note}>
            <Text style={styles.noteh1}>Order Cancelation Policy :</Text> Order
            should be canceled within 90 minutes. If the Time is longer than 90
            minutes, the full ammount of order will have be to paid.
          </Text>
        </ScrollView>
        <View style={styles.byuttonbk}>
          <TouchableOpacity
            style={styles.buttoncancel}
            onPress={() => {
              navigation.navigate("Cancelorder", { Data: Data });
            }}
          >
            <Text
              style={{ color: "#27cec8", fontFamily: "BalsamiqSans_700Bold" }}
            >
              Request for Cancel Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Trackscreen;

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    marginHorizontal: 13,
  },
  headtxt: {
    fontSize: 23,
    marginTop: 22,
    textAlign: "center",
    fontFamily: "BalsamiqSans_700Bold",
    paddingBottom: 14,
    color: "gray",
  },
  trackimgdiv: {
    backgroundColor: "#f5f5f7",
    paddingVertical: 22,
    borderRadius: 13,
    paddingLeft: 28,
  },
  Detailmainview: {
    marginTop: 23,
    backgroundColor: "#f5f5f7",
  },
  detailrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 23,
    paddingVertical: 10,
  },
  hr: {
    height: 1,
    backgroundColor: "#d4d6dd",
    marginHorizontal: 13,
  },
  detailtxt: {
    color: "gray",
  },
  Detailaddredd: {
    marginBottom: 13,
    marginTop: 13,
    backgroundColor: "#f5f5f7",
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  Addresstxt: {
    color: "gray",
    textAlign: "justify",
    fontFamily: "BalsamiqSans_400Regular",
  },
  byuttonbk: {
    height: 73,
  },
  buttoncancel: {
    width: "100%",
    backgroundColor: "#f5f5f7",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 13,
    marginTop: 13,
    position: "absolute",
    bottom: 10,
  },
  note: {
    textAlign: "justify",
    fontSize: 15,
    backgroundColor: "#fcf5d9",
    padding: 13,
    borderRadius: 13,
    color: "gray",
    fontFamily: "BalsamiqSans_400Regular",
    marginBottom: 33,
  },
  noteh1: {
    fontSize: 15,
    color: "black",
    fontFamily: "BalsamiqSans_400Regular",
  },
});
