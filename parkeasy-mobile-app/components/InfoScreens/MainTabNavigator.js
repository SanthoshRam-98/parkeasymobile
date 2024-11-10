import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserHomeScreen from "./UserHomeScreen";
import CarNav from "../NavBar/CarNavScreen";
import BookingNav from "../NavBar/BookingNavScreen";
import ProfileNav from "../NavBar/ProfileScreen";
import { Home, Car, Ticket, Users } from "lucide-react-native"; // Icon imports

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          // Icons for each tab
          if (route.name === "Home") return <Home color={color} size={size} />;
          if (route.name === "Cars") return <Car color={color} size={size} />;
          if (route.name === "Bookings")
            return <Ticket color={color} size={size} />;
          if (route.name === "Profile")
            return <Users color={color} size={size} />;
        },
        tabBarActiveTintColor: "#FFD60A", // Active state color
        tabBarInactiveTintColor: "#666", // Inactive state color
        tabBarStyle: {
          backgroundColor: "#111", // Background color of the tab bar
          paddingVertical: 8,
          borderTopWidth: 1,
          borderTopColor: "#222",
        },
      })}
    >
      <Tab.Screen name="Home" component={UserHomeScreen} />
      <Tab.Screen name="Cars" component={CarNav} />
      <Tab.Screen name="Bookings" component={BookingNav} />
      <Tab.Screen name="Profile" component={ProfileNav} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
