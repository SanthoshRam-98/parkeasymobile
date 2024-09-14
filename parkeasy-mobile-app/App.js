import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HelloWorld from "./components/HelloWorld";
import OnBoardScreen1 from "./components/OnboardScreen1";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <HelloWorld />
      <OnBoardScreen1 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
