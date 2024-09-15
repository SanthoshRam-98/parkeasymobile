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
import Screen1 from "../screenImages/screen1-image.svg";

const { width, height } = Dimensions.get("window");

const SkipButton = () => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity style={[styles.skipButton, { top: insets.top + 20 }]}>
      <Text style={styles.skipText}>Skip</Text>
    </TouchableOpacity>
  );
};

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

const ProgressDots = () => (
  <View style={styles.dotsContainer}>
    <View style={styles.activeDot} />
    <View style={styles.inactiveDot} />
    <View style={styles.inactiveDot} />
  </View>
);

const OnBoardScreen1 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SkipButton />
      <Screen1 width="100%" height={height * 0.4} />
      <Text style={styles.title}>Feel safe and secure parking</Text>
      <Text style={styles.description}>
        Providing reliable, safe, and secure parking solutions for peace of
        mind.
      </Text>
      <ProgressDots />
      <NextButton onPress={() => navigation.navigate("Onboarding2")} />
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
});

export default OnBoardScreen1;
