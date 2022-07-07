import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Otp({ route, navigation }) {
  const hostnode = useSelector((state) => state.hostnode);
  const { Name, Email, Mobile, pass1 } = route.params;
  const [isloaded, setisloaded] = useState(false);

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();

  const [OtoNo1, setOto1No] = useState(null);
  const [OtoNo2, setOto2No] = useState(null);
  const [OtoNo3, setOto3No] = useState(null);
  const [OtoNo4, setOto4No] = useState(null);

  const setItem = async (id) => {
    const data = JSON.stringify({ Name, Email, Mobile, pass1, id });
    try {
      await AsyncStorage.setItem("Data", data);
      console.log("Storage inserted");
    } catch (e) {
      console.log("err inserting");
    }
  };

  const submit = async () => {
    var motp = 8026;
    console.log("submit otp :" + motp);
    let a =
      "&email=" +
      Email +
      "&name=" +
      Name +
      "&mobno=" +
      Mobile +
      "&pass=" +
      pass1 +
      "&otp=" +
      motp;
    let config = {
      method: "post",
      url: hostnode + "Addacount2?" + a,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    await axios(config).then((res) => {
      console.log(res.data);
      if (res.data.affectedRows == 1) {
        setItem(res.data.insertId).then(() => {
          console.log("redirecting home");
          navigation.dispatch(StackActions.replace("Home"));
        });
      }
    });
  };
  var Otp;
  useEffect(() => {
    submit();
  }, []);

  return (
    <View style={styles.mainload}>
      <View style={styles.main}>
        <MaterialCommunityIcons
          name="email-receive"
          color={"#ff6c41"}
          style={styles.msg}
          size={66}
        />
        <Text style={styles.h1}>OTP Authentication</Text>
        <Text style={styles.txt}>An Authentication code has been sent to</Text>
        <Text style={styles.eml}>{Email}</Text>
        <View style={styles.inpview}>
          <TextInput
            ref={ref1}
            autoFocus
            onChangeText={(e) => {
              setOto1No(e);
              if (e != "") {
                ref2.current.focus();
              }
            }}
            keyboardType="numeric"
            style={styles.inp}
            maxLength={1}
          />
          <TextInput
            ref={ref2}
            maxLength={1}
            onChangeText={(e) => {
              setOto2No(e);
              if (e != "") {
                ref3.current.focus();
              } else if (e == "") {
                ref1.current.focus();
              }
            }}
            keyboardType="numeric"
            style={styles.inp}
          />
          <TextInput
            ref={ref3}
            maxLength={1}
            onChangeText={(e) => {
              setOto3No(e);
              if (e != "") {
                ref4.current.focus();
              } else if (e == "") {
                ref2.current.focus();
              }
            }}
            keyboardType="numeric"
            style={styles.inp}
          />
          <TextInput
            ref={ref4}
            maxLength={1}
            onChangeText={(e) => {
              setOto4No(e);
              if (e == "") {
                ref3.current.focus();
              }
            }}
            keyboardType="numeric"
            style={styles.inp}
          />
        </View>
        <TouchableOpacity
          disabled={isloaded}
          style={styles.btn}
          onPress={submit()}
        >
          {isloaded ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.signtxt}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainload: {
    flex: 1,
    backgroundColor: "white",
  },
  main: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 33,
  },
  loadview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  msg: {
    marginTop: 120,
  },
  h1: {
    fontFamily: "BalsamiqSans_400Regular",
    fontSize: 20,
    marginTop: 10,
  },
  txt: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "#7f8082",
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 33,
    textAlign: "center",
    width: "100%",
  },
  eml: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "#27cec8",
    marginTop: 5,
  },
  inpview: {
    width: "100%",
    height: 66,
    flexDirection: "row",
    marginTop: 22,
    alignItems: "center",
    justifyContent: "space-around",
  },
  inp: {
    fontSize: 22,
    textAlign: "center",
    width: 52,
    height: 52,
    backgroundColor: "#f5f5f7",
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#ebebeb",
  },
  btn: {
    backgroundColor: "#27cec8",
    marginTop: 45,
    height: 53,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    position: "absolute",
    bottom: 12,
  },
  dontrecv: {
    fontFamily: "Roboto_400Regular",
    color: "#7f8082",
    fontSize: 14,
    marginTop: 10,
    paddingHorizontal: 33,
    textAlign: "center",
    width: "100%",
  },
  signtxt: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "white",
  },
});
