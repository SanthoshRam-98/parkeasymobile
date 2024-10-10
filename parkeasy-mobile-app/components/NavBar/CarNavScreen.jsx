import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigationBar from "../InfoScreens/BottomNavigationBar";
import CarImage from "../../screenImages/Vehicles/CarImage.svg";
import BikeImage from "../../screenImages/Vehicles/CycleImage.svg";

function MyVehicleScreen({ route }) {
  const navigation = useNavigation();
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(null);
  const [vehicleList, setVehicleList] = useState([]);
  const [activeNavIndex, setActiveNavIndex] = useState(1);

  useEffect(() => {
    if (route.params?.vehicleNumber && route.params?.vehicleName) {
      setVehicleList((prevVehicles) => [
        ...prevVehicles,
        {
          name: route.params.vehicleName,
          licensePlate: route.params.vehicleNumber,
          image: CarImage, // Default image
          ownerName: "Kaarthikeyan S V", // Add owner name or fetch dynamically
        },
      ]);
    }
  }, [route.params]);

  const handleAddVehicle = () => {
    navigation.navigate("VehicleInputs");
  };

  const renderVehicleCard = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.vehicleCard,
        index === activeVehicleIndex && styles.activeVehicleCard,
        index === activeVehicleIndex && styles.activeBorder,
      ]}
      onPress={() => {
        setActiveVehicleIndex(index);
        navigation.navigate("VehicleDetails", {
          vehicleName: item.name,
          vehicleNumber: item.licensePlate,
          ownerName: item.ownerName,
        });
      }}
    >
      <View style={styles.infoContainer}>
        {React.createElement(item.image, { width: 80, height: 80 })}
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.licensePlate}>{item.licensePlate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Vehicle</Text>
      </View>

      <View style={styles.vehicleList}>
        {vehicleList.map((vehicle, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.vehicleCard,
              index === activeVehicleIndex && styles.activeVehicleCard,
              index === activeVehicleIndex && styles.activeBorder,
            ]}
            onPress={() => {
              setActiveVehicleIndex(index);
              navigation.navigate("VehicleDetails", {
                vehicleName: vehicle.name,
                vehicleNumber: vehicle.licensePlate,
                ownerName: vehicle.ownerName,
              });
            }}
          >
            <View style={styles.infoContainer}>
              {React.createElement(vehicle.image, { width: 80, height: 80 })}
              <View style={styles.textContainer}>
                <Text style={styles.name}>{vehicle.name}</Text>
                <Text style={styles.licensePlate}>{vehicle.licensePlate}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add Vehicle Button */}
        <TouchableOpacity style={styles.vehicleCard} onPress={handleAddVehicle}>
          <View style={styles.infoContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="add" size={40} color="rgba(255, 214, 19, 1)" />
              <View style={styles.textContainer}>
                <Text style={styles.name}>Add Vehicle</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <BottomNavigationBar
        navigationItems={[
          { iconName: "home-outline", route: "UserHomeScreen" },
          { iconName: "car-outline", route: "CarNav" },
          { iconName: "calendar-outline", route: "BookingNav" },
          { iconName: "person-outline", route: "ProfileNav" },
        ]}
        activeIndex={activeNavIndex}
        setActiveIndex={setActiveNavIndex}
        style={styles.bottomNav}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, backgroundColor: "#1a1a1a" },
  header: { marginBottom: 16, marginTop: 16 },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgba(255, 214, 19, 1)",
  },
  vehicleCard: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#333",
    alignItems: "flex-start",
  },
  activeVehicleCard: { backgroundColor: "rgba(255, 214, 19, 0.3)" },
  activeBorder: { borderColor: "rgba(255, 214, 19, 1)", borderWidth: 1 },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
  },
  textContainer: { marginLeft: 16 },
  name: { fontSize: 16, color: "rgba(255, 214, 19, 1)" },
  licensePlate: { fontSize: 12, color: "rgba(255, 255, 255, 0.7)" },
  iconContainer: { flexDirection: "row", alignItems: "center" },
  bottomNav: { width: "100%" },
});

export default MyVehicleScreen;
