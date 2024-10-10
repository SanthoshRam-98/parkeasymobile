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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const parkingOptions = [
  {
    type: "Car",
    iconName: "car-outline",
  },
  {
    type: "Bike",
    iconName: "bicycle-outline",
  },
];

function ParkingAvailability() {
  const navigation = useNavigation();

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
        onPress={() => navigation.navigate("FullScreenMap")}
      >
        <Ionicons name="expand" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Parking Availability</Text>
        <View style={styles.optionsContainer}>
          {parkingOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionContainer,
                index === 0
                  ? styles.selectedContainer
                  : styles.unselectedContainer,
              ]}
              onPress={() =>
                index === 0 ? navigation.navigate("VehicleInputs") : null
              }
            >
              <Ionicons
                name={option.iconName}
                size={32}
                color={index === 0 ? "rgba(255, 214, 19, 1)" : "white"}
              />
              <Text
                style={[
                  styles.optionText,
                  index === 0 ? styles.selectedText : styles.unselectedText,
                ]}
              >
                {option.type}
              </Text>
            </TouchableOpacity>
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
    height: Dimensions.get("window").height * 0.35, // More responsive height
  },
  maximizeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  title: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12, // Add gap for spacing between options
  },
  optionContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  selectedContainer: {
    borderColor: "rgba(255, 214, 19, 1)",
    borderWidth: 1,
    backgroundColor: "rgba(32, 32, 32, 1)",
  },
  unselectedContainer: {
    backgroundColor: "rgba(32, 32, 32, 1)",
  },
  optionText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: "500",
  },
  selectedText: {
    color: "rgba(255, 214, 19, 1)",
  },
  unselectedText: {
    color: "rgba(255, 255, 255, 1)",
  },
});

export default ParkingAvailability;
