import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const HelloWorld = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("LoginScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

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
    justifyContent: "center",
    width: "100%",
    paddingBottom: 9,
  },
  logoCircle: {
    backgroundColor: "#000",
    borderRadius: deviceWidth * 0.4,
    width: deviceWidth * 0.2,
    height: deviceWidth * 0.2,
  },
  logoText: {
    color: "#000",
    letterSpacing: deviceWidth * 0.014,
    marginTop: 24,
    fontSize: deviceWidth * 0.09,
    fontWeight: "600",
  },
  underlineBar: {
    marginTop: deviceHeight * 0.03,
    width: deviceWidth * 0.45,
    height: 4,
    borderColor: "#000",
    borderWidth: 4,
  },
});

export default HelloWorld;
