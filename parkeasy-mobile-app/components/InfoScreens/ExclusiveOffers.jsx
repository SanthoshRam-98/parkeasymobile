import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const offerData = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c3ab93d803ec844e1e290f6c92e13c9f3b9db8a51c98b1de1759187d6a7db0c3?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
    title: "Rewards",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/9d1fff1f1f666f3e09db6e57b26e3e6c154ee2607301340bc63a641d0abf2c0c?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
    title: "Discounts",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/136a43db1254f805cf52a3453d0ee041d2cc9c5be0fb13a373e1850cee466a2b?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
    title: "Refer & Win",
  },
];

const ExclusiveOffers = () => (
  <View style={styles.exclusiveOffersContainer}>
    <Text style={styles.exclusiveOffersTitle}>Exclusive Offers</Text>
    <View style={styles.offerItemsContainer}>
      {offerData.map((offer, index) => (
        <View key={index} style={styles.offerItem}>
          <Image
            resizeMode="contain"
            source={{ uri: offer.image }}
            style={styles.offerImage}
          />
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
  },
});

export default ExclusiveOffers;
