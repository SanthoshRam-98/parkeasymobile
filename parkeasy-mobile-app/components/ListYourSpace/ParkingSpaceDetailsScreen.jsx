import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const ParkingSpaceDetailsScreen = () => {
  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");
  const [twoWheelerCount, setTwoWheelerCount] = useState(0);
  const [fourWheelerCount, setFourWheelerCount] = useState(0);
  const [parkingImages, setParkingImages] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const features = [
    { icon: "videocam", name: "CCTV" },
    { icon: "sunny", name: "Lighting" },
    { icon: "shield", name: "Security Guard" },
    { icon: "home", name: "Basement" },
    { icon: "car-sport", name: "Covered Parking" },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setParkingImages([...parkingImages, result.uri]);
    }
  };

  const increaseCounter = (type) => {
    if (type === "two") setTwoWheelerCount(twoWheelerCount + 1);
    if (type === "four") setFourWheelerCount(fourWheelerCount + 1);
  };

  const decreaseCounter = (type) => {
    if (type === "two" && twoWheelerCount > 0)
      setTwoWheelerCount(twoWheelerCount - 1);
    if (type === "four" && fourWheelerCount > 0)
      setFourWheelerCount(fourWheelerCount - 1);
  };

  const toggleFeature = (featureName) => {
    if (selectedFeatures.includes(featureName)) {
      setSelectedFeatures(
        selectedFeatures.filter((feature) => feature !== featureName)
      );
    } else {
      setSelectedFeatures([...selectedFeatures, featureName]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={30} color="#FFD613" />
          </TouchableOpacity>
          <Text style={styles.header}>Parking Space Details</Text>
        </View>

        {/* Building Name */}
        <Text style={styles.sectionTitle}>Name of your Parking Space</Text>
        <TextInput
          style={styles.input}
          placeholder="Building Name"
          placeholderTextColor="#BFBFBF"
          value={buildingName}
          onChangeText={setBuildingName}
        />

        {/* Address */}
        <Text style={styles.sectionTitle}>Full address of parking spot</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Address"
          placeholderTextColor="#BFBFBF"
          value={address}
          onChangeText={setAddress}
          multiline={true}
        />

        {/* No. of parking spaces */}
        <Text style={styles.sectionTitle}>No. of parking spaces</Text>
        <View style={styles.counterContainer}>
          <View style={styles.counter}>
            <Ionicons name="bicycle" size={24} color="#FFD613" />
            <Text style={styles.counterLabel}>2 Wheeler</Text>
            <View style={styles.counterButtons}>
              <TouchableOpacity
                onPress={() => decreaseCounter("two")}
                style={styles.counterButton}
              >
                <Ionicons name="remove" size={20} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{twoWheelerCount}</Text>
              <TouchableOpacity
                onPress={() => increaseCounter("two")}
                style={styles.counterButton}
              >
                <Ionicons name="add" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.counter}>
            <Ionicons name="car" size={24} color="#FFD613" />
            <Text style={styles.counterLabel}>4 Wheeler</Text>
            <View style={styles.counterButtons}>
              <TouchableOpacity
                onPress={() => decreaseCounter("four")}
                style={styles.counterButton}
              >
                <Ionicons name="remove" size={20} color="#FFF" />
              </TouchableOpacity>
              <Text style={styles.counterValue}>{fourWheelerCount}</Text>
              <TouchableOpacity
                onPress={() => increaseCounter("four")}
                style={styles.counterButton}
              >
                <Ionicons name="add" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Parking Spot Images */}
        <Text style={styles.sectionTitle}>Parking Spot Images</Text>
        <View style={styles.imageContainer}>
          {parkingImages.length > 0 &&
            parkingImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.parkingImage}
              />
            ))}

          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="camera" size={30} color="#FFF" />
            <Text style={styles.uploadText}>Upload Images</Text>
          </TouchableOpacity>
        </View>

        {/* Add Parking Spot Features */}
        <Text style={styles.sectionTitle}>Add parking spot features</Text>
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.featureButton,
                selectedFeatures.includes(feature.name)
                  ? styles.featureButtonSelected
                  : {},
              ]}
              onPress={() => toggleFeature(feature.name)}
            >
              <Ionicons name={feature.icon} size={24} color="#FFD613" />
              <Text style={styles.featureText}>{feature.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1a1a1a",
  },
  backButton: {
    paddingRight: 10,
  },
  header: {
    color: "#FFD613", // Changed to yellow for header
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#FFF", // Changed section title color to white
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#333",
    color: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 0,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  counter: {
    flexDirection: "column",
    alignItems: "center",
    width: "48%",
  },
  counterLabel: {
    color: "#FFD613",
    fontSize: 16,
    marginBottom: 5,
  },
  counterButtons: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 5,
    borderRadius: 8,
  },
  counterButton: {
    paddingHorizontal: 10,
  },
  counterValue: {
    color: "#FFF",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  parkingImage: {
    width: "100%", // Ensures image uses full container width
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadText: {
    color: "#FFF",
    marginTop: 10,
    fontSize: 16,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureButton: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    marginVertical: 8,
  },
  featureButtonSelected: {
    backgroundColor: "#FFD613",
  },
  featureText: {
    color: "#FFF",
    marginTop: 10,
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#FFD613",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ParkingSpaceDetailsScreen;
