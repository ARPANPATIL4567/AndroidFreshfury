import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Button,
  Alert,
  Modal,
  Image,
  TextInput,
  ScrollView,
} from "react-native";

import { Checkbox, ActivityIndicator } from "react-native-paper";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllHeader from "../AllHeader";

const PaymentScreen = (props) => {
  const { confirmPayment, loading } = useConfirmPayment();
  const [modal1Visible, setModal1Visible] = useState(false);
  const hostnode = useSelector((state) => state.hostnode);
  const [isprogress, setisprogress] = useState(false);
  const [Data, setData] = useState(props.Data);

  console.log("fffffffffffffffffffff");
  console.log(Data);

  const Modelview = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal1Visible}
        onRequestClose={() => {
          props.navigation.navigate("Order");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require("../../../assets/cong.png")}
              style={{
                height: 130,
                width: 140,
              }}
            />
            <Text style={styles.modalText1}>Congratulations!</Text>
            <Text style={styles.modalText2}>
              Payment was sucessfully maded.
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.navigation.navigate("Order")}
            >
              <Text style={styles.textStyle}>Track Hear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const PlaceOrder = async () => {
    let userData;
    try {
      userData = JSON.parse(await AsyncStorage.getItem("Data"));
      console.log(userData);
    } catch (e) {
      console.log("err retreving", e);
    }
    let config = {
      method: "post",
      url: hostnode + "PlaceOrder",
      headers: {
        "Content-Type": "application/Json",
      },
      data: { ...props.Data, userData, paymethod: "card" },
    };
    await axios(config).then((res) => {
      if (res.data == "ok") {
        setModal1Visible(true);
      } else if (res.data == "found") {
        Alert.alert(
          "Order Failed...",
          "Make sure to cancel previous order to make new order"
        );
        setisprogress(false);
      }
    });
  };

  const getClientSecret = async () => {
    let value;
    try {
      value = await AsyncStorage.getItem("Data");
      console.log(value);
    } catch (e) {
      console.log("err retreving", e);
    }
    console.log(props.Data.FoodData.Total);
    const userData = {
      amount: props.Data.FoodData.Total,
      name: value,
    };
    let response;
    let config = {
      method: "post",
      url: hostnode + "GenerateSecret",
      headers: {
        "Content-Type": "application/Json",
      },
      data: userData,
    };
    await axios(config).then((res) => {
      response = res.data;
    });
    return response;
  };

  const onpress = () => {
    console.log("called");
    setisprogress(true);
    getClientSecret().then(async (res) => {
      if (res.message == "Payment initiated") {
        const { error, paymentIntent } = await confirmPayment(
          res.clientSecret,
          {
            type: "Card",
            billilgDetails: "dddddd",
          }
        );
        if (error) {
          Alert.alert(
            "Payment Failed",
            "Trangistion fail due to process Falt."
          );
          setisprogress(false);
        } else if (paymentIntent) {
          if (paymentIntent.status == "Succeeded") {
            PlaceOrder();
          }
        }
      }
    });
  };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <ScrollView
        style={{ flex: 1, width: "100%", backgroundColor: "#f5f5f7" }}
      >
        <Modelview />
        <View style={styles.img}>
          <Image
            source={require("../../../assets/card.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.DetailMainview}>
          <Text style={styles.infitxt}>Mobno : {Data.Mobno}</Text>
          <View style={styles.hrinfo}></View>
          <Text style={styles.infitxt}>Name : {Data.Name}</Text>
          <View style={styles.hrinfo}></View>
          <Text style={styles.infitxt}>Pin Code : {Data.PinCod}</Text>
        </View>
        <Text style={styles.inptoptext}>
          Conform To Pay ₹{Data.FoodData.Total}/-
        </Text>
        <View style={{ paddingHorizontal: 14 }}>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 20,
            }}
            onCardChange={(cardDetails) => {
              console.log("cardDetails", cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
          />
          <Text style={styles.inptop}>CardHolder Name</Text>
          <TextInput
            style={{
              width: "100%",
              fontSize: 14,
              borderRadius: 9,
              padding: 7,
              paddingHorizontal: 14,
              backgroundColor: "#f5f5f7",
              backgroundColor: "white",
            }}
          />
          <View style={styles.check}>
            <Checkbox
              status={true ? "checked" : "unchecked"}
              color={"#ff6c41"}
              uncheckColor={"red"}
            />

            <Text style={styles.aggry}>Remember this card.</Text>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        disabled={isprogress}
        style={styles.cardbtnpay}
        onPress={onpress}
      >
        {isprogress ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.Btntxt}>Pay Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default function Card({ route, navigation }) {
  const [Data, setData] = useState(route.params);
  console.log(route.params);
  return (
    <View style={{ flex: 1 }}>
      <AllHeader navigation={navigation} name="Payment" />
      <StripeProvider publishableKey="pk_test_51L3FPUSAFAJ0a4UnfzfYvOPktBYO1tHnhsJidavGqK2SywNT9LBYv9z1v7UDq5QFgN7p8pruZuSfWIMZNdoVQ9lu00NKNdLQ0Z">
        <PaymentScreen Data={Data} navigation={navigation} />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  DetailMainview: {
    backgroundColor: "white",
    marginHorizontal: 14,
    borderRadius: 10,
    paddingBottom: 14,
  },
  infitxt: {
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 33,
    width: "100%",
    color: "#898C95",
  },
  hrinfo: {
    height: 1,
    backgroundColor: "#cdccce",
    marginHorizontal: 14,
    borderRadius: 5,
    marginTop: 14,
  },
  inptoptext: {
    fontSize: 24,
    marginTop: 10,
    paddingHorizontal: 33,
    width: "100%",
    color: "#898C95",
  },
  inptop: {
    color: "#93979a",
    paddingTop: 10,
    paddingBottom: 6,
  },
  hedeertxt: {
    fontSize: 25,
    color: "#1E1F20",
    paddingRight: 44,
  },
  cardbtnpay: {
    backgroundColor: "#27cec8",
    width: "90%",
    height: 59,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  check: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 65,
  },
  aggry: {},
  centeredView: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Btntxt: {
    color: "white",
    fontFamily: "BalsamiqSans_700Bold_Italic",
  },
  button: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#27cec8",
    position: "absolute",
    bottom: 10,
    width: "100%",
    height: 63,
    justifyContent: "center",
  },
  buttonOpen: {
    backgroundColor: "#27cec8",
  },
  buttonClose: {
    backgroundColor: "#27cec8",
  },
  textStyle: {
    color: "white",
    textAlign: "center",
    fontFamily: "BalsamiqSans_400Regular",
  },
  modalText1: {
    textAlign: "center",
    fontSize: 33,
    fontFamily: "BalsamiqSans_400Regular",
  },
  modalText2: {
    color: "gray",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "BalsamiqSans_400Regular",
  },
  img: {
    width: "100%",
    height: 240,
  },
});
