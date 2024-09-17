import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Screen1 from "/Users/santh/OneDrive/Desktop/parkeasymobile/parkeasy-mobile-app/screenImages/screen1-image.svg";
import { commonStyles } from "./commonStyles";

const { height } = Dimensions.get("window");

const OnBoardScreen1 = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        style={[styles.skipButton, { top: insets.top + 20 }]}
        onPress={() => navigation.navigate("OnBoardScreen2")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Screen1 width="100%" height={height * 0.4} />
      <Text style={styles.title}>Feel safe and secure parking</Text>
      <Text style={styles.description}>
        <Text>
          {" "}
          Providing reliable, safe, and secure parking solutions for peace of
          mind.
        </Text>
      </Text>
      <View style={commonStyles.dotsContainer}>
        <View style={commonStyles.activeDot} />
        <View style={commonStyles.inactiveDot} />
        <View style={commonStyles.inactiveDot} />
      </View>
      <TouchableOpacity
        style={[commonStyles.nextButton, { bottom: insets.bottom + 20 }]}
        onPress={() => navigation.navigate("OnBoardScreen2")}
      >
        <Text style={commonStyles.nextText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(19, 18, 18, 1)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    width: "100%",
  },
  title: {
    color: "rgba(255, 214, 19, 1)",
    textAlign: "center",
    marginTop: 44,
    width: "90%",
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    marginTop: 12,
    width: "90%",
    fontSize: 16,
    fontWeight: "300",
  },
  skipButton: {
    position: "absolute",
    right: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "transparent",
  },
  skipText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "300",
  },
});

export default OnBoardScreen1;
