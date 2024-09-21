import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import TrendingSection from './TrendingSection';
import OfferCard from './OfferCard';
import ExclusiveOffers from './ExclusiveOffers';

const MainComponent = () => (
  <View style={styles.mainContainer}>
    <View style={styles.contentContainer}>
      <TrendingSection />
      <OfferCard />
      <ExclusiveOffers />
    </View>
    <Image
      resizeMode="contain"
      source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/035129cb9f8e45312db188e6eeb06206f1b82eba0916304e85a224b93afe7591?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc" }}
      style={styles.bottomImage}
    />
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    maxWidth: 393,
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "Poppins, sans-serif",
    color: "rgba(255, 255, 255, 1)",
  },
  contentContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "0 16px",
  },
  bottomImage: {
    marginTop: 48,
    width: "100%",
    aspectRatio: 4.9,
  },
});

export default MainComponent;