import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VehicleInputs from "/Users/santh/OneDrive/Desktop/parkeasymobile/parkeasy-mobile-app/screenImages/vehicletypes.svg";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const { width } = Dimensions.get("window");

const vehicleInputs = [
  { label: "Vehicle Number", id: "vehicleNumber" },
  { label: "Name", id: "name" },
  { label: "Driving License Number", id: "licenseNumber" },
];

function VehicleSetup() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation(); // Use useNavigation to get access to the navigation object
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    name: "",
    licenseNumber: "",
  });

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Park.Easy</Text>
        <TouchableOpacity style={styles.skipButton} accessibilityRole="button">
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.subtitle}>
          Let's setup your Vehicle profile for a better experience
        </Text>
        <Text style={styles.sectionTitle}>Vehicle Details</Text>

        {/* Input Fields */}
        <View style={styles.form}>
          {vehicleInputs.map((input) => (
            <View key={input.id} style={styles.inputContainer}>
              <Text style={styles.label}>{input.label}</Text>
              <TextInput
                style={styles.input}
                value={formData[input.id]}
                onChangeText={(text) => handleInputChange(input.id, text)}
                accessibilityLabel={input.label}
              />
            </View>
          ))}
          <Text style={styles.vehicleType}>Vehicle Type</Text>
          <VehicleInputs
            style={styles.vehicleImage}
            accessibilityLabel="Vehicle type illustration"
          />
        </View>

        {/* Spacer to push the button to the bottom */}
        <View style={styles.spacer} />

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, { marginBottom: insets.bottom + 20 }]}
          onPress={() => navigation.navigate("UserHomeScreen")}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(19, 18, 18, 1)",
    flex: 1,
    paddingHorizontal: 16, // Ensure padding to prevent content from touching the edges
  },
  header: {
    width: "100%",
    maxWidth: 480,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 3,
  },
  skipButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  skipText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "300",
  },
  content: {
    width: "100%",
    maxWidth: 480,
    alignItems: "center",
    flex: 1,
  },
  title: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 14,
    width: "80%",
  },
  sectionTitle: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 15,
  },
  form: {
    width: "100%",
    marginTop: 36,
    flexGrow: 1, // Allow form to grow and take space
  },
  inputContainer: {
    marginBottom: 28,
  },
  label: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 8,
  },
  input: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(140, 140, 140, 1)",
    color: "rgba(255, 255, 255, 1)",
  },
  vehicleType: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 36,
  },
  vehicleImage: {
    alignSelf: "center",
    marginTop: 16,
    width: width * 0.5, // Adjust width for responsiveness
    aspectRatio: 2.33,
  },
  spacer: {
    flex: 1, // Allow spacer to fill available space
  },
  submitButton: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    marginTop: 20,
    width: "100%",
    paddingVertical: 16,
  },
  submitText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default VehicleSetup;
