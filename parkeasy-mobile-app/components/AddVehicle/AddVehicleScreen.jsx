import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Addvehicleimage from "../../screenImages/Vehicles/AddVehicle.svg";

const AddVehicleScreen = ({ navigation }) => {
  // Add navigation as a prop
  const { height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.addVehicleText}>Add Your Vehicle</Text>

        <Addvehicleimage
          height={height * 0.4} // Adjusted for responsiveness
          style={styles.headerImage}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Enter your vehicle number</Text>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="TN 00 AA 0000"
          placeholderTextColor="rgba(140, 140, 140, 1)"
          accessibilityLabel="Enter vehicle number"
        />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          We will fetch all your vehicle details, add your vehicle details with
          just one click
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { bottom: insets.bottom + 20 }]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Add Vehicle Details</Text>
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
  addVehicleText: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10, // Adjust margin to reduce extra space
  },
  headerContainer: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 0, // Remove any top margin
  },
  headerImage: {
    marginTop: 10, // Adjusted to reduce extra space
    aspectRatio: 1.05,
  },
  headerTextContainer: {
    alignSelf: "center",
    marginTop: 10, // Adjust margin to reduce extra space
  },
  headerText: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "500",
  },
  descriptionContainer: {
    marginTop: 24,
    width: 257,
  },
  descriptionText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 12,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 24,
    width: "100%",
    maxWidth: 361,
    backgroundColor: "rgba(32, 32, 32, 1)",
    borderRadius: 10,
  },
  input: {
    borderRadius: 10,
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 12,
    paddingBottom: 12,
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    color: "rgba(140, 140, 140, 1)",
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 16,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default AddVehicleScreen;
