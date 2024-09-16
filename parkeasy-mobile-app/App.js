import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Animated, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HelloWorld from "./components/HelloWorld";
import OnBoardScreen1 from "./components/OnboardScreen1";
import OnBoardScreen2 from "./components/OnBoardScreen2";
import ParkingSpaceListing from "./components/ParkingSpaceListing";

const Stack = createStackNavigator();

export default function App() {
  const [showHelloWorld, setShowHelloWorld] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -1000,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setShowHelloWorld(false);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showHelloWorld) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Animated.View
            style={{
              ...styles.animatedView,
              transform: [{ translateX: slideAnim }],
            }}
          >
            <HelloWorld />
          </Animated.View>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown: false, // Hide headers if not needed
            transitionSpec: {
              open: {
                animation: "timing",
                config: {
                  duration: 300,
                },
              },
              close: {
                animation: "timing",
                config: {
                  duration: 300,
                },
              },
            },
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          <Stack.Screen name="Onboarding1" component={OnBoardScreen1} />
          <Stack.Screen name="Onboarding2" component={OnBoardScreen2} />
          <Stack.Screen
            name="ParkingSpaceListing"
            component={ParkingSpaceListing}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Set to black or any desired color
    alignItems: "center",
    justifyContent: "center",
  },
  animatedView: {
    flex: 1,
    width: "100%",
  },
});
