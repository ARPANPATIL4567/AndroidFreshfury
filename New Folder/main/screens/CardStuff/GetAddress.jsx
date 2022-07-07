import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllHeader from "../AllHeader";
import React, { useState, useEffect } from "react";
import { StackActions } from "@react-navigation/native";

const GetAddress = ({ route, navigation }) => {
  const [Name, setName] = useState("");
  const [Mobno, setMobno] = useState("");
  const [AltMono, setAltMono] = useState("");
  const [PinCod, setPinCod] = useState("");
  const [City, setCity] = useState("");
  const [Fulladdress, setFulladdress] = useState("");
  const [RoadName, setRoadName] = useState("");

  const [Nameerr, setNameerr] = useState(null);
  const [Mobileerr, setMobileerr] = useState(null);
  const [pincoderr, setpincoderr] = useState(null);
  const [Cityerr, setCityerr] = useState(null);
  const [FullAddresserr, setFullAddresserr] = useState(null);
  const [Roadnameerr, setRoadnameerr] = useState(null);

  const onpress = async () => {
    setNameerr(null);
    setMobileerr(null);
    setpincoderr(null);
    setCityerr(null);
    setFullAddresserr(null);
    setRoadnameerr(null);
    if (Name == "") {
      setNameerr("Input Field Required*");
    } else if (Mobno.length < 10) {
      setMobileerr("Invalid Mobile No.*");
    } else if (PinCod.length < 6) {
      setpincoderr("Enter valid Pincode*");
    } else if (City.length < 3) {
      setCityerr("Describe Your City correctly*");
    } else if (Fulladdress.length < 10) {
      setFullAddresserr("Describe Your Address Correctly*");
    } else if (RoadName.length < 10) {
      setRoadnameerr("Describe Your Area Correctly*");
    } else {
      const Address = {
        Name,
        Mobno,
        AltMono,
        PinCod,
        City,
        Fulladdress,
        RoadName,
      };
      try {
        await AsyncStorage.setItem("Address", JSON.stringify(Address));
        console.log("Address inserted ", Address);
      } catch (e) {
        console.log(e);
      }
      navigation.navigate("Billing", {
        FoodData: route.params,
        Name,
        Mobno,
        AltMono,
        PinCod,
        City,
        Fulladdress,
        RoadName,
      });
    }
  };

  const currentloc = () => {
    Alert.alert(
      "Google Map Comming Soon",
      "Google Map Still in devlopment process"
    );
  };
  const getAddressFromLocal = async () => {
    let addr;
    try {
      addr = JSON.parse(await AsyncStorage.getItem("Address"));
      console.log(addr);
      if (addr != null) {
        setName(addr.Name);
        setMobno(addr.Mobno);
        setAltMono(addr.AltMono);
        setPinCod(addr.PinCod);
        setCity(addr.City);
        setFulladdress(addr.Fulladdress);
        setRoadName(addr.RoadName);
        console.log("data added");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAddressFromLocal();
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <AllHeader navigation={navigation} name="Address" />
      <ScrollView
        style={{
          paddingHorizontal: 14,
        }}
      >
        <View style={styles.currentProcessbar}>
          <Image
            source={require("../../../assets/p1.png")}
            style={{ width: 295, height: 46 }}
          />
        </View>
        <Text style={styles.note}>
          Order can only be ascept from Arera colony bhopal and its 5km radius.
        </Text>
        <TouchableOpacity style={styles.locationbtn} onPress={currentloc}>
          <Ionicons name="md-location-outline" color={"white"} size={32} />
          <Text style={styles.loctxt}>Use Current Location</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "BalsamiqSans_700Bold",
            textAlign: "center",
            fontSize: 23,
          }}
        >
          or
        </Text>
        <View style={styles.inpback}>
          <Text style={styles.inptoptext}>Full Name</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(e) => setName(e)}
            value={Name}
          />
          {Nameerr != null && <Text style={styles.errormsgbox}>{Nameerr}</Text>}
          <Text style={styles.inptoptext}>Mobile No</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(e) => setMobno(e)}
            value={Mobno}
            keyboardType="numeric"
          />
          {Mobileerr != null && (
            <Text style={styles.errormsgbox}>{Mobileerr}</Text>
          )}
          <Text style={styles.inptoptext}>Alternate Mobile No(Optional)</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(e) => setAltMono(e)}
            value={AltMono}
            keyboardType="numeric"
          />
          <Text style={styles.inptoptext}>Pin Code(Required)</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(e) => setPinCod(e)}
            value={PinCod}
            keyboardType="numeric"
          />
          {pincoderr != null && (
            <Text style={styles.errormsgbox}>{pincoderr}</Text>
          )}
          <Text style={styles.inptoptext}>City(Required)</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(e) => setCity(e)}
            value={City}
          />
          {Cityerr != null && <Text style={styles.errormsgbox}>{Cityerr}</Text>}
          <Text style={styles.inptoptext}>
            Full Address,Billing Name(Required)
          </Text>
          <TextInput
            style={styles.Input}
            onChangeText={(e) => setFulladdress(e)}
            value={Fulladdress}
          />
          {FullAddresserr != null && (
            <Text style={styles.errormsgbox}>{FullAddresserr}</Text>
          )}
          <Text style={styles.inptoptext}>Road Name,Area,Colony(Required)</Text>
          <TextInput
            style={styles.Input}
            onChangeText={(e) => setRoadName(e)}
            value={RoadName}
          />
          {Roadnameerr != null && (
            <Text style={styles.errormsgbox}>{Roadnameerr}</Text>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
        }}
      >
        <TouchableOpacity style={styles.Btn} onPress={onpress}>
          <Text style={styles.Btntxt}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetAddress;

const styles = StyleSheet.create({
  locationbtn: {
    marginTop: 33,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a73e8",
    marginHorizontal: 54,
    justifyContent: "center",
    height: 53,
    borderRadius: 26,
  },
  loctxt: {
    color: "white",
    fontFamily: "BalsamiqSans_700Bold",
  },
  currentProcessbar: {
    backgroundColor: "#f5f5f7",
    width: "100%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 13,
  },
  inpback: {
    backgroundColor: "#f5f5f7",
    marginTop: 12,
    paddingHorizontal: 9,
    borderRadius: 10,
    paddingBottom: 16,
    marginBottom: 190,
  },
  Inputsdiv: {
    paddingHorizontal: 10,
  },
  Input: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "white",
  },
  inptoptext: {
    fontFamily: "BalsamiqSans_700Bold",
    color: "#93979a",
    paddingTop: 10,
    paddingBottom: 3,
    marginTop: 6,
    paddingLeft: 5,
    fontSize: 12,
  },
  Btn: {
    backgroundColor: "#27cec8",
    justifyContent: "center",
    alignItems: "center",
    height: 57,
    borderRadius: 10,
    marginHorizontal: 13,
    marginTop: 8,
    marginBottom: 97,
  },
  Btntxt: {
    color: "white",
    fontFamily: "BalsamiqSans_700Bold",
  },
  errormsgbox: {
    fontFamily: "BalooTammudu2_400Regular",
    color: "red",
    paddingLeft: 5,
    fontSize: 12,
  },
  note: {
    textAlign: "justify",
    fontSize: 15,
    backgroundColor: "#fcf5d9",
    padding: 13,
    borderRadius: 13,
    color: "gray",
    fontFamily: "BalsamiqSans_400Regular",
    marginTop: 13,
  },
});
