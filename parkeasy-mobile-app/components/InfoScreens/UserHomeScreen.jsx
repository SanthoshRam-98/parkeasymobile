import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For icons
import { AntDesign } from "@expo/vector-icons"; // Example for more icons
import { FontAwesome } from "@expo/vector-icons"; // Example for more icons
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={{ uri: "YOUR_AVATAR_URL" }} // Replace with your avatar URL
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.username}>Kaarthikeyan S V</Text>
          <Text style={styles.location}>Chennai</Text>
          <TouchableOpacity style={styles.searchButton}>
            <MaterialIcons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addVehicleButton}>
          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("VehicleInputs")}
          >
            Add Vehicle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.earnButton}
          onPress={() => navigation.navigate("ListYourSpaceScreen")}
        >
          <Text style={styles.buttonText}>Earn with us!</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Around you</Text>
        <View style={styles.mapContainer}>
          {/* Replace with your Map component */}
          <View style={styles.mapPlaceholder}>
            <Text style={styles.mapPlaceholderText}>Map Placeholder</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Parking Availability</Text>
        <View style={styles.parkingAvailability}>
          <TouchableOpacity
            style={styles.parkingButton}
            onPress={() => navigation.navigate("BookScreen0")}
          >
            <Text style={styles.parkingButtonText}>Car</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.parkingButton}>
            <Text style={styles.parkingButtonText}>Bike</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Parking Services</Text>
        <View style={styles.servicesContainer}>
          <View style={styles.serviceButton}>
            <Text>Workplace</Text>
          </View>
          <View style={styles.serviceButton}>
            <Text>Shopping Mall</Text>
          </View>
          <View style={styles.serviceButton}>
            <Text>Restaurants</Text>
          </View>
          <View style={styles.serviceButton}>
            <Text>Residential area</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Premium Plans</Text>
        <View style={styles.plansContainer}>
          <TouchableOpacity style={styles.planButton}>
            <Text style={styles.buttonText}>Monthly Parking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.planButton}>
            <Text style={styles.buttonText}>Yearly Parking</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Trending</Text>
        <View style={styles.trendingContainer}>
          <Text style={styles.trendingText}>Save ₹500</Text>
          <Text style={styles.trendingSubtitle}>On Your First EV Parking</Text>
          <Text>We provide dedicated monthly parking with surveillance</Text>
          <Text>100 + Happy Customers</Text>
        </View>

        <Text style={styles.sectionTitle}>Exclusive Offers</Text>
        <View style={styles.offersContainer}>
          <TouchableOpacity style={styles.offerButton}>
            <Text>Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerButton}>
            <Text>Discounts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerButton}>
            <Text>Refer & Win</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNavBar}>
        <TouchableOpacity style={styles.navButton}>
          <AntDesign name="home" size={24} color="#000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="favorite-border" size={24} color="#000" />
          <Text style={styles.navText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <FontAwesome name="user" size={24} color="#000" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <MaterialIcons name="settings" size={24} color="#000" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(19, 18, 18, 1)",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80, // Add padding to accommodate the bottom navigation
  },
  header: {
    backgroundColor: "#FFEB3B",
    paddingVertical: 20,
    alignItems: "center",
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    fontSize: 18,
    fontWeight: "500", // Changed to '500' for consistency
  },
  location: {
    fontSize: 14,
    color: "#888",
  },
  searchButton: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  addVehicleButton: {
    backgroundColor: "#FFEB3B",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  earnButton: {
    backgroundColor: "#FFEB3B",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500", // Changed to '500' for consistency
    marginTop: 20,
  },
  mapContainer: {
    height: 200,
    backgroundColor: "#ddd",
    marginVertical: 10,
    borderRadius: 10,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapPlaceholderText: {
    color: "#888",
  },
  parkingAvailability: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  parkingButton: {
    backgroundColor: "#FFEB3B",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  parkingButtonText: {
    fontSize: 16,
    fontWeight: "500", // Changed to '500' for consistency
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceButton: {
    backgroundColor: "#FFEB3B",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
    marginVertical: 5,
  },
  plansContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  planButton: {
    backgroundColor: "#FFEB3B",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  trendingContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  trendingText: {
    fontSize: 20,
    fontWeight: "500", // Changed to '500' for consistency
    color: "#FF5722",
  },
  trendingSubtitle: {
    fontSize: 16,
  },
  offersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  offerButton: {
    backgroundColor: "#FFEB3B",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  bottomNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#000",
  },
});

export default HomeScreen;
