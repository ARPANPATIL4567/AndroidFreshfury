import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import AllHeader from "./AllHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import RadioButtonRN from "radio-buttons-react-native";
import { ActivityIndicator } from "react-native-paper";
import { useState } from "react";

const Cancelorder = ({ route, navigation }) => {
  const hostphp = useSelector((state) => state.hostphp);
  const hostnode = useSelector((state) => state.hostnode);
  const [isloading, setisloading] = useState(false);
  const Data = route.params;
  console.log(Data);
  const reson = [
    {
      label: "I have changed my mind",
    },
    {
      label: "Change Order",
    },
    {
      label: "Delevery time is To long",
    },
    {
      label: "Payment Method Issue",
    },
    {
      label: "Deside For Alternative product",
    },
    {
      label: "Other",
    },
  ];

  const cancelpress = async () => {
    setisloading(true);
    let config = {
      method: "post",
      url: hostnode + "Cancelorder",
      headers: {
        "Content-Type": "application/json",
      },
      data: { id: Data.Data.id },
    };
    await axios(config).then((res) => {
      if (res.data.affectedRows == 1) {
        navigation.navigate("Order");
        console.log(Data.Data.id);
      }
    });
    setisloading(false);
  };

  return (
    <View>
      <AllHeader navigation={navigation} name={"Cancel order"} />
      <View
        style={{
          height: "100%",
          backgroundColor: "white",
          paddingHorizontal: 22,
        }}
      >
        <Text style={styles.lable}>Reason for canceling order?</Text>
        <RadioButtonRN
          animationTypes={["pulse", "rotate"]}
          data={reson}
          circleSize={12}
          initial={1}
          selectedBtn={(e) => {
            if (e.name === "card") {
            } else if (e.name === "casondel") {
            }
          }}
        />
        <TouchableOpacity
          disabled={isloading}
          style={styles.buttoncancel}
          onPress={cancelpress}
        >
          <Text style={{ color: "white", fontFamily: "BalsamiqSans_700Bold" }}>
            Cancell Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cancelorder;

const styles = StyleSheet.create({
  lable: {
    fontSize: 24,
    marginTop: 22,
    fontFamily: "BalooTammudu2_700Bold",
  },
  buttoncancel: {
    width: "100%",
    backgroundColor: "#27cec8",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 13,
    marginTop: 13,
    marginTop: 13,
  },
});
