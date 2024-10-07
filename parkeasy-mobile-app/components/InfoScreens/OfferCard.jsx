import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import OfferCards from "../../screenImages/offercards.png";
const OfferCard = () => (
  <View style={styles.offerCardContainer}>
    <View style={styles.offerContent}>
      <Text style={styles.offerTitle}>Save ₹500</Text>
      <Text style={styles.offerSubtitle}>On Your First EV Parking</Text>
      <Text style={styles.offerDescription}>
        We provide dedicated monthly parking with surveillance
      </Text>
    </View>
    <View style={styles.customerInfo}>
      <Image
        resizeMode="contain"
        source={OfferCards}
        style={styles.customerImage}
      />
      <View style={styles.customerStats}>
        <Text style={styles.customerCount}>100 +</Text>
        <Text style={styles.customerLabel}>Happy Customers</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  offerCardContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(32, 32, 32, 0.6)",
    marginTop: 24,
    padding: 25,
  },
  offerContent: {
    alignItems: "flex-start",
  },
  offerTitle: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 20,
    fontWeight: "600",
  },
  offerSubtitle: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "400",
    marginTop: 8,
  },
  offerDescription: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 10,
    fontWeight: "300",
    marginTop: 8,
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 12,
  },
  customerImage: {
    width: 80,
    aspectRatio: 2.22,
    marginRight: 8,
  },
  customerStats: {
    alignItems: "flex-start",
  },
  customerCount: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 16,
    fontWeight: "500",
  },
  customerLabel: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 8,
    fontWeight: "300",
  },
});

export default OfferCard;
