import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

const FullScreenMapWithSearch = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef(null); // Create a ref for the MapView

  const handleSearch = async () => {
    // Assuming the search query format is "landmark, town"
    const query = searchQuery.trim();

    if (!query) {
      Alert.alert("Please enter a landmark and a town.");
      return;
    }

    try {
      // Use OpenStreetMap Nominatim API to fetch coordinates
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0]; // Get the latitude and longitude from the response
        const newRegion = {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          latitudeDelta: 0.01, // Zoom level
          longitudeDelta: 0.01,
        };

        // Animate the map to the new region
        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000); // 1000 ms for smooth transition
        }

        console.log("Zooming to:", query, newRegion);
      } else {
        Alert.alert(
          "Location not found",
          "Please try searching for another landmark."
        );
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Failed to search for location.");
    }

    // Reset search query
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.mapText}>Map</Text>
      </View>

      {/* MapView with ref for smooth animation */}
      <MapView
        ref={mapRef} // Attach the ref to MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="white" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a landmark, town"
          placeholderTextColor="rgba(140, 140, 140, 1)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Trigger search when user submits
        />
        <Ionicons
          name="mic-outline"
          size={24}
          color="white"
          style={styles.optionsIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "black",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: "auto",
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  mapText: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 16,
    textAlign: "center",
    flex: 1,
    alignSelf: "center",
  },
  searchContainer: {
    borderRadius: 10,
    borderColor: "rgba(140, 140, 140, 1)",
    borderWidth: 1,
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: "black",
    marginHorizontal: 20,
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    color: "white",
  },
});

export default FullScreenMapWithSearch;
