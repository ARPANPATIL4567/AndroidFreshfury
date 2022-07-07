import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ADD_mycart_DATA } from "../../redux/act_red";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";

const { width: screenWidth } = Dimensions.get("window");

const styles2 = StyleSheet.create({
  Categorymainview: {
    backgroundColor: "#f5f5f7",
    marginHorizontal: 15,
    borderRadius: 17,
    display: "flex",
    alignItems: "center",
  },
  foodimg: {
    width: 67,
    height: 67,
    marginHorizontal: 23,
    marginTop: 10,
    borderRadius: 66,
  },
  name: {
    textAlign: "center",
    fontFamily: "BalsamiqSans_700Bold",
  },
  content: {
    width: "70%",
    textAlign: "center",
    color: "gray",
    fontFamily: "BalsamiqSans_400Regular",
    fontSize: 12,
    paddingBottom: 6,
  },
});

const data = [
  {
    source: "z1c.jpeg",
  },
  {
    source: "z2c.jpeg",
  },

  {
    source: "z3c.jpeg",
  },
];

function CarouselItem({ item }) {
  console.log(item);
  return (
    <Pressable
      style={{
        marginVertical: 12,
      }}
      onPress={() => {
        console.log("touch");
      }}
    >
      <View style={styles.item}>
        <Image
          source={{
            uri:
              "http://82.180.163.49/restarunt/Admin/FoodImages/" + item.source,
          }}
          style={{
            width: "100%",
            height: 140,
          }}
        />
      </View>
    </Pressable>
  );
}
const { width } = Dimensions.get("window");
const settings = {
  sliderWidth: width,
  sliderHeight: width,
  itemWidth: width - 60,
  data: data,
  renderItem: CarouselItem,
  hasParallaxImages: false,
};

