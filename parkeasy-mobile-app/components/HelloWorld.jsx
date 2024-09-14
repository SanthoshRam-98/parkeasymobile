import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// Get device width and height
const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const HelloWorld = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoCircle} />
      <Text style={styles.logoText}>Park.Easy</Text>
      <View style={styles.underlineBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffd613",
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Centers content vertically
    width: "100%",
    paddingBottom: 9,
  },
  logoCircle: {
    backgroundColor: "#000",
    borderRadius: deviceWidth * 0.4, // Circular
    width: deviceWidth * 0.2, // Relative to device size
    height: deviceWidth * 0.2, // Relative to device size
    marginTop: deviceHeight * 0.3, // Relative margin for spacing
  },
  logoText: {
    color: "#000",
    letterSpacing: deviceWidth * 0.014, // Scale letter-spacing
    marginTop: 24,
    fontSize: deviceWidth * 0.09, // Scales text size to device width
    fontWeight: "600",
  },
  underlineBar: {
    marginTop: deviceHeight * 0.03, // Relative margin
    width: deviceWidth * 0.45, // Scale with width
    height: 4,
    borderWidth: 4,
    borderColor: "#000",
  },
});

export default HelloWorld;
