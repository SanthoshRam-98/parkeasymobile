import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ParkingAvailability from "./ParkingAvailability";
import ParkingServices from "./ParkingServices";

const UserHomeScreen = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView contentContainerStyle={styles.profileScreenContainer}>
      <View style={styles.profileNav}>
        <View style={[styles.topSection, { width: screenWidth * 0.9 }]}>
          <View style={styles.profileHeaderContainer}>
            <View style={styles.profileImage}>
              <Ionicons name="person-circle-outline" size={56} color="black" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Kaarthikeyan S V</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={18} color="black" />
                <Text style={styles.locationText}>Chennai</Text>
              </View>
            </View>
          </View>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <View style={[styles.buttonsContainer, { width: screenWidth * 0.9 }]}>
            <TouchableOpacity style={styles.addVehicleContainer}>
              <Ionicons name="add-circle-outline" size={24} color="black" />
              <Text style={styles.addVehicleText}>Add Vehicle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.earnButton}>
              <Text style={styles.earnButtonText}>Earn with us!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.userParkings}>
        <View
          style={[
            styles.parkingAvailabilityContainer,
            { width: screenWidth * 0.9 },
          ]}
        >
          <ParkingAvailability />
        </View>
        <View>
          <ParkingServices />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileNav: {
    backgroundColor: "rgba(255, 214, 19, 1)",
  },
  profileScreenContainer: {
    backgroundColor: "rgba(19, 18, 18, 1)",
    padding: 16,
    alignItems: "center",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 36,
    alignItems: "center",
  },
  profileHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    borderRadius: 28,
    overflow: "hidden",
    width: 56,
    height: 56,
  },
  profileInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: "300",
    marginLeft: 4,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  bottomSection: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addVehicleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 1)",
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    marginRight: 8,
  },
  addVehicleText: {
    marginLeft: 8,
  },
  earnButton: {
    borderRadius: 10,
    backgroundColor: "rgba(19, 18, 18, 1)",
    padding: 15,
    flex: 1,
    alignItems: "center",
  },
  earnButtonText: {
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
  userParkings: {
    // backgroundColor: "black",
  },
  parkingAvailabilityContainer: {
    marginTop: 24,
  },
});

export default UserHomeScreen;
