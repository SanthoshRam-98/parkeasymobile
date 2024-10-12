import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Verifytick from "../../screenImages/Vehicles/Verifytick.svg";
import Add from "../../screenImages/Vehicles/Add.svg";
import { useNavigation } from "@react-navigation/native";
// Get the window dimensions for responsiveness
const { width } = Dimensions.get("window");

function SpaceListingConfirmation() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const handleSubmit = () => {
    navigation.navigate("UserHomeScreen");
  };
  // Simulate a loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD613" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.verificationContainer}>
          <Verifytick style={styles.confirmationImage} />
        </View>
        <View style={styles.confirmationTextContainer}>
          <Text style={styles.confirmationText}>
            Your space has been listed
          </Text>
        </View>

        <TouchableOpacity style={styles.addMoreContainer}>
          <Add style={styles.addMoreIcon} />
          <Text style={styles.addMoreText}>Add more</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a", // Dark background
    padding: 16,
    alignItems: "center",
    justifyContent: "center", // Center vertically
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center", // Center content vertically
    flexGrow: 1, // Allow the content to grow
    paddingBottom: 16,
  },
  verificationContainer: {
    transform: [{ rotate: "360deg" }], // Rotate effect
    transition: "transform 0.4s ease-in-out", // Smooth rotation
  },
  confirmationImage: {
    width: width * 0.3, // Responsive width based on screen size
    maxWidth: 128,
    aspectRatio: 1,
  },
  confirmationTextContainer: {
    marginTop: 24,
  },
  confirmationText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  addMoreContainer: {
    flexDirection: "row",
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#333", // Dark background for button
  },
  addMoreIcon: {
    width: 24,
    aspectRatio: 1,
    marginRight: 8,
  },
  addMoreText: {
    fontSize: 16,
    color: "rgba(255, 214, 19, 1)",
    fontWeight: "400",
    textAlign: "center",
  },
  submitButton: {
    width: "100%", // Covering left and right with responsive gaps
    backgroundColor: "#FFD613",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    position: "absolute",
    bottom: 20,
  },
  submitButtonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
  },
});

export default SpaceListingConfirmation;
