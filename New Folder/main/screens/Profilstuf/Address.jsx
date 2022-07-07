import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AllHeader from "../AllHeader";

export default function Address({ navigation }) {
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
  const [btntxt, setbtntxt] = useState("Add Address");

  const [modalVisible, setModalVisible] = useState(false);

  const Modelview = () => {
    return (
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          console.log("exr");
          navigation.goBack();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText1}>Success</Text>
            <Text style={styles.modalText2}>Address Successfuly Updated.</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.textStyle}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const onpress = async () => {
    setNameerr(null);
    setMobileerr(null);
    setpincoderr(null);
    setCityerr(null);
    setFullAddresserr(null);
    setRoadnameerr(null);
    if (Name == "") {
      setNameerr("Input Field Required");
    } else if (Mobno.length < 10) {
      setMobileerr("Invalid Mobile No.");
    } else if (PinCod.length < 6) {
      setpincoderr("Enter valid Pincode");
    } else if (City.length < 3) {
      setCityerr("Describe Your City correctly");
    } else if (Fulladdress.length < 10) {
      setFullAddresserr("Describe Your Address Correctly");
    } else if (RoadName.length < 10) {
      setRoadnameerr("Describe Your Area Correctly");
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
        setModalVisible(true);
      } catch (e) {
        console.log(e);
      }
    }
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
        setbtntxt("Edit Address");
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
      <Modelview />
      <AllHeader navigation={navigation} name="Address" />
      <ScrollView
        style={{
          paddingHorizontal: 14,
        }}
      >
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
          <Text style={styles.Btntxt}>Add Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationbtn: {
    marginTop: 33,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5491f5",
    marginHorizontal: 54,
    justifyContent: "center",
    height: 53,
    borderRadius: 26,
  },
  loctxt: {
    color: "white",
    fontFamily: "BalsamiqSans_700Bold",
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
    height: 192,
    backgroundColor: "gray",
  },
});
