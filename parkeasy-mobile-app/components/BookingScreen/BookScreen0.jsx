import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

// Custom Marker Component
const CustomMarker = ({ coordinate, label }) => (
  <View
    style={[
      styles.marker,
      { top: coordinate.latitude, left: coordinate.longitude },
    ]}
  >
    <Text style={styles.markerText}>{label}</Text>
  </View>
);

const BookingScreen0 = ({ navigation }) => {
  const mapRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [scaleValue] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null); // Initialize with null

  useEffect(() => {
    // Trigger the card popup animation on component mount
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 700, // Adjusted duration for a slower animation
      useNativeDriver: true,
    }).start();

    // Fetch user location on mount
    const fetchUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setLoading(false); // Stop loading once the location is fetched
    };

    fetchUserLocation();
  }, []);

  // Handle region change for the map
  const onMapReady = () => {
    setLoading(false); // Stop loading once the map is ready
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Ensure navigation prop is correct
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Map View */}
      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FFC107"
            style={styles.loadingIndicator}
          />
        ) : (
          <MapView
            ref={mapRef} // Correctly placed ref here
            provider={PROVIDER_GOOGLE} // Use Google Maps
            showsUserLocation={true} // Show user location on the map
            loadingEnabled={true} // Enable loading indicator on the map
            onMapReady={onMapReady} // Stop loading when the map is ready
            initialRegion={region} // Use the fetched user location
            style={styles.map} // Ensure you apply styles
          >
            <CustomMarker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              label="You are here"
            />
          </MapView>
        )}

        {/* "You are here" label positioned over the map */}
        <View style={styles.currentLocationLabel}>
          <Text style={styles.currentLocationText}>You are here</Text>
        </View>
      </View>

      {/* Parking Options */}
      <Animated.View
        style={[
          styles.optionsContainer,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "EV Parking" && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption("EV Parking")}
        >
          <Text style={styles.optionText}>EV Parking</Text>
          <View
            style={[
              styles.radioButton,
              selectedOption === "EV Parking" && styles.selectedRadio,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === "Simple Parking" && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption("Simple Parking")}
        >
          <Text style={styles.optionText}>Simple Parking</Text>
          <View
            style={[
              styles.radioButton,
              selectedOption === "Simple Parking" && styles.selectedRadio,
            ]}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Book Now Button at the bottom */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background color
  },
  backButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    margin: 16,
    zIndex: 10, // Ensure it's above the map
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  mapContainer: {
    flex: 1, // Allow the map to take remaining space
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: "hidden", // Ensure children don’t overflow the container
  },
  map: {
    flex: 1,
  },
  currentLocationLabel: {
    position: "absolute",
    bottom: 100, // Adjust based on button height
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  currentLocationText: {
    fontSize: 16,
    color: "#000",
  },
  optionsContainer: {
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16, // Space from the bottom
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#000", // Black background for option buttons
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: "white", // Change text color for better visibility
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  selectedOption: {
    borderColor: "#FFC107",
    backgroundColor: "#444", // Slightly darker background for selected
  },
  selectedRadio: {
    backgroundColor: "#FFC107",
  },
  bookButton: {
    backgroundColor: "#FFC107",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    margin: 16,
  },
  bookButtonText: {
    fontSize: 18,
    color: "#000",
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 10, // Ensure it's above the map
  },
  marker: {
    position: "absolute",
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
  },
  markerText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default BookingScreen0;
