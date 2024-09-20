import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const categories = [
  {
    title: "Workplace",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5e4683ec82f15b22548aaf734d51d57ebc112efe0a53b9ba55cd70cbbe04388d?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
  },
  {
    title: "Shopping Mall",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/282654de8565e8b69e2abd041591cf3abb9ab141b6bd22d4c67be2cdc9deb793?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
  },
  {
    title: "Restaurants",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/33af301f4de76396a5d00b90736abacb517f14fd1034670e41c84351236d5029?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
  },
  {
    title: "Residential area",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e98f98534b2e99eba5aa8b2a593e40aaa646d5e6215862d07b11e73af5f4159e?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
  },
];

const premiumPlans = [
  {
    title: "Monthly Parking",
    imageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/57f67f07d24efbac665d5078be0a72652d3ad19723371b189f5d559f8f0f5092?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
    isYearly: false,
  },
  {
    title: "Yearly Parking",
    description: "Dedicated parking available near you.",
    buttonText: "Explore Now",
    buttonImageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b4ddf8dc73fb4dcc840913fc39b5206f087955c1ddea565ed6d7ba39dc3071bc?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
    planImageUri:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/319ca03d7514ffb1bc6e2202cf76b934facf65fd28ee155469ee5addb3c7b253?placeholderIfAbsent=true&apiKey=1e478041483c415d8c6ecd66dd4ddacc",
    isYearly: true,
  },
];

function ParkingServices() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Parking Services</Text>

      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <Image
              resizeMode="contain"
              source={{ uri: category.imageUri }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.premiumPlansHeader}>Premium Plans</Text>

      <View style={styles.premiumPlansContainer}>
        {premiumPlans.map((plan, index) => (
          <View key={index} style={styles.planContainer}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            {!plan.isYearly && (
              <Image
                resizeMode="contain"
                source={{ uri: plan.imageUri }}
                style={styles.planImage}
              />
            )}
            {plan.isYearly && (
              <>
                <Text style={styles.planDescription}>{plan.description}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{plan.buttonText}</Text>
                    <Image
                      resizeMode="contain"
                      source={{ uri: plan.buttonImageUri }}
                      style={styles.buttonImage}
                    />
                  </TouchableOpacity>
                  <Image
                    resizeMode="contain"
                    source={{ uri: plan.planImageUri }}
                    style={styles.yearlyPlanImage}
                  />
                </View>
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    maxWidth: 361,
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "Poppins, sans-serif",
  },
  headerText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  categoriesContainer: {
    display: "flex",
    marginTop: 24,
    alignItems: "stretch",
    gap: 15,
  },
  categoryContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(32, 32, 32, 1)",
    display: "flex",
    alignItems: "stretch",
    gap: 12,
    flex: 1,
    padding: 13,
    flexDirection: "row",
  },
  categoryImage: {
    width: 23,
    aspectRatio: 1,
  },
  categoryTitle: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
  },
  premiumPlansHeader: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginTop: 36,
  },
  premiumPlansContainer: {
    display: "flex",
    marginTop: 24,
    alignItems: "stretch",
    gap: 15,
  },
  planContainer: {
    borderRadius: 10,
    backgroundColor: "rgba(32, 32, 32, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1,
    padding: 16,
  },
  planTitle: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "flex-start",
  },
  planImage: {
    marginTop: 9,
    width: 148,
    aspectRatio: 2.24,
  },
  planDescription: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 8,
    fontWeight: "300",
    marginTop: 6,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 19,
  },
  button: {
    borderRadius: 6,
    backgroundColor: "rgba(255, 214, 19, 1)",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
  },
  buttonText: {
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "400",
    fontSize: 8,
    marginRight: 2,
  },
  buttonImage: {
    width: 16,
    aspectRatio: 1,
  },
  yearlyPlanImage: {
    width: 65,
    aspectRatio: 1.33,
  },
});

export default ParkingServices;
