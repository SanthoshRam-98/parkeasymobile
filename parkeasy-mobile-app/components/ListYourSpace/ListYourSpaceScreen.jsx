import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps"; // No Marker import
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ListYourSpaceScreen = () => {
  const [region, setRegion] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [city, setCity] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      try {
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const { latitude, longitude } = coords;

        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setCoordinates({ latitude, longitude }); // Save the coordinates

        // Reverse geocoding to get location name and city
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (address.length > 0) {
          const { name, city, district, region } = address[0];
          setLocationName(name || "Unknown Location"); // Village or town name
          setCity(
            `${district || "Unknown District"}, ${region || "Unknown State"}`
          ); // District and state
        }
      } catch (error) {
        console.error("Error fetching location: ", error);
        Alert.alert("Error fetching location", "Unable to get your location.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchLocation();
  }, []);

  const handleAddressFetch = () => {
    if (coordinates) {
      navigation.navigate("ParkingSpaceDetailsScreen", {
        location: {
          coordinates,
          locationName,
          city,
        },
      }); // Pass the coordinates, location name, and city
    } else {
      Alert.alert("Error", "Unable to fetch location. Try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>List your Space</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFD613" />
          <Text style={styles.loadingText}>Fetching your location...</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          followsUserLocation={true}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        >
          {coordinates && (
            <View
              style={[
                styles.defaultMarker,
                {
                  position: "absolute",
                  top: region.latitude,
                  left: region.longitude,
                },
              ]}
            />
          )}
        </MapView>
      )}

      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
          {locationName || "Location Name"}
        </Text>
        <Text style={styles.cityText}>{city || "City"}</Text>
      </View>

      <TouchableOpacity
        style={styles.addressButton}
        onPress={handleAddressFetch}
      >
        <Text style={styles.addressButtonText}>Use this Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1a1a1a",
  },
  headerTitle: {
    color: "#FFD613",
    fontSize: 18,
    marginLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#FFD613",
    marginTop: 10,
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
  locationContainer: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  locationText: {
    color: "#FFD613",
    fontSize: 16,
    fontWeight: "bold",
  },
  cityText: {
    color: "#FFF",
    fontSize: 14,
  },
  addressButton: {
    backgroundColor: "#FFD613",
    padding: 16,
    borderRadius: 10,
    margin: 16,
    alignItems: "center",
  },
  addressButtonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 16,
  },
  // Marker styles
  defaultMarker: {
    height: 30,
    width: 30,
    backgroundColor: "yellow",
    borderRadius: 15, // Making it circular
    borderColor: "red", // Optional: border color
    borderWidth: 2, // Optional: border width
    position: "absolute",
    transform: [{ translateX: -15 }, { translateY: -15 }], // Centering the marker
  },
});

export default ListYourSpaceScreen;
