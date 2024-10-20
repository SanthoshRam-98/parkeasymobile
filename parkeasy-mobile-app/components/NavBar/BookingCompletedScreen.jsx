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

const BookingCompletedScreen = ({ navigation }) => {
  const [activeNavIndex, setActiveNavIndex] = useState(2); // Set ticket-outline active by default

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
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
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
            <Text style={styles.parkingName}>Nexus Vijaya Mall</Text>
            <Text style={styles.parkingLocation}>Vadapalani, Chennai</Text>
            <Text style={styles.parkingDate}>23rd June 2024</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusActive}>Completed</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.disabledButton}>
              <Text style={styles.disabledButtonText}>View Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Image
            style={styles.parkingImage}
            source={{ uri: "https://example.com/parking2.jpg" }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.parkingName}>Park Prime</Text>
            <Text style={styles.parkingLocation}>T.Nagar, Chennai</Text>
            <Text style={styles.parkingDate}>22nd June 2024</Text>
            <View style={styles.statusContainer}>
              <Text style={styles.statusActive}>Completed</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.disabledButton}>
              <Text style={styles.disabledButtonText}>View Ticket</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* Bottom Navigation Bar */}
      <BottomNavigationBar
        navigationItems={[
          { iconName: "home-outline", route: "UserHomeScreen" },
          { iconName: "car-outline", route: "CarNav" },
          { iconName: "ticket-outline", route: "BookingNav" },
          { iconName: "person-outline", route: "ProfileNav" },
        ]}
        activeIndex={activeNavIndex}
        setActiveIndex={setActiveNavIndex}
        style={styles.bottomNav}
      />
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

export default BookingCompletedScreen;
