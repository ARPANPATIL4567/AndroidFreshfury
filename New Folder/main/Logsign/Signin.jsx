import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import React, { useState } from "react";
import axios from "axios";
import { StackActions } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const input = {
  width: "100%",
  fontSize: 14,
  borderRadius: 9,
  padding: 7,
  paddingHorizontal: 14,
  backgroundColor: "#f5f5f7",
};
export default function Signin({ navigation }) {
  const hostnode = useSelector((state) => state.hostnode);

  const [bkcolor1, setbkcolor1] = useState("#bcbcbc");
  const [bkcolor2, setbkcolor2] = useState("#bcbcbc");
  const [bkcolor3, setbkcolor3] = useState("#bcbcbc");
  const [bkcolor4, setbkcolor4] = useState("#bcbcbc");
  const [bkcolor5, setbkcolor5] = useState("#bcbcbc");

  const [Name, setName] = React.useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [pass1, setpass1] = useState("111111");
  const [pass2, setpass2] = useState("111111");

  const [Msg, setMsg] = useState(null);

  const [checked, setChecked] = React.useState(false);
  const [BtnDisable, setBtnDisable] = useState(true);
  const [isloaded, setisloaded] = useState(false);

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

  const Signin = async () => {
    setMsg(null);
    let a;
    if (Name === "" || Email === "" || Mobile === "" || pass1 === "") {
      setMsg("All field are required.");
    } else if (!Email.includes("@gmail.com")) {
      setMsg("Enter Correct email address.");
    } else if (Mobile.toString().length < 10) {
      setMsg("Enter correct Mobile No.");
    } else if (pass1 != pass2) {
      setMsg("Passwords not match.");
    } else if (pass1.length < 6) {
      setMsg("Password must be at last 6 carecter long.");
    } else {
      setisloaded(true);
      setChecked(false);
      setBtnDisable(true);
      console.log("sending");
      a = "email=" + Email;
      let config = {
        method: "post",
        url: hostnode + "ADDaccount1?" + a,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        //data: "givSearchproducts=" + Query,data
      };
      await axios(config).then((res) => {
        console.log(res.data);
        setisloaded(false);
        if (res.data === "found") {
          setMsg("Account already exist with this email");
        } else if (res.data === "otp send sucess") {
          submit();
        }
      });
    }
  };

  return (
    <View style={style.main}>
      {isloaded ? (
        <View style={style.loadview}>
          <ActivityIndicator size="large" color="#27cec8" />
        </View>
      ) : (
        <View style={style.mainview}>
          <Image
            style={style.img}
            source={require("../../assets/ffffff.png")}
          />
          <Text style={style.signin}>Sign in</Text>
          <Text style={style.signinBottom}>Create an Account to continue!</Text>
          <View style={style.hr}></View>
          {Msg != null && <Text style={style.Err}>{Msg}</Text>}
          <ScrollView
            style={{
              width: "100%",
              paddingHorizontal: 45,
            }}
          >
            <View
              style={{
                elevation: 5,
                shadowColor: "#black",
              }}
            >
              <Text style={style.inptoptext}>Full Name</Text>
              <TextInput
                style={{ ...input, borderColor: bkcolor1 }}
                onChangeText={(e) => setName(e)}
                value={Name}
              />
            </View>
            <Text style={style.inptoptext}>Email</Text>
            <TextInput
              style={{ ...input, borderColor: bkcolor2 }}
              onChangeText={(e) => setEmail(e)}
              value={Email}
            />
            <Text style={style.inptoptext}>Mobile No.</Text>
            <TextInput
              style={{ ...input, borderColor: bkcolor3 }}
              keyboardType="numeric"
              onChangeText={(e) => setMobile(e)}
              value={Mobile}
            />
            <View style={style.check}>
              <Checkbox
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                  setBtnDisable(!BtnDisable);
                }}
                color={"#27cec8"}
                uncheckColor={"red"}
              />
              <Text style={style.aggry}>
                Aggery to all terms and condition.
              </Text>
            </View>
            <TouchableOpacity
              style={[
                style.button,
                { backgroundColor: checked ? "#27cec8" : "#8df7f4" },
              ]}
              disabled={BtnDisable}
              onPress={() => Signin()}
            >
              <Text style={style.signtxt}>Sign up</Text>
            </TouchableOpacity>
            <Text style={style.login}>
              Already have an Account?
              <Text
                style={style.loginhear}
                onPress={() => {
                  console.log("login");
                  navigation.navigate("Login");
                }}
              >
                {" "}
                login hear.
              </Text>
            </Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
  },
  img: {
    marginTop: 78,
    width: 70,
    height: 70,
  },
  mainview: {
    flex: 1,
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
  inputs: {
    width: "80%",
    borderWidth: 1,
    fontSize: 14,
    borderRadius: 3,
    padding: 7,
    marginTop: 10,
    paddingHorizontal: 14,
    backgroundColor: "#f5f5f7",
  },
  check: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  aggry: {
    fontFamily: "BalsamiqSans_400Regular",
  },

  button: {
    display: "flex",
    backgroundColor: "#27cec8",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 9,
    marginTop: 13,
    color: "white",
    marginBottom: 12,
  },
  signtxt: {
    fontFamily: "BalsamiqSans_400Regular",
    fontWeight: "bold",
    color: "white",
  },
  loadview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    marginBottom: 44,
    textAlign: "center",
    fontFamily: "BalsamiqSans_400Regular",
  },
  loginhear: {
    color: "#27cec8",
  },
});
