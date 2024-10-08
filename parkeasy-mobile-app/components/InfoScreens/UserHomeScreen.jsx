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
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import ParkingAvailability from "./ParkingAvailability";
import ParkingServices from "./ParkingServices";
import TrendingSection from "./TrendingSection";
import OfferCard from "./OfferCard";
import ExclusiveOffers from "./ExclusiveOffers";
import BottomNavigationBar from "./BottomNavigationBar";
import BottomImage1 from "../../screenImages/bottomimage1.svg";
import BottomImage2 from "../../screenImages/bottomimage2.svg";
import BottomImage3 from "../../screenImages/bottomimage3.svg";
import BottomImage4 from "../../screenImages/bottomimage4.svg";

const UserHomeScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation(); // Hook to access navigation

  const navigationItems = [
    {
      Component: BottomImage1,
      isActive: true,
    },
    {
      Component: BottomImage2,
      isActive: false,
    },
    {
      Component: BottomImage3,
      isActive: false,
    },
    {
      Component: BottomImage4,
      isActive: false,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.profileScreenContainer}>
        <View style={styles.profileNav}>
          <View style={[styles.topSection, { width: screenWidth * 0.9 }]}>
            <View style={styles.profileHeaderContainer}>
              <View style={styles.profileImage}>
                <Ionicons
                  name="person-circle-outline"
                  size={56}
                  color="black"
                />
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
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomSection}>
            <View style={[styles.buttonsContainer]}>
              {/* Add Vehicle button */}
              <TouchableOpacity
                style={styles.addVehicleContainer}
                onPress={() => navigation.navigate("AddVehicleScreen")} // Navigate to AddVehicleScreen
              >
                <Ionicons name="add-circle-outline" size={24} color="black" />
                <Text style={styles.addVehicleText}>Add Vehicle</Text>
              </TouchableOpacity>

              {/* Earn with us! button */}
              <TouchableOpacity
                style={styles.earnButton}
                onPress={() => navigation.navigate("EarnScreen")} // Navigate to EarnScreen
              >
                <Text style={styles.earnButtonText}>Earn with us!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.userParkings}>
          <View style={[styles.parkingAvailabilityContainer]}>
            <ParkingAvailability />
          </View>
          <View>
            <ParkingServices />
          </View>
          <View>
            <TrendingSection />
          </View>
          <View>
            <OfferCard />
          </View>
          <View>
            <ExclusiveOffers />
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Navigation Bar */}
      <BottomNavigationBar navigationItems={navigationItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure the container takes the full screen height
  },
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
    padding: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  earnButtonText: {
    fontSize: 14,
    color: "#ffffff",
  },
  userParkings: {
    width: "100%",
    marginBottom: 80, // Ensure there's enough space for the bottom navigation bar
  },
  parkingAvailabilityContainer: {
    marginBottom: 16,
  },
});

export default UserHomeScreen;
