import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ParkingScreen from "../screenImages/parkingspace.svg"; // Assuming SVG file is imported correctly

const { height } = Dimensions.get("window");

const NextButton = ({ onPress }) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={[
        styles.nextButton,
        {
          bottom: insets.bottom + 20,
        },
      ]}
      onPress={onPress}
    >
      <Text style={styles.nextText}>Next</Text>
    </TouchableOpacity>
  );
};

const SkipButton = ({ onPress }) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      style={[styles.skipButton, { top: insets.top + 20, right: 20 }]}
      onPress={onPress}
    >
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  );
};

const ParkingSpaceListing = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Skip Button */}
      <SkipButton onPress={() => navigation.navigate("HomeScreen")} />

      {/* Screen Content */}
      <ParkingScreen width="100%" height={height * 0.4} />
      <Text style={styles.title}>List your parking space</Text>
      <Text style={styles.description}>
        You can list any parking space you own or have permission to offer.
      </Text>

      {/* Dots Indicator */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
      </View>

      {/* Next Button */}
      <NextButton onPress={() => navigation.navigate("HomeScreen")} />
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
  skipButton: {
    position: "absolute",
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

export default ParkingSpaceListing;
