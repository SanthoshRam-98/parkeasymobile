import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import HelloWorld from "./HelloWorld";
// import OnBoardScreen1 from "./OnboardScreen1";
// import OnBoardScreen2 from "./OnBoardScreen2";
// import ParkingSpaceListing from "./ParkingSpaceListing";
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
import ListYourSpaceScreen from "../ListYourSpace/ListYourSpaceScreen";
import ParkingSpaceDetailsScreen from "../ListYourSpace/ParkingSpaceDetailsScreen";
import ConfirmationScreen from "../ListYourSpace/ConfirmationScreen";
import BookScreen0 from "../BookingScreen/BookScreen0";
import BookScreen1 from "../BookingScreen/BookScreen1";
import BookScreen2 from "../BookingScreen/BookScreen2";
import BookScreen3 from "../BookingScreen/BookScreen3";
import BookScreen4 from "../BookingScreen/BookScreen4";
import BookScreen5 from "../BookingScreen/BookScreen5";
import BookScreen6 from "../BookingScreen/BookScreen6";
import CancelBookingScreen from "../BookingOngoingScreen/Cancellation";
import BookingCompletedScreen from "../NavBar/BookingCompletedScreen";
import BookingCancelledScreen from "../NavBar/BookingCancelledScreen";
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
      {/* <Stack.Screen name="OnBoardScreen1" component={OnBoardScreen1} />
      <Stack.Screen name="OnBoardScreen2" component={OnBoardScreen2} />
      <Stack.Screen
        name="ParkingSpaceListing"
        component={ParkingSpaceListing}
      /> */}
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
      <Stack.Screen
        name="ListYourSpaceScreen"
        component={ListYourSpaceScreen}
      />
      <Stack.Screen
        name="ParkingSpaceDetailsScreen"
        component={ParkingSpaceDetailsScreen}
      />
      <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
      <Stack.Screen name="BookScreen0" component={BookScreen0} />
      <Stack.Screen name="BookScreen1" component={BookScreen1} />
      <Stack.Screen name="BookScreen2" component={BookScreen2} />
      <Stack.Screen name="BookScreen3" component={BookScreen3} />
      <Stack.Screen name="BookScreen4" component={BookScreen4} />
      <Stack.Screen name="BookScreen5" component={BookScreen5} />
      <Stack.Screen name="BookScreen6" component={BookScreen6} />
      <Stack.Screen
        name="CancelBookingScreen"
        component={CancelBookingScreen}
      />
      <Stack.Screen
        name="BookingCompletedScreen"
        component={BookingCompletedScreen}
      />
      <Stack.Screen
        name="BookingCancelledScreen"
        component={BookingCancelledScreen}
      />
      {/* Add FullScreenMap here */}
    </Stack.Navigator>
  );
};

export default AllNavScreens;
