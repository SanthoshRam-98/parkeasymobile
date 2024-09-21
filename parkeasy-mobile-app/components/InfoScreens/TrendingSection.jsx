import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TrendingSection = () => (
  <View style={styles.trendingContainer}>
    <Text style={styles.trendingText}>Trending</Text>
  </View>
);

const styles = StyleSheet.create({
  trendingContainer: {
    alignSelf: "flex-start",
  },
  trendingText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
});

export default TrendingSection;
