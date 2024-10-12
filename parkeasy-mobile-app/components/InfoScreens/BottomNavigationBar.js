import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Use this for navigation

const BottomNavigationBar = ({
  navigationItems,
  activeIndex,
  setActiveIndex,
}) => {
  const navigation = useNavigation(); // Get navigation instance

  const handlePress = (index, route) => {
    setActiveIndex(index);
    navigation.navigate(route); // Navigate to the respective screen
  };

  return (
    <View style={styles.navigationContainer}>
      <View style={styles.navigationItemsWrapper}>
        {navigationItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navigationItem}
            onPress={() => handlePress(index, item.route)}
          >
            <Ionicons
              name={item.iconName}
              size={24} // Maintain consistent size for the icons
              color={index === activeIndex ? "black" : "#000000"} // Change color based on active state
              style={styles.navigationIcon} // Consistent style
            />
            {index === activeIndex && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    backgroundColor: "rgba(255, 214, 19, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 15, // Reduced padding
    paddingBottom: 15, // Reduced padding
    zIndex: 10,
  },
  navigationItemsWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  navigationItem: {
    alignItems: "center",
  },
  navigationIcon: {
    width: 24, // Icon width and height remain consistent
    height: 24,
  },
  activeIndicator: {
    marginTop: 4,
    width: 16,
    height: 3,
    backgroundColor: "#000", // Active indicator color
    borderRadius: 2,
  },
});

export default BottomNavigationBar;
