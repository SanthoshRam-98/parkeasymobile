import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ParkingScreen from "/Users/santh/OneDrive/Desktop/parkeasymobile/parkeasy-mobile-app/screenImages/parkingspace.svg";

const { height } = Dimensions.get("window");

const ParkingSpaceListing = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 20, left: 20 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <ParkingScreen width="100%" height={height * 0.4} />
      <Text style={styles.title}>List your parking space</Text>
      <Text style={styles.description}>
        You can list any parking space you own or have permission to offer.
      </Text>
      <View style={styles.dotsContainer}>
        <View style={styles.inactiveDot} />
        <View style={styles.inactiveDot} />
        <View style={styles.activeDot} />
      </View>
      <TouchableOpacity
        style={[styles.nextButton, { bottom: insets.bottom + 20 }]}
        onPress={() => {
          // Define the next action here
          navigation.navigate("LoginScreen");
        }}
      >
        <Text style={styles.nextText}>Next</Text>
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
    padding: 20,
  },
  title: {
    color: "rgba(255, 214, 19, 1)",
    textAlign: "center",
    marginTop: 32,
    fontSize: 20,
    fontWeight: "500",
    width: "100%",
  },
  description: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
    fontWeight: "300",
    width: "100%",
  },
  indicatorContainer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    height: 6,
    width: 16,
  },
  nextButton: {
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    paddingVertical: 16,
    alignItems: "center",
  },
  nextText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "transparent",
  },
  backText: {
    color: "rgba(255, 255, 255, 1)",
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
  dotsContainer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  activeDot: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    width: 16,
    height: 6,
  },
  inactiveDot: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 6,
    height: 6,
  },
});

export default ParkingSpaceListing;
