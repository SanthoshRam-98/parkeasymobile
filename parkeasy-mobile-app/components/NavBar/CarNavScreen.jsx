import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  ActivityIndicator, // For smooth loading indicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigationBar from "../InfoScreens/BottomNavigationBar";
import CarImage from "../../screenImages/Vehicles/CarImage.svg";
import BikeImage from "../../screenImages/Vehicles/CycleImage.svg";

function MyVehicleScreen() {
  const navigation = useNavigation();
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(null);
  const [vehicleList, setVehicleList] = useState([]);
  const [activeNavIndex, setActiveNavIndex] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch(
        "http://192.168.225.160:3000/api/v1/vehicle_details"
      );
      const data = await response.json();
      const formattedVehicles = data.map((vehicle) => ({
        id: vehicle.id,
        name: vehicle.name || "Unknown Vehicle",
        licensePlate: vehicle.license_number || "No License Number",
        image: vehicle.vehicle_type === "Bike" ? BikeImage : CarImage,
        ownerName: vehicle.owner_name || "Unknown Owner",
      }));
      setVehicleList(formattedVehicles);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    setIsLoading(true); // Start loading
    setModalVisible(false); // Close the modal immediately

    try {
      const response = await fetch(
        `http://192.168.225.160:3000/api/v1/vehicle_details/${vehicleId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setVehicleList((prevList) =>
          prevList.filter((vehicle) => vehicle.id !== vehicleId)
        );
        console.log(`Vehicle with id ${vehicleId} deleted.`);

        // Introduce a 300ms wait time before navigation
        setTimeout(() => {
          navigation.navigate("UserHomeScreen"); // Navigate after a short delay
        }, 300); // 300ms delay
      } else {
        console.error("Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const confirmDeleteVehicle = (vehicleId) => {
    setVehicleToDelete(vehicleId);
    setModalVisible(true);
  };

  const handleAddVehicle = () => {
    navigation.navigate("VehicleInputs");
  };

  const renderVehicleCard = (vehicle, index) => (
    <View
      key={index}
      style={[
        styles.vehicleCard,
        index === activeVehicleIndex && styles.activeVehicleCard,
        index === activeVehicleIndex && styles.activeBorder,
      ]}
    >
      <View style={styles.infoContainer}>
        <View>
          {React.createElement(vehicle.image, { width: 80, height: 80 })}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{vehicle.name}</Text>
          <Text style={styles.licensePlate}>{vehicle.licensePlate}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteIconContainer}
        onPress={() => confirmDeleteVehicle(vehicle.id)}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Vehicle</Text>
      </View>

      <ScrollView
        style={styles.vehicleList}
        contentContainerStyle={styles.scrollViewContent}
      >
        {vehicleList.map(renderVehicleCard)}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Add Vehicle Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddVehicle}>
        <View style={styles.iconContainer}>
          <Ionicons name="add" size={40} color="#1a1a1a" />
        </View>
        <Text style={styles.fabText}>Add Vehicle</Text>
      </TouchableOpacity>

      {/* Custom confirmation modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this vehicle?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteVehicle(vehicleToDelete)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD613" />
        </View>
      )}

      <BottomNavigationBar
        navigationItems={[
          { iconName: "home-outline", route: "UserHomeScreen" },
          { iconName: "car-outline", route: "CarNav" },
          { iconName: "calendar-outline", route: "BookingNav" },
          { iconName: "person-outline", route: "ProfileNav" },
        ]}
        activeIndex={activeNavIndex}
        setActiveIndex={setActiveNavIndex}
        style={styles.bottomNav}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: "#1a1a1a" },
  header: { marginBottom: 16, marginTop: 16 },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(255, 214, 19, 1)",
  },
  vehicleCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#333",
    alignItems: "flex-start",
    position: "relative", // Position relative to place delete icon
  },
  activeVehicleCard: { backgroundColor: "rgba(255, 214, 19, 0.3)" },
  activeBorder: { borderColor: "rgba(255, 214, 19, 1)", borderWidth: 1 },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  textContainer: { marginLeft: 16 },
  name: { fontSize: 16, color: "rgba(255, 214, 19, 1)" },
  licensePlate: { fontSize: 12, color: "rgba(255, 255, 255, 0.7)" },
  iconContainer: { flexDirection: "row", alignItems: "center" },
  bottomNav: { width: "100%" },
  vehicleList: { flex: 1 }, // Ensure ScrollView takes up remaining space
  scrollViewContent: {
    paddingBottom: 80, // Adjust this value to ensure scroll works
  },
  fab: {
    position: "absolute",
    bottom: 100, // Adjust based on your layout
    right: 16,
    backgroundColor: "rgba(255, 214, 19, 1)",
    borderRadius: 20,
    padding: 12,
    elevation: 4,
    alignItems: "center",
  },
  fabText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomPadding: {
    height: 80, // Height of the BottomNavigationBar
  },
  // Styles for delete icon
  deleteIconContainer: {
    position: "absolute",
    right: 0, // Adjust to sit on border
    padding: 5,
    borderRadius: 20, // Rounded icon background
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: { color: "white", marginBottom: 20, fontSize: 16 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  cancelButton: {
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  cancelButtonText: { color: "white" },
  deleteButtonText: { color: "white" },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
});

export default MyVehicleScreen;
