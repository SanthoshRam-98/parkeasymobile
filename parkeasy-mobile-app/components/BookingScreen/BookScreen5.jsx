import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BookScreen5 = ({ navigation }) => {
  const [cardsVisible] = useState(new Animated.Value(300)); // Initial value to hide the card
  const [selectedVehicle, setSelectedVehicle] = useState(null); // Track selected vehicle
  const handleSubmit = () => {
    if (selectedVehicle === "Paytm") {
      // Navigate to Paytm payment screen or integrate Paytm API call here
      navigation.navigate("PaytmPaymentScreen"); // Assuming this is the screen for Paytm payment
    } else {
      // For other payment methods
      navigation.navigate("BookScreen6");
    }
  };

  // Start the animation when the component mounts
  useEffect(() => {
    Animated.timing(cardsVisible, {
      toValue: 0, // Bring the card into view
      duration: 500, // Animation duration
      useNativeDriver: true, // Native driver for better performance
    }).start();
  }, []);

  // Function to handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Details</Text>
        </View>

        {/* Image */}
        <Image
          style={styles.parkingImage}
          resizeMode="cover"
          source={{ uri: "https://your-parking-image-url.com" }} // Replace with actual image URL
        />

        {/* Animated Card Section */}
        <Animated.View
          style={[
            styles.cardContainer,
            { transform: [{ translateY: cardsVisible }] }, // Apply the sliding animation
          ]}
        >
          <Text style={styles.chooseText}>Choose payment method</Text>

          {/* Vehicle Card 1 - Honda Civic */}
          <TouchableOpacity
            style={[
              styles.vehicleCard,
              selectedVehicle === "Honda Civic" && styles.selectedCard, // Highlight if selected
            ]}
            onPress={() => handleVehicleSelect("Honda Civic")} // Set selected vehicle
          >
            <View style={styles.vehicleInfo}>
              <Image
                style={styles.vehicleImage}
                source={{ uri: "https://your-car-image-url.com" }} // Replace with actual image URL
              />
              <View>
                <Text style={styles.vehicleName}>Phone Pay</Text>
              </View>
            </View>
            <Ionicons
              name={
                selectedVehicle === "Honda Civic"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={24}
              color={selectedVehicle === "Honda Civic" ? "#FFC107" : "#FFF"} // Change color if selected
              style={styles.radioButton}
            />
          </TouchableOpacity>

          {/* Vehicle Card 2 - OLA */}
          <TouchableOpacity
            style={[
              styles.vehicleCard,
              selectedVehicle === "OLA" && styles.selectedCard, // Highlight if selected
            ]}
            onPress={() => handleVehicleSelect("OLA")} // Set selected vehicle
          >
            <View style={styles.vehicleInfo}>
              <Image
                style={styles.vehicleImage}
                source={{ uri: "https://your-bike-image-url.com" }} // Replace with actual image URL
              />
              <View>
                <Text style={styles.vehicleName}>Google Pay</Text>
              </View>
            </View>
            <Ionicons
              name={
                selectedVehicle === "OLA"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={24}
              color={selectedVehicle === "OLA" ? "#FFC107" : "#FFF"} // Change color if selected
              style={styles.radioButton}
            />
          </TouchableOpacity>
          {/* Vehicle Card 3 - Paytm */}
          <TouchableOpacity
            style={[
              styles.vehicleCard,
              selectedVehicle === "Paytm" && styles.selectedCard, // Highlight if selected
            ]}
            onPress={() => handleVehicleSelect("Paytm")} // Set selected vehicle to Paytm
          >
            <View style={styles.vehicleInfo}>
              <Image
                style={styles.vehicleImage}
                source={{ uri: "https://your-paytm-image-url.com" }} // Replace with actual image URL
              />
              <View>
                <Text style={styles.vehicleName}>Paytm</Text>
              </View>
            </View>
            <Ionicons
              name={
                selectedVehicle === "Paytm"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={24}
              color={selectedVehicle === "Paytm" ? "#FFC107" : "#FFF"} // Change color if selected
              style={styles.radioButton}
            />
          </TouchableOpacity>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleSubmit}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    color: "#FFC107",
    fontSize: 18,
    fontWeight: "bold",
  },
  parkingImage: {
    width: "100%",
    height: 200,
  },
  // Card container to position at the bottom of the screen
  cardContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#333",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  chooseText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vehicleCard: {
    backgroundColor: "#222",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#FFC107",
  },
  // Style for the selected card
  selectedCard: {
    borderColor: "#FFD700", // Different border color for selected
    borderWidth: 2,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  vehicleName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  vehicleNumber: {
    color: "#FFF",
    fontSize: 14,
  },
  radioButton: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#555",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  continueButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  cancelText: {
    color: "#FFF",
    fontSize: 16,
  },
  continueText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookScreen5;
