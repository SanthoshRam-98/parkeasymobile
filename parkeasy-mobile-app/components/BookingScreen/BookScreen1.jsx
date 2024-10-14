import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";

const BookScreen1 = () => {
  // Sample parking data
  const parkingSpaces = [
    {
      id: "1",
      name: "RR Parking",
      distance: "3.2 km",
      duration: "16 min",
      rate: "20",
      location: "Vadapalani, Chennai",
      rating: "4.2",
      image: "https://example.com/image1.jpg", // Replace with your image URLs
    },
    {
      id: "2",
      name: "JJ Parking Lot",
      distance: "2.6 km",
      duration: "10 min",
      rate: "30",
      location: "Kodambakkam, Chennai",
      rating: "4.7",
      image: "https://example.com/image2.jpg", // Replace with your image URLs
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.0827, // Replace with your latitude
          longitude: 80.2707, // Replace with your longitude
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* <Marker
          coordinate={{ latitude: 13.0827, longitude: 80.2707 }}
          title="You are here"
        /> */}
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.locationText}>You are here</Text>
      </View>

      <FlatList
        data={parkingSpaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.parkingCard}>
            <Image source={{ uri: item.image }} style={styles.parkingImage} />
            <View style={styles.parkingInfo}>
              <Text style={styles.parkingName}>{item.name}</Text>
              <View style={styles.parkingDetails}>
                <Text style={styles.parkingDistance}>
                  {item.distance} | {item.duration} | ₹{item.rate}/Hr
                </Text>
                <Text style={styles.parkingLocation}>{item.location}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={18} color="#FFC107" />
                <Text style={styles.parkingRating}>{item.rating}</Text>
              </View>
            </View>
          </View>
        )}
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "60%",
  },
  overlay: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
  },
  locationText: {
    backgroundColor: "#FFC107",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    color: "#000",
    fontWeight: "bold",
  },
  list: {
    marginTop: 10,
  },
  parkingCard: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  parkingImage: {
    width: 100,
    height: 100,
  },
  parkingInfo: {
    flex: 1,
    padding: 10,
  },
  parkingName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  parkingDetails: {
    marginTop: 5,
  },
  parkingDistance: {
    color: "#666",
  },
  parkingLocation: {
    color: "#999",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  parkingRating: {
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default BookScreen1;
