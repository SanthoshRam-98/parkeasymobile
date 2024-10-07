import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Rewards from "../../screenImages/rewards.svg"; // Importing SVG as a component
import Discounts from "../../screenImages/discounts.svg";
import ReferandWin from "../../screenImages/refer&win.svg";

const offerData = [
  {
    image: Rewards, // SVG Component
    title: "Rewards",
  },
  {
    image: Discounts,
    title: "Discounts",
  },
  {
    image: ReferandWin,
    title: "Refer & Win",
  },
];

const ExclusiveOffers = () => (
  <View style={styles.exclusiveOffersContainer}>
    <Text style={styles.exclusiveOffersTitle}>Exclusive Offers</Text>
    <View style={styles.offerItemsContainer}>
      {offerData.map((offer, index) => (
        <View key={index} style={styles.offerItem}>
          {/* Render SVG directly */}
          <offer.image width={48} height={48} />
          <Text style={styles.offerText}>{offer.title}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  exclusiveOffersContainer: {
    marginTop: 36,
  },
  exclusiveOffersTitle: {
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
    color: "white",
  },
  offerItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    width: 240,
    maxWidth: "100%",
    alignSelf: "center",
  },
  offerItem: {
    alignItems: "center",
  },
  offerImage: {
    width: 48,
    aspectRatio: 1,
  },
  offerText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
    color: "white",
  },
});

export default ExclusiveOffers;
