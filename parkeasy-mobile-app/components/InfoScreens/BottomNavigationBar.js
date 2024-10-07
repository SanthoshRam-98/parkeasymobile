// BottomNavigationBar.js
import React from "react";
import { View, StyleSheet } from "react-native";

const BottomNavigationBar = ({ navigationItems }) => {
  return (
    <View style={styles.navigationContainer}>
      <View style={styles.navigationItemsWrapper}>
        {navigationItems.map((item, index) => (
          <BottomNavigationItem
            key={index}
            Component={item.Component}
            isActive={item.isActive}
          />
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
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    display: "flex",
    width: "100%",
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 23,
    paddingBottom: 23,
  },
  navigationItemsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  navigationItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navigationIcon: {
    position: "relative",
    display: "flex",
    width: 28,
    aspectRatio: 1,
  },
  activeIndicator: {
    borderRadius: 10,
    display: "flex",
    marginTop: 4,
    width: 16,
    height: 3,
    backgroundColor: "#000", // Assuming black color for the indicator
  },
});

export default BottomNavigationBar;
