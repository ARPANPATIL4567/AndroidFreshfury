import React from "react";
import {
  CardStyleInterpolators,
  TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabbutton from "./Tabbutton";
import Splash from "./Splash";
import Search from "./screens/Search";
import Address from "./screens/Profilstuf/Address";
import Appinfo from "./screens/Profilstuf/Appinfo";
import Customersupport from "./screens/Profilstuf/Customersupport";
import Devcontect from "./screens/Profilstuf/Devcontect";
import Fooddetail from "./screens/HomeStuf/Fooddetail";
import Cart from "./screens/Cart";
import GetAddress from "./screens/CardStuff/GetAddress";
import Billing from "./screens/CardStuff/Billing";
import Card from "./screens/CardStuff/Card";
import Otp from "./Logsign/Otp";
import Signin from "./Logsign/Signin";
import Trackscreen from "./screens/Trackscreen";
import Cancelorder from "./screens/Cancelorder";
import Available from "./screens/Available";
import Coupon from "./screens/CardStuff/Coupon";
import Login from "./Logsign/Login";
import Loginotp from "./Logsign/Loginotp";

const Stack = createNativeStackNavigator();

export default function Mainnavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      >
        <Stack.Screen name="Splash" component={Splash} />

        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Loginotp" component={Loginotp} />
        <Stack.Screen name="Home" component={Tabbutton} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Available" component={Available} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Appinfo" component={Appinfo} />
        <Stack.Screen name="Customersupport" component={Customersupport} />
        <Stack.Screen name="Devcontect" component={Devcontect} />
        <Stack.Screen name="Fooddetail" component={Fooddetail} />
        <Stack.Screen name="GetAddress" component={GetAddress} />
        <Stack.Screen name="Billing" component={Billing} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="Trackscreen" component={Trackscreen} />
        <Stack.Screen name="Cancelorder" component={Cancelorder} />
        <Stack.Screen name="Coupon" component={Coupon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
