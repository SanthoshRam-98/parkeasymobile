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
// import { useNavigation } from "@react-navigation/native";
const BookingScreen0 = ({ navigation }) => {
  const mapRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [scaleValue] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  // const navigations = useNavigation;
  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

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
        latitudeDelta: 0.015, // Adjust the zoom level
        longitudeDelta: 0.0121,
      });
      setUserLocation(location.coords); // Store the user's location
      setLoading(false);
    };

    fetchUserLocation();
  }, []);

  const onMapReady = () => {
    if (region) {
      mapRef.current?.animateToRegion(region, 500); // Optional: animate to user's location
    }
  };
  const handleSubmit = () => {
    navigation.navigate("BookScreen1");
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#FFC107"
            style={styles.loadingIndicator}
          />
        ) : (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            loadingEnabled={true}
            initialRegion={region}
            style={styles.map}
            onMapReady={onMapReady}
          />
        )}
      </View>

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

      <TouchableOpacity style={styles.bookButton} onPress={handleSubmit}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 12,
    paddingHorizontal: 18,
    margin: 16,
    zIndex: 10,
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    flex: 1,
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
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#000",
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    color: "white",
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
    backgroundColor: "#444",
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
    zIndex: 10,
  },
});

export default BookingScreen0;
