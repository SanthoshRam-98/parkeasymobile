import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Addvehicleimage from "../../screenImages/Vehicles/AddVehicle.svg";

const AddVehicleScreen = ({ navigation }) => {
  const { height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: insets.bottom + 20 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
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
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Enter your vehicle name</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Honda Civic"
            placeholderTextColor="rgba(140, 140, 140, 1)"
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            We will fetch all your vehicle details, add your vehicle details
            with just one click
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          accessibilityRole="button"
          onPress={() => navigation.navigate("CarNav")}
        >
          <Text style={styles.buttonText}>Add Vehicle Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(19, 18, 18, 1)",
    alignItems: "center",
    // Added top margin for spacing
    // Top: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 10, // Added some padding to the top
    marginTop: 20,
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
    marginTop: 32,
    // marginTop: 10, // Adjusted to reduce extra space
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
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20, // Add space above the button
    width: "100%", // Make the button width responsive
    position: "absolute",
    bottom: 0,
    marginBottom: 10,
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
