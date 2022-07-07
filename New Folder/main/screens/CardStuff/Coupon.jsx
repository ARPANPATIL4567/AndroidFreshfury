import {
  StyleSheet,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import AllHeader from "../AllHeader";
import { useSelector, useDispatch } from "react-redux";
import { Settotalprice } from "../../../redux/act_red";

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
    width: "80%",
  },
  pric1: {
    fontFamily: "BalsamiqSans_400Regular",
    fontSize: 19,
    paddingLeft: 6,
    color: "#27cec8",
  },
});

const Coupon = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const Totalprice = useSelector((state) => state.Totalprice);
  const dispatch = useDispatch();
  const [cod, setcod] = useState(0);
  const [copuntxt, setcopuntxt] = useState("");

  const Modelview = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          dispatch(Settotalprice(true));
          navigation.goBack();
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
              You Applied {cod}% Off in your Order.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              dispatch(Settotalprice(true));
              navigation.goBack();
            }}
          >
            <Text style={styles.textStyle}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const press = (cod) => {
    setcod(100 - cod);
    if (!Totalprice) {
      route.params.onSelect({ apply: true, cod: cod });
      setModalVisible(true);
    } else {
      route.params.onSelect({ apply: false, cod: cod });
      navigation.goBack();
    }
  };

  return (
    <View style={{ height: "100%", backgroundColor: "white" }}>
      <AllHeader navigation={navigation} name={"Coupons"} />
      <Modelview />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: 24,
        }}
      >
        <TextInput
          style={{
            flexGrow: 1,
            height: 35,
            borderBottomWidth: 1,
            marginHorizontal: 23,
          }}
          placeholder="Enter Coupon Code"
          onChangeText={(e) => setcopuntxt(e)}
        />
        <TouchableOpacity
          onPress={() => {
            if (copuntxt == "FF-100") {
              console.log(copuntxt);
              press(80);
            } else {
              Alert.alert("Invalid Coupon Code...");
            }
          }}
        >
          <Text
            style={{
              color: "red",
              fontFamily: "BalooTammudu2_400Regular",
              fontSize: 17,
              paddingRight: 23,
            }}
          >
            Apply
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View>
          <Text style={styles.mainhead}>Fresh fuery ₹100 off</Text>
          <Text
            style={{
              fontFamily: "BalooTammudu2_400Regular",
            }}
          >
            Get up to ₹100 off on first Order.
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                press(80);
              }}
              style={{
                backgroundColor: "#dee2fc",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                }}
              >
                FF-100
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                press(80);
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontFamily: "BalooTammudu2_400Regular",
                  paddingHorizontal: 14,
                  fontSize: 17,
                }}
              >
                Apply mow
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#f5f5f7",
    paddingHorizontal: 13,
    paddingVertical: 12,
    marginBottom: 22,
  },
  mainhead: {
    fontFamily: "BalsamiqSans_700Bold",
    fontSize: 18,
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
});
