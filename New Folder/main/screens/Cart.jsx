import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Settotalprice } from "../../redux/act_red";
import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import AllHeader from "./AllHeader";
import { useFocusEffect } from "@react-navigation/native";

const Incdec = (props) => {
  const add = () => {
    props.addstate();
  };
  const sub = () => {
    if (props.state.count > 1) {
      props.substate();
    }
  };
  return (
    <View style={styles.Incdecmainbox}>
      <TouchableOpacity onPress={sub} style={styles.Incdecbox}>
        <Text style={styles.Incdectxt}>-</Text>
      </TouchableOpacity>
      <View style={[styles.Incdecbox, styles.Incdecno]}>
        <Text style={styles.Incdectxt}>{props.state.count}</Text>
      </View>
      <TouchableOpacity onPress={add} style={styles.Incdecbox}>
        <Text style={styles.Incdectxt}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Cart({ navigation }) {
  const hostphp = useSelector((state) => state.hostphp);
  const hostnode = useSelector((state) => state.hostnode);
  const [Total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [Data, setData] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      console.log("Function Call on TAb change");
      dispatch(Settotalprice(false));
    }, [])
  );

  const RenderCartlists = ({ item }) => {
    const cut = async () => {
      let arr = [...Data];
      let index = arr.indexOf(item);
      if (index !== -1) {
        arr.splice(index, 1);
        setData(arr);
        let asyncarr = [];
        console.log(arr.length);
        for (let i = 0; i < arr.length; i++) {
          asyncarr.push(arr[i].id);
          console.log(asyncarr);
        }
        try {
          await AsyncStorage.setItem("Cartitem", JSON.stringify(asyncarr));
          console.log("Storage inserted " + JSON.stringify(asyncarr));

          let price = 0;
          for (let i = 0; i < arr.length; i++) {
            price = price + arr[i].price;
          }
          setTotal(price);
        } catch (e) {
          console.log(e);
        }
      }
    };
    const add = () => {
      let aa = [...Data];
      for (let i = 0; i < aa.length; i++) {
        if (aa[i].id == item.id) {
          aa[i].count++;
          for (let j = 0; j <= aa[i].count; j++) {
            aa[i].price = aa[i].priceof1 * aa[i].count;
          }
          break;
        }
      }
      setData(aa);
      let price = 0;
      for (let i = 0; i < aa.length; i++) {
        price = price + aa[i].price;
      }
      setTotal(price);
      console.log("add");
    };
    const sub = () => {
      let aa = [...Data];
      for (let i = 0; i < aa.length; i++) {
        if (aa[i].id == item.id) {
          aa[i].count--;
          for (let j = 0; j <= aa[i].count; j++) {
            aa[i].price = aa[i].priceof1 * aa[i].count;
          }
          break;
        }
      }
      setData(aa);
      let price = 0;
      for (let i = 0; i < aa.length; i++) {
        price = price + aa[i].price;
      }
      setTotal(price);
      setData(aa);
      console.log("sub");
    };
    return (
      <View style={styles.listmainbox}>
        <Image
          style={styles.foodtinyLogo}
          source={{
            uri: hostphp + "restarunt/Admin/" + item.image,
          }}
        />

        <View style={styles.rightlistbox}>
          <View style={styles.flxrow}>
            <Text style={styles.mainlistTxt} numberOfLines={1}>
              {item.foodname}
            </Text>
            <TouchableOpacity style={styles.listcut} onPress={cut}>
              <MaterialCommunityIcons
                name="tray-remove"
                size={21}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.listdisc} numberOfLines={1}>
            {item.fooddiscript}
          </Text>
          <Text style={styles.listrupie} numberOfLines={1}>
            ₹{item.price}/-
            <Text style={styles.Cutpric}>(30%off)</Text>
          </Text>
          <View style={styles.incdecdiv}>
            <Incdec state={item} addstate={add} substate={sub} />
          </View>
        </View>
      </View>
    );
  };

  const Bottomspace = () => {
    return <View style={styles.extrabottomspace}></View>;
  };

  const getData = async () => {
    let cart;
    try {
      cart = await AsyncStorage.getItem("Cartitem");
      console.log("cart array " + JSON.stringify(cart));

      let config = {
        method: "post",
        url: hostnode + "GivemycartDetail?array=" + cart,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      await axios(config).then((res) => {
        if (res.data.errno || res.data == "") {
          console.log("err");
          setData("err");
        } else {
          let aa = [...res.data];
          for (let i = 0; i < res.data.length; i++) {
            aa[i].count = 1;
            aa[i].priceof1 = aa[i].price;
          }
          setData(aa);
          let price = 0;
          for (let i = 0; i < aa.length; i++) {
            price = price + aa[i].price;
          }
          setTotal(price);
        }
      });
    } catch (e) {
      console.log(e);
      setData("err");
    }
  };

  const OrderCLICK = () => {
    let arr = [];
    for (let i = 0; i < Data.length; i++) {
      let obj = {};
      obj.id = Data[i].id;
      obj.price = Data[i].price;
      obj.count = Data[i].count;
      arr.push(obj);
    }
    navigation.navigate("GetAddress", {
      Data: Data,
      Foodslist: arr,
      Total,
    });
  };

  useEffect(() => {
    console.log("loaded");
    getData();
  }, [0]);

  return Data == null ? (
    <View style={styles.loadview}>
      <ActivityIndicator size="large" color="#27cec8" />
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "white",
      }}
    >
      <View>
        <AllHeader navigation={navigation} name="My Cart" />
        {Data == "err" ? (
          <View style={styles.Emptymain}>
            <Image
              source={require("../../assets/empcart.png")}
              style={{
                width: 176,
                height: 170,
                marginRight: 33,
              }}
            />
            <Text style={styles.Emptytxt}>Cart is Empty</Text>
          </View>
        ) : (
          <View>
            <View style={styles.mainview}>
              <FlatList
                data={Data}
                showsVerticalScrollIndicator={false}
                renderItem={RenderCartlists}
                keyExtractor={(a) => a.id}
                ListFooterComponent={Bottomspace}
              />
            </View>
          </View>
        )}
      </View>
      {Data != "err" && Total != 0 && (
        <View style={styles.Footer}>
          <Text style={styles.Footerrupie}>Total-₹{Total}/-</Text>
          <TouchableOpacity style={styles.Footerbtn} onPress={OrderCLICK}>
            <Text style={styles.Footerbtntxt}>Order Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  loadview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Incdecmainbox: {
    width: 90,
    borderRadius: 3,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgb(204, 204, 204)",
    position: "absolute",
    bottom: 1,
  },
  Incdecbox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 2,
  },
  Incdectxt: {
    fontFamily: "BalsamiqSans_700Bold",
    fontSize: 15,
  },
  Incdecno: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgb(204, 204, 204)",
    backgroundColor: "white",
  },
  mainview: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  listmainbox: {
    width: "100%",
    height: 107,
    backgroundColor: "#f5f5f7",
    marginBottom: 13,
    borderRadius: 13,
    flexDirection: "row",
    paddingVertical: 13,
  },
  foodtinyLogo: {
    width: "30%",
    marginHorizontal: 5,
    marginLeft: 12,
    borderRadius: 10,
  },
  rightlistbox: {
    width: "65%",
  },
  mainlistTxt: {
    fontFamily: "BalsamiqSans_700Bold",
    width: "80%",
    fontSize: 15,
    paddingLeft: 6,
  },
  flxrow: {
    flexDirection: "row",
  },
  listcut: {
    flexGrow: 1,
    height: 23,
    position: "relative",
    bottom: 7,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  listdisc: {
    fontFamily: "BalsamiqSans_400Regular",
    paddingLeft: 6,
    color: "gray",
  },
  listrupie: {
    fontFamily: "BalsamiqSans_400Regular",
    paddingLeft: 6,
    color: "#27cec8",
    paddingTop: 4,
  },
  incdecdiv: {
    alignItems: "flex-end",
    marginRight: 13,
  },
  extrabottomspace: {
    height: 230,
  },
  Footer: {
    backgroundColor: "white",
    height: 64,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "100%",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Footerrupie: {
    fontFamily: "BalsamiqSans_700Bold",
    fontSize: 20,
    color: "#27cec8",
    paddingLeft: 14,
  },
  Footerbtn: {
    height: "100%",
    width: "55%",
    backgroundColor: "#27cec8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Footerbtntxt: {
    fontFamily: "BalsamiqSans_700Bold",
    color: "white",
    fontSize: 20,
  },
  Emptymain: {
    marginTop: 156,
    alignItems: "center",
  },
  Emptytxt: {
    fontSize: 25,
    fontFamily: "BalsamiqSans_400Regular",
  },
  vr: {
    backgroundColor: "gray",
    width: 35,
    height: 1,
    position: "absolute",
    left: 50,
    bottom: 21,
  },
  Cutpric: {
    color: "gray",
    fontSize: 10,
  },
});
