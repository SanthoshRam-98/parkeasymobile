import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HelloWorld from "./HelloWorld";
import OnBoardScreen1 from "./OnboardScreen1";
import OnBoardScreen2 from "./OnBoardScreen2";
import ParkingSpaceListing from "./ParkingSpaceListing";
import LoginScreen from "./LoginScreen";
import OTPVerification from "./OTPVerification";
import VehicleInputs from "./VehicleInputs";
import UserHomeScreen from "./UserHomeScreen";

const AllNavScreens = () => {
  const Stack = createStackNavigator();
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
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="VehicleInputs" component={VehicleInputs} />
      <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
      {/* <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} /> */}
    </Stack.Navigator>
  );
};

export default AllNavScreens;
