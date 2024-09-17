import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HelloWorld from "./components/HelloWorld";
import OnBoardScreen1 from "./components/OnboardScreen1";
import OnBoardScreen2 from "./components/OnBoardScreen2";
import ParkingSpaceListing from "./components/ParkingSpaceListing";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HelloWorld"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS, // Use smooth slide transitions
        }}
      >
        <Stack.Screen name="HelloWorld" component={HelloWorld} />
        <Stack.Screen name="OnBoardScreen1" component={OnBoardScreen1} />
        <Stack.Screen name="OnBoardScreen2" component={OnBoardScreen2} />
        <Stack.Screen
          name="ParkingSpaceListing"
          component={ParkingSpaceListing}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
