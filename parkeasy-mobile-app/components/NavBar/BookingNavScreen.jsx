import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import BottomNavigationBar from "../InfoScreens/BottomNavigationBar";

const MyBookingScreen = ({ navigation }) => {
  const [activeNavIndex, setActiveNavIndex] = useState(2); // Set ticket-outline active by default
  const handleSubmit = () => {
    navigation.navigate("BookingCompletedScreen");
  };
  const handleSubmitCancelled = () => {
    navigation.navigate("BookingCancelledScreen");
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Booking</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={styles.tabTextActive}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={handleSubmit}>
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={handleSubmitCancelled}
        >
          <Text style={styles.tabText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      {/* Bookings */}
      <ScrollView>
        <View style={styles.cardContainer}>
          <Image
            style={styles.parkingImage}
            source={{ uri: "https://example.com/parking1.jpg" }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.parkingName}>RR Parking</Text>
            <Text style={styles.parkingLocation}>Vadapalani, Chennai</Text>
            <Text style={styles.parkingDate}>25th June 2024</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusActive}>Active</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.disabledButton}>
              <Text style={styles.disabledButtonText}>View Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.activeButton}>
              <Text style={styles.activeButtonText}>View Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Image
            style={styles.parkingImage}
            source={{ uri: "https://example.com/parking2.jpg" }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.parkingName}>JJ Parking Lot</Text>
            <Text style={styles.parkingLocation}>Kodambakkam, Chennai</Text>
            <Text style={styles.parkingDate}>25th June 2024</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusPaid}>Paid</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.disabledButton}>
              <Text style={styles.disabledButtonText}>View Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.activeButtonYellow}
              onPress={() => navigation.navigate("CancelBookingScreen")}
            >
              <Text style={styles.activeButtonText}>View Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFC107",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 16,
    paddingHorizontal: 10, // Added padding to improve spacing
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 5, // Added margin between tabs
  },
  activeTab: {
    backgroundColor: "#FFC107",
  },
  tabText: {
    color: "#FFF",
    fontSize: 16,
  },
  tabTextActive: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 10, // Reduced padding for compact size
    overflow: "hidden",
  },
  parkingImage: {
    height: 120, // Reduced height for smaller card size
    width: "100%",
  },
  cardContent: {
    padding: 12, // Reduced padding for a more compact look
  },
  parkingName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  parkingLocation: {
    color: "#AAA",
    fontSize: 14,
    marginBottom: 4,
  },
  parkingDate: {
    color: "#AAA",
    fontSize: 14,
  },
  statusContainer: {
    marginTop: 8,
  },
  statusActive: {
    color: "green",
    fontWeight: "bold",
  },
  statusPaid: {
    color: "#00BFFF",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10, // Reduced padding for smaller buttons
  },
  disabledButton: {
    flex: 1,
    backgroundColor: "#444",
    borderRadius: 8,
    paddingVertical: 8, // Reduced padding
    alignItems: "center",
    marginRight: 8,
  },
  disabledButtonText: {
    color: "#AAA",
    fontSize: 14,
  },
  activeButton: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFC107",
    paddingVertical: 8, // Reduced padding
    alignItems: "center",
  },
  activeButtonYellow: {
    flex: 1,
    backgroundColor: "#FFC107",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  activeButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    backgroundColor: "#FFC107",
  },
});

export default MyBookingScreen;
