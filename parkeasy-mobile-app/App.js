import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AllNavScreens from "./components/InfoScreens/AllNavScreens";
export default function App() {
  return (
    <NavigationContainer>
      <AllNavScreens />
    </NavigationContainer>
  );
}
