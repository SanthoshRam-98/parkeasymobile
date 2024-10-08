import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BottomNavigationBar = ({ navigationItems }) => {
  const navigation = useNavigation();

  const handleNavigation = (index) => {
    switch (index) {
      case 1:
        navigation.navigate("CarNav");
        break;
      case 2:
        navigation.navigate("BookingNav");
        break;
      case 3:
        navigation.navigate("ProfileNav");
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.navigationContainer}>
      <View style={styles.navigationItemsWrapper}>
        {navigationItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navigationItem}
            onPress={() => handleNavigation(index)}
          >
            <BottomNavigationItem
              Component={item.Component}
              isActive={item.isActive}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const BottomNavigationItem = ({ Component, isActive }) => {
  return (
    <View style={styles.navigationItem}>
      <Component style={styles.navigationIcon} />
      {isActive && <View style={styles.activeIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    backgroundColor: "rgba(255, 214, 19, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute", // Make the navigation bar sticky
    bottom: 0, // Stick to the bottom
    left: 0, // Add padding on the left
    right: 0, // Add padding on the right
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 23,
    paddingBottom: 23,
    width: "100%", // Ensure full width
    zIndex: 10, // Ensure it appears above other content
  },
  navigationItemsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  navigationItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  navigationIcon: {
    width: 28,
    aspectRatio: 1,
  },
  activeIndicator: {
    marginTop: 4,
    width: 16,
    height: 3,
    backgroundColor: "#000",
  },
});

export default BottomNavigationBar;
