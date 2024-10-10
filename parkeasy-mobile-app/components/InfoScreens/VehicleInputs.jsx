import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const vehicleInputs = [
  { label: "Vehicle Number", id: "vehicleNumber" },
  { label: "Name", id: "name" },
  { label: "Driving License Number", id: "licenseNumber" },
];

const vehicleTypes = [
  { type: "Car", icon: "car-outline" },
  { type: "Bike", icon: "bicycle-outline" },
];

function VehicleSetup() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    name: "",
    licenseNumber: "",
    vehicleType: null,
  });

  useFocusEffect(
    React.useCallback(() => {
      setFormData({
        vehicleNumber: "",
        name: "",
        licenseNumber: "",
        vehicleType: null,
      });
    }, [])
  );

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleVehicleTypeSelect = (type) => {
    setFormData({ ...formData, vehicleType: type });
  };

  const handleSubmit = async () => {
    const { vehicleNumber, name, licenseNumber, vehicleType } = formData;

    if (!vehicleNumber || !name || !licenseNumber || !vehicleType) {
      alert("Please fill in all required fields.");
      return;
    }

    navigation.navigate("CarNav", {
      vehicleNumber,
      vehicleName: name,
      licenseNumber,
      vehicleType, // Add vehicleType here
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Park.Easy</Text>
        <TouchableOpacity style={styles.skipButton} accessibilityRole="button">
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.subtitle}>
          Let's setup your Vehicle profile for a better experience
        </Text>
        <Text style={styles.sectionTitle}>Vehicle Details</Text>

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
          <Text style={styles.vehicleTypeLabel}>Select the Vehicle Type</Text>
          <View style={styles.vehicleTypeContainer}>
            {vehicleTypes.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.type}
                style={[
                  styles.vehicleButton,
                  formData.vehicleType === vehicle.type &&
                    styles.selectedVehicle,
                ]}
                onPress={() => handleVehicleTypeSelect(vehicle.type)}
              >
                <Ionicons name={vehicle.icon} size={40} color="white" />
                <Text style={styles.vehicleText}>{vehicle.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={[styles.submitButton, { marginBottom: insets.bottom + 20 }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(19, 18, 18, 1)",
    flex: 1,
    paddingHorizontal: 16,
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
  scrollContainer: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 20,
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
    flexGrow: 1,
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
  vehicleTypeLabel: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 36,
  },
  vehicleTypeContainer: {
    flexDirection: "row",
    justifyContent: "center", // Center the icons horizontally
    marginTop: 10,
  },
  vehicleButton: {
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1, // Add border width for icon buttons
    borderColor: "rgba(140, 140, 140, 1)", // Border color for icons
    padding: 10,
    marginHorizontal: 5, // Add margin for spacing between buttons
    width: width * 0.4,
  },
  selectedVehicle: {
    backgroundColor: "rgba(255, 214, 19, 0.5)",
  },
  vehicleText: {
    color: "white",
    marginTop: 5,
  },
  spacer: {
    flex: 1,
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
