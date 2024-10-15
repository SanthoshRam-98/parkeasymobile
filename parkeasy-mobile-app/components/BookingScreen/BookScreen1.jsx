import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // Use Marker if you want
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";

const BookingScreen = ({ navigation }) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cardsVisible] = useState(new Animated.Value(300));
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Animate cards when the component mounts
    Animated.timing(cardsVisible, {
      toValue: 0,
      duration: 500,
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
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      setUserLocation(location.coords);
      setLoading(false);
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    // Fetch parking spaces data
    axios
      .get("http://192.168.225.160:3000/api/v1/parking_spaces")
      .then((response) => {
        setParkingSpaces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking spaces:", error);
      });
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setSearchLoading(true); // Show loading indicator
      try {
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=YOUR_API_KEY`; // Replace with your Google API key
        const response = await axios.get(geoUrl);

        if (response.data.results.length === 0) {
          Alert.alert(
            "Location not found",
            "Please try searching for another location."
          );
          return;
        }

        const { lat, lng } = response.data.results[0].geometry.location;

        // Log search details
        console.log("Searched Place Details: ", response.data.results[0]);

        setMapRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        // Smoothly navigate to the searched location
        mapRef.current?.animateToRegion(
          {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          },
          500
        );
      } catch (error) {
        console.error("Error fetching location:", error);
        Alert.alert("Error", "Failed to search for location.");
      } finally {
        setSearchLoading(false); // Hide loading indicator
      }
    }
  };

  const renderParkingSpot = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("BookScreen2", { parkingSpot: item })} // Pass the selected parking spot data
    >
      {item.parking_images && item.parking_images.length > 0 && (
        <Image
          source={{ uri: item.parking_images[0] }}
          style={styles.cardImage}
        />
      )}
      <View style={styles.cardDetails}>
        <View style={styles.cardAlign}>
          <Text style={styles.cardTitle}>{item.building_name || "N/A"}</Text>
          <Text style={styles.cardSubtitle}>
            {item.distance ? `${item.distance} | ` : ""}
            {item.time ? `${item.time} | ` : ""}
            <Text style={styles.rateText}>
              {item.hourly_rate ? `${item.hourly_rate}/hr` : "N/A"}
            </Text>
          </Text>
          <Text style={styles.cardAddress}>
            {item.city || "No address provided"}
          </Text>
        </View>
        <View style={styles.cardRating}>
          <Ionicons name="star" size={16} color="#FFC107" />
          <Text style={styles.cardRatingText}>
            {item.location_name || "Unknown"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
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
            region={mapRegion} // Control the map region with state
          ></MapView>
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      {/* Search and Card Section */}
      <View style={styles.searchCardContainer}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#fff" />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchLoading ? (
            <ActivityIndicator size="small" color="#FFC107" />
          ) : (
            <TouchableOpacity onPress={handleSearch}>
              <Ionicons name="mic" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Cards Container */}
        <Animated.View
          style={[
            styles.cardsContainer,
            { transform: [{ translateY: cardsVisible }] },
          ]}
        >
          <FlatList
            data={parkingSpaces}
            renderItem={renderParkingSpot}
            keyExtractor={(item) => item.id.toString()}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  mapContainer: {
    flex: 1.5,
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Back button background for visibility
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  searchCardContainer: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 10,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#888",
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    marginHorizontal: 10,
  },
  cardsContainer: {
    backgroundColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  card: {
    backgroundColor: "#1c1c1c",
    borderRadius: 15,
    flexDirection: "row",
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  cardDetails: {
    alignItems: "center",
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#888",
    marginTop: 4,
  },
  rateText: {
    color: "#FFC107",
  },
  cardAddress: {
    color: "#888",
    marginTop: 2,
  },
  cardRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cardRatingText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 4,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  rateText: {
    color: "#FFC107",
    fontWeight: "bold",
  },
});

export default BookingScreen;
