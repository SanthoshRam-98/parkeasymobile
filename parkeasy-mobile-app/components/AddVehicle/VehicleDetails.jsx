import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Modal, // For custom modal
  ActivityIndicator, // For smooth loading indicator
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CarImage from "../../screenImages/Vehicles/CarImage.svg";
import VerifiedBadge from "../../screenImages/Vehicles/verifybadge.svg";

const { width, height } = Dimensions.get("window");

const VehicleDetails = ({ route, navigation }) => {
  const {
    vehicleName,
    vehicleNumber,
    ownerName,
    licenseNumber,
    vehicleType,
    vehicleId,
  } = route.params;

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const insets = useSafeAreaInsets();
  const [vehicleData, setVehicleData] = useState(null); // Store vehicle data

  const handleSubmit = async () => {
    setLoading(true); // Show loading indicator
    try {
      const response = await fetch(
        "http://192.168.225.160:3000/api/v1/vehicle_details",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            vehicle_detail: {
              vehicle_number: vehicleNumber,
              name: vehicleName,
              license_number: licenseNumber,
              vehicle_type: vehicleType,
            },
          }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setVehicleData(data); // Store data for navigation
      setModalMessage("Vehicle saved successfully!");
      setModalVisible(true); // Show success message
    } catch (error) {
      setModalMessage("Failed to save vehicle. Please try again.");
      setModalVisible(true); // Show error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (vehicleData) {
      // Navigate to UserHomeScreen with the updated vehicle data
      navigation.navigate("UserHomeScreen", {
        vehicleId: vehicleData.id,
        vehicleName: vehicleData.name,
        vehicleNumber: vehicleData.vehicle_number,
        ownerName: ownerName,
        licenseNumber: vehicleData.license_number,
        vehicleType: vehicleData.vehicle_type,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.backButton, { top: insets.top + 20, left: 20 }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Vehicle Details</Text>
          </View>
        </View>

        <CarImage
          width={width * 0.9}
          height={height * 0.4}
          style={styles.vehicleImage}
        />

        <View style={styles.vehicleInfoContainer}>
          <View style={styles.vehicleDetails}>
            <Text style={styles.vehicleName}>{vehicleName}</Text>
            <Text style={styles.vehicleNumber}>{vehicleNumber}</Text>
          </View>
          <View style={styles.ownerDetails}>
            <Text style={styles.ownerName}>{ownerName}</Text>
            <View style={styles.wrapper}>
              <View style={styles.verifiedContainer}>
                <VerifiedBadge style={styles.verifiedIcon} />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose} // Close modal and navigate when "OK" is clicked
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  header: {
    marginTop: 28,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 20,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "300",
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    color: "#FFD613",
    fontSize: 18,
    fontWeight: "600",
  },
  vehicleImage: {
    marginTop: 20,
    width: "100%",
  },
  vehicleInfoContainer: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  vehicleDetails: {
    alignItems: "flex-start",
  },
  vehicleName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  vehicleNumber: {
    color: "#FFD613",
    fontSize: 24,
    marginTop: 10,
  },
  ownerDetails: {
    alignItems: "flex-start",
  },
  ownerName: {
    color: "#fff",
    fontSize: 18,
  },
  wrapper: {
    maxWidth: 122,
  },
  verifiedContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 7,
  },
  verifiedIcon: {
    width: 18,
  },
  verifiedText: {
    fontSize: 10,
    color: "#00FF19",
  },
  actionButtons: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    paddingHorizontal: 16,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#FFD613",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
  modalText: {
    color: "white",
    marginBottom: 20,
    fontSize: 16,
  },
  modalButton: {
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
  },
});

export default VehicleDetails;
