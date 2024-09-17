import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HelloWorld from "./HelloWorld";
import OnBoardScreen1 from "./OnboardScreen1";
import OnBoardScreen2 from "./OnBoardScreen2";
import ParkingSpaceListing from "./ParkingSpaceListing";
const Stack = createStackNavigator();

const AllNavScreens = () => {
  return (
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
  );
};

export default AllNavScreens;
