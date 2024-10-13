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
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useRoute
import axios from "axios"; // Import axios

const ParkingSpaceDetailsScreen = () => {
  const [buildingName, setBuildingName] = useState("");
  const [address, setAddress] = useState("");
  const [twoWheelerCount, setTwoWheelerCount] = useState(0);
  const [fourWheelerCount, setFourWheelerCount] = useState(0);
  const [parkingImages, setParkingImages] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [hourlyRate, setHourlyRate] = useState("");
  const [dayRate, setDayRate] = useState("");
  const [weekRate, setWeekRate] = useState("");
  const [monthRate, setMonthRate] = useState("");
  const [sixMonthsRate, setSixMonthsRate] = useState("");
  const [yearRate, setYearRate] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation();
  const features = [
    { icon: "videocam", name: "CCTV" },
    { icon: "sunny", name: "Lighting" },
    { icon: "shield", name: "Security Guard" },
    { icon: "home", name: "Basement" },
    { icon: "car-sport", name: "Covered Parking" },
  ];
  const route = useRoute(); // Use useRoute to access the navigation parameters
  const { location } = route.params; // Destructure the location from params
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      setParkingImages([...parkingImages, selectedImage]);
    }
  };

  const removeImage = (index) => {
    setParkingImages(parkingImages.filter((_, i) => i !== index));
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

  const handleSubmit = async () => {
    if (!buildingName || !address) {
      Alert.alert("Error", "Building name and address are required.");
      return;
    }

    setLoading(true); // Set loading to true

    try {
      // Prepare the form data
      const formData = new FormData();

      // Append the required fields from your schema
      formData.append("parking_space[building_name]", buildingName);
      formData.append("parking_space[address]", address);
      formData.append("parking_space[two_wheeler_count]", twoWheelerCount);
      formData.append("parking_space[four_wheeler_count]", fourWheelerCount);

      // Append parking images as files
      parkingImages.forEach((imageUri) => {
        const fileName = imageUri.split("/").pop();
        const fileType = fileName.split(".").pop();

        formData.append(`parking_space[parking_images][]`, {
          uri: imageUri,
          name: fileName,
          type: `image/${fileType}`,
        });
      });

      // Append selected features as a string (if saving as text or JSON)
      formData.append(
        "parking_space[selected_features]",
        selectedFeatures.join(",")
      );

      // Append rates based on your schema
      formData.append(
        "parking_space[hourly_rate]",
        parseFloat(hourlyRate) || 0
      );
      formData.append("parking_space[day_rate]", parseFloat(dayRate) || 0);
      formData.append("parking_space[week_rate]", parseFloat(weekRate) || 0);
      formData.append("parking_space[month_rate]", parseFloat(monthRate) || 0);
      formData.append(
        "parking_space[six_month_rate]",
        parseFloat(sixMonthsRate) || 0
      );
      formData.append("parking_space[year_rate]", parseFloat(yearRate) || 0);

      // Append location details
      formData.append(
        "parking_space[location_name]",
        location.location_name || ""
      );
      formData.append("parking_space[city]", location.city || "");
      formData.append(
        "parking_space[latitude]",
        location.coordinates?.latitude || 0
      );
      formData.append(
        "parking_space[longitude]",
        location.coordinates?.longitude || 0
      );

      // Send POST request to backend with FormData
      const response = await axios.post(
        "http://192.168.225.160:3000/api/v1/parking_spaces",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        navigation.navigate("ConfirmationScreen", {
          // Pass necessary data to confirmation screen
        });
      } else {
        Alert.alert("Error", "Failed to save parking space details");
      }
    } catch (error) {
      console.error("Error submitting data: ", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
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
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: image }} style={styles.parkingImage} />
                <TouchableOpacity
                  style={styles.removeIcon}
                  onPress={() => removeImage(index)}
                >
                  <Ionicons name="trash" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="camera" size={30} color="black" />
            <Text style={styles.uploadText}>Upload Images</Text>
          </TouchableOpacity>
        </View>

        {/* Charges Rate Form */}
        <Text style={styles.sectionTitle}>Charges You Rate</Text>
        <View style={styles.rateInputContainer}>
          <TextInput
            style={styles.rateInput}
            placeholder="Hourly"
            placeholderTextColor="#BFBFBF"
            value={hourlyRate}
            onChangeText={setHourlyRate}
          />
          <TextInput
            style={styles.rateInput}
            placeholder="Day"
            placeholderTextColor="#BFBFBF"
            value={dayRate}
            onChangeText={setDayRate}
          />
        </View>
        <View style={styles.rateInputContainer}>
          <TextInput
            style={styles.rateInput}
            placeholder="Week"
            placeholderTextColor="#BFBFBF"
            value={weekRate}
            onChangeText={setWeekRate}
          />
          <TextInput
            style={styles.rateInput}
            placeholder="Month"
            placeholderTextColor="#BFBFBF"
            value={monthRate}
            onChangeText={setMonthRate}
          />
        </View>
        <View style={styles.rateInputContainer}>
          <TextInput
            style={styles.rateInput}
            placeholder="6 Months"
            placeholderTextColor="#BFBFBF"
            value={sixMonthsRate}
            onChangeText={setSixMonthsRate}
          />
          <TextInput
            style={styles.rateInput}
            placeholder="12 Months"
            placeholderTextColor="#BFBFBF"
            value={yearRate}
            onChangeText={setYearRate}
          />
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

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    color: "#FFD613", // Yellow for header
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#FFF", // White section title
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
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  parkingImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  removeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 5,
    borderRadius: 20,
    zIndex: 1,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD613",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  uploadText: {
    color: "#1a1a1a",
    marginLeft: 10,
    fontWeight: "bold",
  },
  rateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rateInput: {
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 12,
    color: "#FFF",
    fontSize: 16,
    width: "48%",
    marginBottom: 10,
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
    marginTop: 20,
  },
  submitButtonText: {
    color: "#1a1a1a",
    fontWeight: "bold",
  },
});

export default ParkingSpaceDetailsScreen;
