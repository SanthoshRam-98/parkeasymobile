// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Alert } from "react-native";
// import MapLibreGL, {
//   MapView,
//   Camera,
//   PointAnnotation,
// } from "@maplibre/maplibre-react-native";
// import * as Location from "expo-location";
// import { Ionicons } from "@expo/vector-icons";

// const CustomMap = () => {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     const fetchUserLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission to access location was denied");
//         return;
//       }

//       try {
//         let location = await Location.getCurrentPositionAsync({});
//         setUserLocation(location.coords);
//       } catch (error) {
//         Alert.alert("Error fetching location", error.message);
//       }
//     };

//     fetchUserLocation();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {userLocation ? (
//         <MapView
//           style={styles.map}
//           initialViewState={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             zoom: 12,
//           }}
//           styleURL={MapLibreGL.StyleURL.Street} // Use the MapLibreGL style URL
//         >
//           <Camera
//             centerCoordinate={[userLocation.longitude, userLocation.latitude]}
//             zoomLevel={12}
//             animationDuration={0}
//           />

//           {/* Custom Marker using Ionicons */}
//           <PointAnnotation
//             id="user-location"
//             coordinate={[userLocation.longitude, userLocation.latitude]}
//           >
//             <Ionicons name="location-outline" size={30} color="red" />
//           </PointAnnotation>
//         </MapView>
//       ) : (
//         <View style={styles.loadingContainer}>
//           <Ionicons name="loading" size={30} color="black" />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default CustomMap;
