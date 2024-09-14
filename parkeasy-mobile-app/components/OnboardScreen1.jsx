import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

// SkipButton Component
const SkipButton = () => (
  <TouchableOpacity style={styles.skipButton}>
    <Text style={styles.skipText}>Skip</Text>
  </TouchableOpacity>
);

// NextButton Component
const NextButton = () => (
  <TouchableOpacity style={styles.nextButton}>
    <Text style={styles.nextText}>Next</Text>
  </TouchableOpacity>
);

// ProgressDots Component
const ProgressDots = () => (
  <View style={styles.dotsContainer}>
    <View style={styles.activeDot} />
    <View style={styles.inactiveDot} />
    <View style={styles.inactiveDot} />
  </View>
);

// OnboardingScreen Component
const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <SkipButton />
      <Image
        resizeMode="contain"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ecc86ff420f1efa1965c25112c647051e3aa67912ea3b99c70c7bb243f48ef1?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
        }}
        style={styles.mainImage}
      />
      <Text style={styles.title}>Feel safe and secure parking</Text>
      <Text style={styles.description}>
        Providing reliable, safe, and secure parking solutions for peace of
        mind.
      </Text>
      <ProgressDots />
      <NextButton />
      <View style={styles.bottomBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(19, 18, 18, 1)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Centers content vertically
    width: "100%",
    paddingBottom: 9,
    paddingHorizontal: 16,
  },
  mainImage: {
    marginTop: 74,
    width: "100%",
    maxWidth: 319,
    aspectRatio: 1.08,
  },
  title: {
    color: "rgba(255, 214, 19, 1)",
    textAlign: "center",
    marginTop: 44,
    width: 274,
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "500",
  },
  description: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    marginTop: 12,
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "300",
  },
  bottomBar: {
    marginTop: 40,
    width: 171,
    height: 4,
    borderWidth: 4,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  skipButton: {
    borderRadius: 10,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    padding: 12,
  },
  skipText: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "300",
  },
  nextButton: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    alignSelf: "stretch",
    marginTop: 60,
    padding: 12,
  },
  nextText: {
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "600",
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
});

export default OnboardingScreen;
