import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const PaymentDetailsScreen = ({ navigation }) => {
  const handleSubmit = () => {
    navigation.navigate("UserHomeScreen");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Details</Text>
        </View>

        {/* Main Card Section */}
        <View style={styles.cardContainer}>
          {/* Yellow Top Section */}
          <View style={styles.yellowTopSection}>
            <Text style={styles.parkingSlotText}>1st Floor (000)</Text>
            {/* QR Code Placeholder */}
            <Image
              style={styles.qrCode}
              source={{ uri: "https://your-qr-code-url.com" }}
            />
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>Kaarthikeyan S V</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Vehicle</Text>
                <Text style={styles.value}>TN 00 AA 0000</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Parking Area</Text>
                <Text style={styles.value}>RR Parking</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Parking Slot</Text>
                <Text style={styles.value}>1st Floor (000)</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.value}>25th June 2024</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Duration</Text>
                <Text style={styles.value}>4 Hours</Text>
              </View>
            </View>
          </View>

          {/* Dotted Line */}
          <View style={styles.dottedLine} />

          {/* Amount Section */}
          <View style={styles.amountSection}>
            <View style={styles.row}>
              <Text style={styles.label}>Refundable amount</Text>
              <Text style={styles.value}>₹ 65.00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total amount paid</Text>
              <Text style={styles.value}>₹ 80.00</Text>
            </View>
          </View>
        </View>

        {/* Finish Button */}
        <TouchableOpacity style={styles.finishButton} onPress={handleSubmit}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1C1C1E",
  },
  container: {
    flex: 1,
    backgroundColor: "#1C1C1E",
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: "#FFC107",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
  },
  yellowTopSection: {
    backgroundColor: "#FFC107",
    alignItems: "center",
    padding: 20,
  },
  parkingSlotText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  infoSection: {
    padding: 20,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%", // Makes sure each row spans the entire width
    marginVertical: 10, // Spacing between rows
  },
  column: {
    flex: 1, // Make sure the columns take up equal width
    marginRight: 10, // Optional: Add some spacing between the columns
    alignItems: "center",
    textAlign: "start",
  },
  label: {
    color: "#888",
    fontSize: 14,
  },
  value: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  dottedLine: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#CCC",
    marginVertical: 10,
  },
  amountSection: {
    padding: 20,
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
