import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Ensure Ionicons is imported

const PaymentDetailsScreen = ({ route, navigation }) => {
  const { paymentStatus } = route.params; // Get payment status from the route params

  // Navigate to UserHomeScreen
  const handleSubmit = () => {
    navigation.navigate("UserHomeScreen"); // Ensure this screen is registered in your navigator
  };

  // Navigate back
  const handleBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Details</Text>
        </View>

        {/* Payment Information */}
        <View style={styles.cardContainer}>
          <View style={styles.amountSection}>
            <Text style={styles.label}>Payment Status</Text>
            <Text style={styles.value}>{paymentStatus}</Text>
            {/* Display payment status */}
          </View>
          {/* Add more details like amount, date, etc. */}
        </View>

        <TouchableOpacity style={styles.finishButton} onPress={handleSubmit}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Define styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1C1C1E", // Example color
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1C1C1E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    color: "#FFC107",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContainer: {
    marginVertical: 20,
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 10,
  },
  amountSection: {
    marginBottom: 10,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
  },
  value: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  finishButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  finishButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentDetailsScreen;
