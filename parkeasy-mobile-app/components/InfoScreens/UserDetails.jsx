import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";

const UserDetails = ({ navigation }) => {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [gender, setGender] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleSubmit = () => {
    // Implement your submission logic here (e.g., save user details and navigate to UserHomeScreen)
    console.log({ name, profileImage, gender });
    navigation.navigate("UserHomeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>User's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#BFBFBF"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.sectionTitle}>Profile Picture</Text>
        <View style={styles.imageContainer}>
          {profileImage && (
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => setProfileImage(null)}
              >
                <Ionicons name="trash" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="image" size={30} color="black" />
            <Text style={styles.uploadText}>Upload from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={takePhoto}>
            <Ionicons name="camera" size={30} color="black" />
            <Text style={styles.uploadText}>Take a Photo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Gender</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your gender (optional)"
          placeholderTextColor="#BFBFBF"
          value={gender}
          onChangeText={setGender}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
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
  sectionTitle: {
    color: "#FFF",
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
  profileImage: {
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
  submitButton: {
    backgroundColor: "#FFD613",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#1a1a1a",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserDetails;
