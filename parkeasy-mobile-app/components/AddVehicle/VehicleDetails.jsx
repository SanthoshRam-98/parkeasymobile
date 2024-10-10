import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CarImage from "../../screenImages/Vehicles/CarImage.svg";
import VerifiedBadge from "../../screenImages/Vehicles/verifybadge.svg";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const VehicleDetails = ({ route, navigation }) => {
  const { vehicleName, vehicleNumber, ownerName, licenseNumber, vehicleType } =
    route.params; // Extract params
  const insets = useSafeAreaInsets();

  const handleDelete = () => {
    console.log("Delete button clicked");
    navigation.navigate("VehicleInputs", {
      vehicleNumber: "",
      vehicleName: "",
      ownerName: "",
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://192.168.96.160:3000/api/v1/vehicle_details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vehicle: {
              vehicle_number: vehicleNumber,
              name: vehicleName,
              license_number: licenseNumber,
              vehicle_type: vehicleType,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Vehicle saved:", data);
      alert("Vehicle saved successfully!");
      navigation.navigate("UserHomeScreen");
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert("Failed to save vehicle. Please try again.");
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

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Vehicle Details</Text>
          </View>
        </View>

        {/* Vehicle Image */}
        <CarImage
          width={width * 0.9}
          height={height * 0.4}
          style={styles.vehicleImage}
        />

        {/* Vehicle Info */}
        <View style={styles.vehicleInfoContainer}>
          <View style={styles.vehicleDetails}>
            <Text style={styles.vehicleName}>{vehicleName}</Text>
            <Text style={styles.vehicleNumber}>{vehicleNumber}</Text>
          </View>
          <View style={styles.ownerDetails}>
            <Text style={styles.ownerName}>{ownerName}</Text>
            <View style={styles.wrapper}>
              <View style={styles.verifiedContainer}>
                <VerifiedBadge
                  style={styles.verifiedIcon}
                  accessibilityLabel="Verification icon"
                />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Assuming a dark background
  },
  content: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "transparent",
  },
  backText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "300",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 18,
    fontWeight: "600",
  },
  vehicleImage: {
    marginTop: 20,
    width: "100%", // Full width of the container
    height: height * 0.4, // Fixed height for responsiveness
  },
  vehicleInfoContainer: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row", // Align side by side
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
    color: "rgba(255, 214, 19, 1)",
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
  actionButtons: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 10,
    width: "100%",
    paddingHorizontal: 16,
  },
  deleteButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "500",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "rgba(255, 214, 19, 1)",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  wrapper: {
    display: "flex",
    maxWidth: 122,
    flexDirection: "column",
    alignItems: "stretch",
  },
  verifiedContainer: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 7,
    gap: 8,
  },
  verifiedIcon: {
    width: 18,
    aspectRatio: 1,
  },
  verifiedText: {
    fontSize: 10,
    color: "rgba(0, 255, 25, 1)",
    fontWeight: "500",
  },
});

export default VehicleDetails;
