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
import Screen2 from "../screenImages/screen2-image.svg";

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

const OnBoardScreen2 = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 20, left: 20 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <SkipButton onPress={() => navigation.navigate("ParkingSpace")} />

      {/* Screen Content */}
      <Screen2 width="100%" height={height * 0.4} />
      <Text style={styles.title}>Find a parking spot easily</Text>
      <Text style={styles.description}>
        Easily find your parking spaces nearby or at any point on the map.
      </Text>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        <View style={styles.inactiveDot} />
        <View style={styles.activeDot} />
      </View>

      {/* Next Button */}
      <NextButton onPress={() => navigation.navigate("ParkingSpace")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(19, 18, 18, 1)",
    alignItems: "center",
    justifyContent: "center",
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
  dotsContainer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
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

export default OnBoardScreen2;
