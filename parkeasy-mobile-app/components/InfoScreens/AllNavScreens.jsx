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
import FullScreenMap from "../MapScreen/FullScreenMap";
import CarNav from "../NavBar/CarNavScreen";
import BookingNav from "../NavBar/BookingNavScreen";
import ProfileNav from "../NavBar/ProfileScreen";
import AddVehicleScreen from "../AddVehicle/AddVehicleScreen"; // New screen for adding a vehicle
import EarnScreen from "../EarnWithUs/EarnScreen"; // New screen for earning
// import HondaCivicDetailsScreen from "../NavBar/HondaCivicDetailsScreen";
// import OLADetailsScreen from "../NavBar/OLADetailsScreen";
import VehicleDetails from "../AddVehicle/VehicleDetails";

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
      <Stack.Screen name="FullScreenMap" component={FullScreenMap} />
      <Stack.Screen name="CarNav" component={CarNav} />
      <Stack.Screen name="BookingNav" component={BookingNav} />
      <Stack.Screen name="ProfileNav" component={ProfileNav} />
      <Stack.Screen name="AddVehicleScreen" component={AddVehicleScreen} />
      <Stack.Screen name="EarnScreen" component={EarnScreen} />
      {/* <Stack.Screen
        name="HondaCivicDetailsScreen"
        component={HondaCivicDetailsScreen}
      />*/}
      <Stack.Screen name="VehicleDetails" component={VehicleDetails} />

      {/* Add FullScreenMap here */}
    </Stack.Navigator>
  );
};

export default AllNavScreens;
