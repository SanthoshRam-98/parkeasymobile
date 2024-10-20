import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window"); // Get device width for responsiveness

const CancelBookingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Cancel Ticket</Text>

      {/* Cancel Booking Section */}
      <View style={styles.cancelSection}>
        <Text style={styles.cancelText}>⚠️ Cancel Booking</Text>
      </View>

      {/* Ticket-style Booking Info Card */}
      <View style={styles.ticketCard}>
        {/* Side cutouts */}
        <View style={styles.sideCutoutLeft} />
        <View style={styles.sideCutoutRight} />

        {/* Card content */}
        <View style={styles.cardHeader}>
          <Image
            source={{ uri: "https://example.com/parking-lot-image.jpg" }} // Replace with real image URL
            style={styles.parkingImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.parkingTitle}>JJ Parking Lot</Text>
            <Text style={styles.parkingLocation}>Kodambakkam, Chennai</Text>
          </View>
        </View>

        {/* Dotted Line */}
        <View style={styles.dottedLine} />

        {/* Card Details */}
        <View style={styles.cardContent}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>Kaarthikeyan S V</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Vehicle</Text>
              <Text style={styles.value}>TN 00 AA 0000</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Parking Area</Text>
              <Text style={styles.value}>JJ Parking Lot</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Parking Slot</Text>
              <Text style={styles.value}>1st Floor (000)</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>25th June 2024</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>4 Hours</Text>
            </View>
          </View>
          <View style={styles.dottedLine} />
          {/* Amount Details */}
          <View style={styles.row}>
            <Text style={styles.label}>Total amount paid</Text>
            <Text style={styles.amount}>₹ 80.00</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Refundable amount</Text>
            <Text style={styles.amount}>₹ 65.00</Text>
          </View>
        </View>

        {/* Dotted Line */}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.proceedButton} disabled>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
    padding: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#222",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#FFC107", // Yellow title
    marginTop: 60,
    marginBottom: 20,
  },
  cancelSection: {
    backgroundColor: "#E53935", // Red background for cancel
    padding: 10,
    borderRadius: 20, // Rounded edges for red section
  },
  cancelText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  ticketCard: {
    backgroundColor: "#333",
    borderRadius: 20, // Rounded corners like ticket
    padding: 20,
    marginBottom: 30,
    width: width - 40, // Full width minus padding
    alignSelf: "center",
    position: "relative",
  },
  sideCutoutLeft: {
    position: "absolute",
    left: -15,
    top: "25%",
    bottom: "25%",
    width: 30,
    height: 30,
    backgroundColor: "#121212",
    borderRadius: 15,
  },
  sideCutoutRight: {
    position: "absolute",
    right: -15,
    top: "25%",
    bottom: "25%",
    width: 30,
    height: 30,
    backgroundColor: "#121212",
    borderRadius: 15,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  parkingImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  headerTextContainer: {
    justifyContent: "center",
  },
  parkingTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  parkingLocation: {
    fontSize: 14,
    color: "#BDBDBD",
  },
  dottedLine: {
    height: 1,
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: "#000",
    marginVertical: 10,
  },
  cardContent: {
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  column: {
    width: "48%", // Two columns side by side
  },
  label: {
    color: "#BDBDBD",
    fontSize: 14,
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
  amount: {
    color: "#FFC107", // Yellow color for amount
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    // left: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignContent: "center",
    // marginRight: "auto",
    // marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#FFC107", // Yellow button
    padding: 15,
    borderRadius: 10,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
  proceedButton: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CancelBookingScreen;
