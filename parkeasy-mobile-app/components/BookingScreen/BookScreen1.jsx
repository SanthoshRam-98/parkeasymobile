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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
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
  const [filteredParkingSpaces, setFilteredParkingSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
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
        setLoading(false); // Stop loading even if permission denied
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("User location fetched:", location.coords);
      setUserLocation(location.coords); // Save user's location
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setLoading(false); // Stop loading when location is set
    };

    fetchUserLocation();
  }, []);

  useEffect(() => {
    // Fetch parking spaces data
    const fetchParkingSpaces = async () => {
      try {
        const response = await axios.get(
          "http://192.168.225.160:3000/api/v1/parking_spaces"
        );
        console.log("Parking spaces fetched:", response.data);
        setParkingSpaces(response.data);
        setFilteredParkingSpaces(response.data); // Initially, set the filtered spaces as the full list
      } catch (error) {
        console.error("Error fetching parking spaces:", error);
        Alert.alert("Error", "Failed to fetch parking spaces.");
      }
    };

    fetchParkingSpaces();
  }, []);

  const handleSearch = () => {
    console.log("handleSearch called");
    setSearchLoading(true); // Start loading animation

    setTimeout(() => {
      const query = searchQuery.trim().toLowerCase();
      console.log("Search query:", query);

      if (!query) {
        setFilteredParkingSpaces(parkingSpaces); // Reset to full list when search query is empty
        setSearchLoading(false); // Stop loading
        return;
      }

      // Filter parking spaces based on building name, city, or location name
      const filteredSpaces = parkingSpaces.filter((space) => {
        const buildingName = space.building_name
          ? space.building_name.toLowerCase()
          : "";
        const city = space.city ? space.city.toLowerCase() : "";
        const locationName = space.location_name
          ? space.location_name.toLowerCase()
          : "";

        return (
          buildingName.includes(query) ||
          city.includes(query) ||
          locationName.includes(query)
        );
      });

      setFilteredParkingSpaces(filteredSpaces); // Update filtered spaces
      setSearchLoading(false); // Stop loading
    }, 2000); // Simulate a 2-second loading delay
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text); // Update the search query as user types

    const query = text.trim().toLowerCase();

    // Dynamically filter parking spaces as the user types
    const filteredSpaces = parkingSpaces.filter((space) => {
      const buildingName = space.building_name
        ? space.building_name.toLowerCase()
        : "";
      const city = space.city ? space.city.toLowerCase() : "";
      const locationName = space.location_name
        ? space.location_name.toLowerCase()
        : "";

      return (
        buildingName.includes(query) ||
        city.includes(query) ||
        locationName.includes(query)
      );
    });

    setFilteredParkingSpaces(filteredSpaces); // Update the list as user types
  };

  const renderParkingSpot = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("BookScreen2", {
          parkingSpot: item,
          userLocation: userLocation, // Use userLocation directly
        })
      }
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
            style={styles.map}
            region={mapRegion}
          />
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchCardContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search parking spaces"
            placeholderTextColor="rgba(140, 140, 140, 1)"
            value={searchQuery}
            onChangeText={handleSearchChange} // Dynamically update results as user types
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            activeOpacity={0.7}
          >
            {searchLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : searchQuery.length > 0 ? ( // Show tick when query exists
              <Ionicons name="checkmark" size={24} color="#fff" />
            ) : (
              <Ionicons name="search" size={24} color="#fff" /> // Default lens icon
            )}
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.cardsContainer,
            { transform: [{ translateY: cardsVisible }] },
          ]}
        >
          <FlatList
            data={filteredParkingSpaces}
            renderItem={renderParkingSpot}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No parking spaces found.</Text>
              </View>
            }
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
  calloutText: {
    fontWeight: "bold",
    color: "#FFC107",
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    color: "white",
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
  cardAlign: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
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
    fontWeight: "bold",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default BookingScreen;
