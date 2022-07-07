import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from "./screens/Homescreen";
import Notificanscreen from "./screens/Notificanscreen";
import Orderscreen from "./screens/Orderscreen";
import Profilescreen from "./screens/Profilescreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabbutton({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: "#27cec8",
        tabBarStyle: {
          height: 58,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 6,
          fontFamily: "BalsamiqSans_400Regular",
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Homescreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused)
              return <Ionicons name="home" color={color} size={32} />;
            return <Ionicons name="home-outline" color={color} size={32} />;
          },
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notificanscreen}
        options={{
          tabBarLabel: "Notification",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused)
              return (
                <Ionicons name="notifications-circle" color={color} size={32} />
              );
            return (
              <Ionicons
                name="notifications-circle-outline"
                color={color}
                size={35}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Order"
        component={Orderscreen}
        options={{
          tabBarLabel: "My Orders",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused)
              return <Ionicons name="fast-food" color={color} size={32} />;
            return (
              <Ionicons name="fast-food-outline" color={color} size={32} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profilescreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => {
            if (focused)
              return <Ionicons name="person-circle" color={color} size={32} />;
            return (
              <Ionicons name="person-circle-outline" color={color} size={32} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
