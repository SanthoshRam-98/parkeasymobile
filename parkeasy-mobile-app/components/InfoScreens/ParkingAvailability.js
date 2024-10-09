import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const parkingOptions = [
  {
    type: "Car",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f03793c3740ebfd18281d2c6a4275c19cd79ded745b0f2b7b58fd3e7abb107c2?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
  },
  {
    type: "Bike",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/6f40ea27f708bdef2091c4856f72563f27dbda8b2c66b4a7f43bf714ce5a5a46?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
  },
];

function ParkingAvailability() {
  const navigation = useNavigation(); // Get navigation object

  return (
    <View
      style={[styles.container, { padding: Platform.OS === "web" ? 20 : 10 }]}
    >
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity
        style={styles.maximizeButton}
        onPress={() => navigation.navigate("FullScreenMap")} // Navigate to FullScreenMap
      >
        <Ionicons name="expand" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Parking Availability</Text>
        </View>
        <View style={styles.optionsContainer}>
          {parkingOptions.map((option, index) => (
            <View
              key={index}
              style={[
                styles.optionContainer,
                index === 0
                  ? styles.selectedContainer
                  : styles.unselectedContainer,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  index === 0 ? styles.selectedText : styles.unselectedText,
                ]}
              >
                {option.type}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(19, 18, 18, 1)",
  },
  map: {
    width: "100%",
    height: Dimensions.get("window").height * 0.4, // 40% of screen height
  },
  maximizeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add background for visibility
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  titleContainer: {
    alignSelf: "flex-start",
  },
  title: {
    color: "rgba(255, 255, 255, 1)",
  },
  optionsContainer: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionContainer: {
    borderRadius: 10,
    padding: 12,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedContainer: {
    borderWidth: 1,
    borderColor: "rgba(255, 214, 19, 1)",
  },
  unselectedContainer: {
    backgroundColor: "rgba(32, 32, 32, 1)",
  },
  optionText: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    fontSize: 16,
  },
  selectedText: {
    color: "rgba(255, 214, 19, 1)",
  },
  unselectedText: {
    color: "rgba(255, 255, 255, 1)",
  },
});

export default ParkingAvailability;