export default function Homescreen({ navigation }) {
  const [Datalist, setDatalist] = useState(null);
  const [Datalistreverse, setDatalistreverse] = useState(null);
  const hostphp = useSelector((state) => state.hostphp);
  const dispatch = useDispatch();

  const category = [
    {
      id: 1,
      Name: "Chicken",
      imag: require("../../assets/vvvvvv.jpg"),
      avalable: true,
      content: "Available ",
    },
    {
      id: 2,
      Name: "Fish",
      imag: require("../../assets/vvvvvv.jpg"),
      avalable: false,
      content: "Comming Soon",
    },
    {
      id: 3,
      Name: "Mutton",
      imag: require("../../assets/vvvvvv.jpg"),
      avalable: false,
      content: "Comming Soon",
    },
    {
      id: 4,
      Name: "Kadaknath",
      imag: require("../../assets/vvvvvv.jpg"),
      avalable: false,
      content: "Comming Soon",
    },
    {
      id: 5,
      Name: "Desi Chicken",
      imag: require("../../assets/vvvvvv.jpg"),
      avalable: false,
      content: "Comming Soon",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.avalable) {
            navigation.navigate("Available", { Data: Datalist });
          }
        }}
        style={styles2.Categorymainview}
      >
        <Image
          source={require("../../assets/fire.png")}
          style={{
            width: 20,
            height: 20,
            position: "absolute",
            left: 90,
            top: 7,
          }}
        />
        <Image style={styles2.foodimg} source={item.imag} />
        <Text style={styles2.name}>{item.Name}</Text>
        <Text style={styles2.content}>{item.content}</Text>
      </TouchableOpacity>
    );
  };
  const renderfood = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.maindiv}
        onPress={() => {
          navigation.navigate("Fooddetail", { data: item, Datalist: Datalist });
          console.log(item);
        }}
      >
        <Image
          style={styles.imag}
          source={{ uri: hostphp + "restarunt/Admin/" + item[4] }}
        />
        <Text numberOfLines={2} style={styles.h1}>
          {item[1]}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 270,
            paddingTop: 8,
            paddingBottom: 12,
            width: "90%",
          }}
        >
          <Text style={styles.price}>
            ₹{item[3]}/-
            <Text style={styles.off}>(30%off)</Text>
          </Text>
          <View style={styles.ratdiv}>
            <Ionicons
              name="star"
              size={12}
              style={{
                color: "white",
                paddingTop: 1,
              }}
            />
            <Text style={styles.rattxt}>{item[5]}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const Catogery = () => {
    return (
      <View>
        <Text style={styles.Categoiry}>Category's</Text>
        <FlatList
          data={category}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(a) => a.id}
        />
        <Carousel
          layout={"default"}
          {...settings}
          autoplay={true}
          loop={true}
        />
        <Text style={styles.Categoiry}>Food Items</Text>
      </View>
    );
  };
  const Bottomspace = () => {
    return <View style={styles.extrabottomspace}></View>;
  };
  const getmycart = async () => {
    let arr = [];
    try {
      arr = await AsyncStorage.getItem("Cartitem");
    } catch (e) {
      console.log(e);
    }
    return arr;
  };

  const GetData = async () => {
    let config = {
      method: "post",
      url: hostphp + "restarunt/Admin/AddFooditems.php",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "GivFoodlist=" + "food",

      //data: "givSearchproducts=" + Query,data
    };
    await axios(config)
      .then((res) => {
        setDatalist(res.data);
        setDatalistreverse(res.data.reverse());
        console.log(res.data.reverse());
        getmycart().then((res) => {
          dispatch(ADD_mycart_DATA(res));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("1");
  useEffect(() => {
    console.log("2");
    GetData();
  }, []);

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Header navigation={navigation} />
      {Datalist == null ? (
        <View style={styles.loadview}>
          <ActivityIndicator size="large" color="#27cec8" />
        </View>
      ) : (
        <View>
          <FlatList
            data={Datalist}
            numColumns={2}
            renderItem={renderfood}
            keyExtractor={(a) => a[0]}
            ListHeaderComponent={<Catogery />}
            ListFooterComponent={Bottomspace}
          />
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
  Categoiry: {
    fontSize: 18,
    paddingBottom: 14,
    paddingLeft: 20,
    fontFamily: "BalsamiqSans_700Bold",
  },
  catogerytitle: {
    fontSize: 12,
    paddingLeft: 12,
    paddingTop: 6,
    flexGrow: 1,
    width: "70%",
    paddingRight: 4,
    fontFamily: "BalsamiqSans_400Regular",
  },
  title: {
    fontSize: 16,
    paddingLeft: 12,
    paddingTop: 6,
    flexGrow: 1,
    width: "70%",
    paddingRight: 4,
    fontFamily: "BalsamiqSans_400Regular",
  },
  maindiv: {
    backgroundColor: "#f5f5f7",
    alignItems: "center",
    marginBottom: 23,
    borderRadius: 16,
    marginHorizontal: "3%",
    width: "44%",
  },
  imag: {
    width: "95%",
    height: 80,
    marginTop: 7,
    borderRadius: 12,
  },
  h1: {
    fontFamily: "BalsamiqSans_400Regular",
    fontSize: 15,
    width: "90%",
    paddingTop: 4,
  },
  discription: {
    fontFamily: "BalsamiqSans_400Regular",
    color: "gray",
    paddingTop: 4,
    textAlign: "justify",
  },
  price: {
    color: "#27cec8",
    fontFamily: "BalsamiqSans_700Bold",
    fontSize: 12,
  },
  off: {
    fontSize: 9,
    color: "gray",
  },
  ratdiv: {
    backgroundColor: "#27cec8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    borderRadius: 5,
    paddingBottom: 2,
  },
  rattxt: {
    fontSize: 12,
    color: "white",
    fontFamily: "BalsamiqSans_700Bold",
  },
  extrabottomspace: {
    height: 150,
  },

  // cprucel
});
