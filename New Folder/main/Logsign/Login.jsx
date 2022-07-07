import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { StackActions } from "@react-navigation/native";

const Login = ({ navigation }) => {
  const hostnode = useSelector((state) => state.hostnode);

  const [Email, setEmail] = useState("");
  const [BtnDisable, setBtnDisable] = useState(false);
  const [Msg, setMsg] = useState(null);

  const setItem = async (data1) => {
    console.log("data1", data1);
    const data = JSON.stringify({
      Name: data1[0].name,
      Email: data1[0].email,
      Mobile: data1[0].mobno,
      pass1: data1[0].passwod,
      id: data1[0].id,
    });
    console.log(data);
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
    let a = "&email=" + Email + "&otp=" + motp;
    let config = {
      method: "post",
      url: hostnode + "sendloginuserdata?" + a,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    await axios(config).then((res) => {
      if (res.data == "otp not match") {
      } else {
        setItem(res.data).then(() => {
          console.log("redirecting home");
          navigation.dispatch(StackActions.replace("Home"));
        });
      }
    });
  };

  const Loginpress = async () => {
    let a;
    console.log("login");
    if (!Email.includes("@gmail.com")) {
      setMsg("Enter Correct email address.");
      console.log("incorect email");
    } else {
      setBtnDisable(true);

      console.log("sending");
      a = "email=" + Email;

      let config = {
        method: "post",
        url: hostnode + "sendotpforlogin?" + a,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      await axios(config)
        .then((res) => {
          console.log(res.data);
          setBtnDisable(false);
          if (res.data == "otpsent") {
            submit();
          } else if (res.data == "not found") {
            setMsg("No account found with this email");
          }
        })
        .catch((err) => {
          console.log(err);
          setBtnDisable(false);
        });
    }
  };
  return (
    <View style={styles.main}>
      <Text style={styles.signin}>Login</Text>
      <Text style={styles.signinBottom}>Login to existing account</Text>
      <View style={styles.hr}></View>
      {Msg != null && <Text style={styles.Err}>{Msg}</Text>}
      <Text style={styles.inptoptext}>Email:</Text>
      <TextInput
        style={styles.Input}
        onChangeText={(e) => setEmail(e)}
        value={Email}
        placeholder={"Enter Your Email Id"}
      />
      <TouchableOpacity
        style={[styles.button]}
        disabled={BtnDisable}
        onPress={() => Loginpress()}
      >
        <Text style={styles.signtxt}>Send Otp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  signin: {
    marginTop: 14,
    fontFamily: "BalsamiqSans_700Bold",
    fontSize: 24,
  },
  signinBottom: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "#93979a",
  },
  hr: {
    width: 48,
    height: 2,
    borderRadius: 8,
    marginTop: 7,
    backgroundColor: "#27cec8",
    marginBottom: 20,
  },
  Err: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "#f96363",
    backgroundColor: "#fcdede",
    width: "70%",
    paddingVertical: 7,
    textAlign: "center",
    borderRadius: 10,
  },
  inptoptext: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "#93979a",
    paddingTop: 10,
    paddingBottom: 6,
  },
  Input: {
    width: "80%",
    fontSize: 14,
    borderRadius: 9,
    padding: 7,
    paddingHorizontal: 24,
    backgroundColor: "#f5f5f7",
  },
  button: {
    width: "80%",
    display: "flex",
    backgroundColor: "#27cec8",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 9,
    marginTop: 33,
    color: "white",
  },
  signtxt: {
    fontFamily: "BalsamiqSans_400Regular",
    fontWeight: "bold",
    color: "white",
  },
});
