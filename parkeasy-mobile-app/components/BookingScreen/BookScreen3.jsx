import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const ParkingDetails = () => {
  const navigation = useNavigation(); // Hook to get navigation object

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Parking Details</Text>
      </View>

      {/* ScrollView should take all available space */}
      <ScrollView style={styles.scrollView}>
        <Image
          source={{ uri: "https://your-parking-image-url.com" }}
          style={styles.parkingImage}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>RR Parking</Text>
          <Text style={styles.subTitle}>Vadapalani, Chennai</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.2 (4,220 reviews)</Text>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailBox}>
              <Icon name="place" size={20} color="#ccc" />
              <Text style={styles.detailText}>3.2 km</Text>
            </View>
            <View style={styles.detailBox}>
              <Icon name="schedule" size={20} color="#ccc" />
              <Text style={styles.detailText}>7 AM - 10 AM</Text>
            </View>
            <View style={styles.detailBox}>
              <Icon name="attach-money" size={20} color="#ccc" />
              <Text style={styles.detailText}>₹ 20/hr</Text>
            </View>
          </View>

          <View style={styles.customerServiceContainer}>
            <TouchableOpacity style={styles.customerButton}>
              <Icon name="chat" size={20} color="#fff" />
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.customerButton}>
              <Icon name="call" size={20} color="#fff" />
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.reviewContainer}>
            <Image
              source={{ uri: "https://your-profile-image-url.com" }}
              style={styles.reviewerProfile}
            />
            <View style={styles.reviewDetails}>
              <Text style={styles.reviewerName}>Kishore Kumar</Text>
              <View style={styles.ratingContainer}>
                {[...Array(4)].map((_, i) => (
                  <Icon key={i} name="star" size={16} color="#FFD700" />
                ))}
                <Icon name="star-half" size={16} color="#FFD700" />
              </View>
              <Text style={styles.reviewText}>
                "ParkEasy has been a lifesaver in urban areas with limited
                parking options. I no longer waste time driving around
                aimlessly."
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParkingDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // padding: 20,
    // justifyContent: "space-between",
    justifyContent: "space-betweeen",

    backgroundColor: "#1C1C1E",
    // paddingTop: 20, // Adjust based on your navigation bar height
  },
  headingContainer: {
    // top: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    backgroundColor: "#1C1C1E",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    zIndex: 10,
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollView: {
    flex: 1, // Ensure the ScrollView takes up all available space
  },
  parkingImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover", // Ensure image covers the space properly
  },
  infoContainer: {
    padding: 15,
    backgroundColor: "#1C1C1E",
    minHeight: "100%",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  ratingText: {
    color: "#FFD700",
    marginLeft: 5,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    color: "#ccc",
    marginLeft: 5,
  },
  customerServiceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  customerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
  },
  reviewContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  reviewerProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewDetails: {
    flex: 1,
  },
  reviewerName: {
    color: "#fff",
    fontWeight: "bold",
  },
  reviewText: {
    color: "#ccc",
    marginTop: 5,
  },
  bookButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
