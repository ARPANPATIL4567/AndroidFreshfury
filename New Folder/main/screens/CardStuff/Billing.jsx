import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  Alert,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import RadioButtonRN from "radio-buttons-react-native";
import { useSelector, useDispatch } from "react-redux";
import AllHeader from "../AllHeader";
import * as WebBrowser from "expo-web-browser";

const CurrentProcessbar = () => {
  return (
    <View style={styles.currentProcessbar}>
      <Image
        source={require("../../../assets/p2.png")}
        style={{ width: 295, height: 46 }}
      />
    </View>
  );
};

const style2 = StyleSheet.create({
  foodmain: {
    backgroundColor: "#f5f5f7",
    marginHorizontal: 14,
    marginTop: 17,
    flexDirection: "row",
    borderRadius: 10,
  },
  foodtinyLogo: {
    width: 103,
    height: 83,
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: 10,
  },
  h1: {
    fontFamily: "BalooTammudu2_600SemiBold",
    fontSize: 17,
    width: "90%",
    paddingLeft: 6,
    paddingTop: 17,
    width: "50%",
  },
  pric1: {
    fontFamily: "BalsamiqSans_400Regular",
    fontSize: 19,
    paddingLeft: 6,
    color: "#27cec8",
  },
});

const Paymentmethod = (props) => {
  const [isprogress, setisprogress] = useState(false);
  const data = [
    {
      label: "Paytm/UPI/Net Banking",
      name: "card",
    },
    {
      label: "Cash on Delivery",
      name: "casondel",
    },
  ];
  const Modelview = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.navigation.navigate("Order");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require("../../../assets/cong.png")}
              style={{
                width: 160,
                height: 160,
              }}
            />
            <Text style={styles.modalText1}>Congratulations!</Text>
            <Text style={styles.modalText2}>
              Order was sucessfully Submited.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Order")}
          >
            <Text style={styles.textStyle}>Track Hear</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const PlaceOrder = async () => {
    let userData;
    try {
      userData = JSON.parse(await AsyncStorage.getItem("Data"));
    } catch (e) {
      console.log("err retreving", e);
    }
    let config = {
      method: "post",
      url: props.hostnode + "PlaceOrder",
      headers: {
        "Content-Type": "application/Json",
      },
      data: { ...props.route.params, userData, paymethod: "Cash on Delivery" },
    };
    await axios(config).then((res) => {
      if (res.data == "ok") {
        props.setModalVisible(true);
      } else if (res.data == "found") {
        Alert.alert(
          "Order Failed...",
          "Make sure to cancel previous order to make new order"
        );
        setisprogress(false);
      }
    });
  };

  const paywithupi = async () => {
    let userData;
    try {
      userData = await AsyncStorage.getItem("Data");
    } catch (e) {
      console.log("err retreving", e);
    }
    console.log("ffffffffffffff", {
      ...props.route.params,
      userData,
      paymethod: "UPI",
    });
    let result = await WebBrowser.openBrowserAsync(
      "http://192.168.42.146/Restarunt/Users/Razor.php?Data=" +
        JSON.stringify({ ...props.route.params, userData, paymethod: "UPI" })
    );
  };

  const ONPRESS = async () => {
    setisprogress(true);
    let userData;
    try {
      userData = JSON.parse(await AsyncStorage.getItem("Data"));
    } catch (e) {
      console.log("err retreving", e);
    }
    if (props.Payoption == "card") {
      let config = {
        method: "post",
        url: props.hostnode + "ismyorderExist",
        headers: {
          "Content-Type": "application/Json",
        },
        data: {
          ...props.route.params,
          userData,
          paymethod: "Cash on Delivery",
        },
      };
      await axios(config).then((res) => {
        if (res.data == "found") {
          Alert.alert(
            "Order Failed...",
            "Make sure to cancel previous order to make new order"
          );
        } else {
          // props.navigation.navigate("Card", {
          //   ...props.route.params,
          // });
          // paywithupi();
          Alert.alert(
            "UPI Failed...",
            "UPI and other payment service is still in Devlopment Stage."
          );
        }
        setisprogress(false);
      });
    } else if (props.Payoption == "casondel") {
      setisprogress(true);
      PlaceOrder();
    }
  };
  const onSelectCountry = (item) => {
    if (item.apply) {
      let a = props.Price;
      a.Total = (item.cod / 100) * props.Realprice;
      props.setPrice(a);
      if (props.Payoption == "card") {
        props.setPayoption("casondel");
        props.setbtntxt("Place Order Now>");
      } else {
        props.setPayoption("card");
        props.setbtntxt("Continue");
      }
    }
  };
  const Coupon = () => {
    return (
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#f5f5f7",
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 22,
            paddingVertical: 15,
            marginTop: 3,
            marginBottom: 13,
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={() => {
            props.navigation.navigate("Coupon", {
              onSelect: onSelectCountry,
            });
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons
              style={styles.icon}
              name="sale"
              size={32}
              color={"#205bfc"}
            />
            <Text
              style={{
                fontFamily: "BalsamiqSans_700Bold",
                fontSize: 17,
                paddingLeft: 8,
              }}
            >
              Apply Coupon code
            </Text>
          </View>
          <Ionicons
            name="md-chevron-back"
            size={26}
            style={{
              color: "#CDCDD2",
              transform: [{ rotateY: "180deg" }],
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.PaymentmethodView}>
      <Coupon />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          backgroundColor: "#f5f5f7",
          paddingBottom: 20,
          borderRadius: 10,
        }}
      >
        <Text style={styles.H1textgray}>Total : </Text>
        <Text style={styles.H1textgray}>₹{props.Price.Total}/-</Text>
      </View>

      <Text style={styles.H1text}>Select A Payment Method</Text>
      <RadioButtonRN
        animationTypes={["pulse", "rotate"]}
        data={data}
        circleSize={12}
        initial={1}
        selectedBtn={(e) => {
          if (e.name === "card") {
            props.setPayoption("card");
            props.setbtntxt("Continue");
          } else if (e.name === "casondel") {
            props.setPayoption("casondel");
            props.setbtntxt("Place Order Now>");
          }
        }}
      />
      <Modelview />
      <TouchableOpacity onPress={ONPRESS} style={styles.Btn}>
        {isprogress ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.Btntxt}>{props.btntxt}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default function Billing({ route, navigation }) {
  const [Payoption, setPayoption] = useState(null);
  const [btntxt, setbtntxt] = useState("Continue");
  const [modalVisible, setModalVisible] = useState(false);
  const [Foods, setFoods] = useState(route.params.FoodData.Data);
  const hostphp = useSelector((state) => state.hostphp);
  const hostnode = useSelector((state) => state.hostnode);
  const [Price, setPrice] = useState(route.params.FoodData);

  const Foodlist = ({ item }) => {
    return (
      <View style={style2.foodmain}>
        <Image
          style={style2.foodtinyLogo}
          source={{
            uri: hostphp + "restarunt/Admin/" + item.image,
          }}
        />
        <View>
          <Text numberOfLines={1} style={style2.h1}>
            {item.foodname}
          </Text>
          <Text numberOfLines={1} style={style2.pric1}>
            ₹{item.price}/-<Text style={styles.off}>(30%off)</Text>
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {}, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <AllHeader navigation={navigation} name="Order Summery" />
      <FlatList
        data={Foods}
        renderItem={Foodlist}
        extraData={hostphp}
        keyExtractor={(a) => a.id}
        ListHeaderComponent={CurrentProcessbar}
        ListFooterComponent={
          <Paymentmethod
            setPayoption={setPayoption}
            Payoption={Payoption}
            btntxt={btntxt}
            setbtntxt={setbtntxt}
            modalVisible={modalVisible}
            navigation={navigation}
            route={route}
            setModalVisible={setModalVisible}
            hostnode={hostnode}
            Price={Price}
            setPrice={setPrice}
            Realprice={route.params.FoodData.Total}
          />
        }
      />
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
  hedeertxt: {
    fontFamily: "BalsamiqSans_700Bold",
    color: "#27cec8",
    fontSize: 30,
    paddingRight: 44,
  },
  currentProcessbar: {
    backgroundColor: "#f5f5f7",
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 13,
  },
  orderProductDetailsview: {
    backgroundColor: "gray",
    marginTop: 9,
  },
  PaymentmethodView: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    flex: 1,
    position: "relative",
    bottom: 0,
  },
  H1textgray: {
    fontSize: 17,
    fontFamily: "BalsamiqSans_700Bold",
    textAlign: "center",
    paddingTop: 20,
    color: "gray",
  },
  H1text: {
    fontSize: 20,
    fontFamily: "BalooTammudu2_600SemiBold",
    textAlign: "center",
    paddingTop: 10,
  },
  Btn: {
    width: "100%",
    backgroundColor: "#27cec8",
    justifyContent: "center",
    alignItems: "center",
    height: 57,
    borderRadius: 10,
    marginTop: 10,
    position: "relative",
    bottom: 0,
  },
  Btntxt: {
    color: "white",
    fontFamily: "BalsamiqSans_700Bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 83,
  },
  button: {
    backgroundColor: "#27cec8",
    position: "absolute",
    bottom: 10,
    width: "90%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  modalText1: {
    textAlign: "center",
    fontSize: 33,
    fontFamily: "BalsamiqSans_700Bold",
  },
  modalText2: {
    color: "gray",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "BalsamiqSans_400Regular",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 23,
    fontFamily: "BalooTammudu2_600SemiBold",
  },
  textStyle: {
    fontFamily: "BalsamiqSans_700Bold_Italic",
    color: "white",
  },
  off: {
    fontSize: 13,
    color: "gray",
  },
});
