import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons from expo
import BottomNavigationBar from "../InfoScreens/BottomNavigationBar";
import CarImage from "../../screenImages/Vehicles/CarImage.svg";
import CycleImage from "../../screenImages/Vehicles/CycleImage.svg";

const vehicleData = [
  {
    name: "Honda Civic",
    licensePlate: "TN 00 AA 0000",
    image: CarImage,
  },
  {
    name: "OLA",
    licensePlate: "TN 00 AA 0000",
    image: CycleImage,
  },
];

function MyVehicleScreen() {
  const navigation = useNavigation();
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(null); // Separate state for vehicle cards
  const [activeNavIndex, setActiveNavIndex] = useState(1); // State for BottomNavigationBar

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setActiveNavIndex(1); // Reset active navigation index when focusing on this screen
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [navigation]);

  const navigationItems = [
    {
      iconName: "home-outline",
      route: "UserHomeScreen",
    },
    {
      iconName: "car-outline",
      route: "CarNav",
    },
    {
      iconName: "calendar-outline",
      route: "BookingNav",
    },
    {
      iconName: "person-outline",
      route: "ProfileNav",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Vehicle</Text>
      </View>
      <View style={styles.vehicleList}>
        {vehicleData.map((vehicle, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.vehicleCard,
              index === activeVehicleIndex && styles.activeVehicleCard, // Highlight selected vehicle
              index === activeVehicleIndex && styles.activeBorder, // Add border to selected vehicle
            ]}
            onPress={() => setActiveVehicleIndex(index)} // Update vehicle card selection
          >
            <View style={styles.infoContainer}>
              {/* Render SVG directly here */}
              {React.createElement(vehicle.image, { width: 80, height: 80 })}
              <View style={styles.textContainer}>
                <Text style={styles.name}>{vehicle.name}</Text>
                <Text style={styles.licensePlate}>{vehicle.licensePlate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.vehicleCard}>
          <View style={styles.infoContainer}>
            {/* Use an Ionic icon instead of PlusImage */}
            <View style={styles.iconContainer}>
              <Ionicons name="add" size={40} color="rgba(255, 214, 19, 1)" />
              <View style={styles.textContainer}>
                <Text style={styles.name}>Add Vehicle</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <BottomNavigationBar
        navigationItems={navigationItems}
        activeIndex={activeNavIndex} // Keep navigation index separate
        setActiveIndex={setActiveNavIndex} // Use setActiveNavIndex for navigation
        style={styles.bottomNav}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#1a1a1a",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(255, 214, 19, 1)",
  },
  vehicleList: {
    flex: 1,
    marginBottom: 16,
  },
  vehicleCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#333",
    width: "100%", // Ensuring full width
    alignItems: "flex-start", // Align items to start for side-by-side
  },
  activeVehicleCard: {
    backgroundColor: "rgba(255, 214, 19, 0.3)",
  },
  activeBorder: {
    borderColor: "rgba(255, 214, 19, 1)",
    borderWidth: 1, // Ensure border is visible
  },
  infoContainer: {
    flexDirection: "row", // Change to row for side-by-side alignment
    alignItems: "center", // Center align the items vertically
    textAlign: "center",
  },
  textContainer: {
    marginLeft: 16, // Space between image and text
  },
  name: {
    fontSize: 16,
    color: "rgba(255, 214, 19, 1)",
  },
  licensePlate: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
  },
  bottomNav: {
    width: "100%",
  },
});

export default MyVehicleScreen;
