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

const BookingScreen0 = ({ navigation }) => {
  const mapRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [scaleValue] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

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
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      setUserLocation(location.coords);
      setLoading(false);
    };

    fetchUserLocation();
  }, []);

  const onMapReady = () => {
    if (region) {
      mapRef.current?.animateToRegion(region, 500);
    }
  };

  const handleSubmit = () => {
    navigation.navigate("BookScreen1");
  };

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
            onMapReady={onMapReady}
          />
        )}

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardBox}>
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
              styles.cardContainer,
              selectedOption === "EV Parking" && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption("EV Parking")}
          >
            <Text style={styles.cardTitle}>EV Parking</Text>
            <View
              style={[
                styles.radioButton,
                selectedOption === "EV Parking" && styles.selectedRadio,
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.cardContainer,
              selectedOption === "Simple Parking" && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption("Simple Parking")}
          >
            <Text style={styles.cardTitle}>Simple Parking</Text>
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
  cardBox: {
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    paddingVertical: 20,
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 20, // Responsive borderRadius for cardBox
    // marginHorizontal: 16,
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 12,
    padding: 16,
    backgroundColor: "#000",
    // borderRadius: 20, // Responsive borderRadius
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  cardContainer: {
    borderRadius: 15,
    flexDirection: "row",
    // alignItems: "center",
    padding: 16,
    // paddingTop: 10,
    marginBottom: 15,
    // elevation: 2,
    justifyContent: "space-between",
    borderColor: "#888",
    borderWidth: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#000",
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
    marginTop: 10,
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
