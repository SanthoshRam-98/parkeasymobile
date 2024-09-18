import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
// import ParkingOption from "./ParkingOption";

// const parkingOptions = [
//   {
//     type: "Car",
//     imageUri:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/f03793c3740ebfd18281d2c6a4275c19cd79ded745b0f2b7b58fd3e7abb107c2?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
//   },
//   {
//     type: "Bike",
//     imageUri:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/6f40ea27f708bdef2091c4856f72563f27dbda8b2c66b4a7f43bf714ce5a5a46?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
//   },
// ];

function ParkingAvailability() {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f53e82375030b587a8d5393105d619ee71c5d04e4c23480320e4f455e19d469?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
        }}
        style={styles.headerImage}
        accessible={true}
        accessibilityLabel="Parking availability header image"
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Parking Availability</Text>
        </View>
        <View style={styles.optionsContainer}>
          {parkingOptions.map((option, index) => (
            <ParkingOption
              key={index}
              type={option.type}
              imageUri={option.imageUri}
              isSelected={index === 0}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    maxWidth: 393,
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "500",
    fontSize: 16,
  },
  headerImage: {
    position: "relative",
    display: "flex",
    width: "100%",
    aspectRatio: 0.62,
  },
  contentContainer: {
    display: "flex",
    marginTop: 36,
    width: "100%",
    flexDirection: "column",
    alignItems: "stretch",
    padding: "0 16px",
  },
  titleContainer: {
    alignSelf: "flex-start",
  },
  title: {
    color: "rgba(255, 255, 255, 1)",
  },
  optionsContainer: {
    display: "flex",
    marginTop: 24,
    alignItems: "stretch",
    gap: 15,
    flexDirection: "row",
  },
});

export default ParkingAvailability;
