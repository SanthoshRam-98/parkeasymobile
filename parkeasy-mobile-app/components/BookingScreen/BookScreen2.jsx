import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native"; // If using React Navigation
import MapView from "react-native-maps"; // Import MapView
import * as Location from "expo-location"; // For getting user location// For getting user location
import { getDistance } from "geolib"; // Import geolib to calculate distance
const BookScreen2 = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState("Today");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [pricingPlan, setPricingPlan] = useState("Daily");
  const [twoWheelerCount, setTwoWheelerCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // Added to track total price
  const [parkingRates, setParkingRates] = useState({}); // State to hold parking rates
  const [parkingSpace, setParkingSpace] = useState(null); // The selected parking space
  const [defaultLocation] = useState({
    latitude: 9.939093,
    longitude: 78.121719,
  }); // Coimbatore coordinates
  const [distance, setDistance] = useState(0);
  const route = useRoute();
  const { parkingSpot } = route.params; // Receive parkingSpot passed from BookingScreen
  const [userLocation, setUserLocation] = useState(null); // Initialize userLocation as null
  // Now you can access the parking spot data, like the id
  const { id, building_name, city, hourly_rate, parking_images } = parkingSpot;
  // Fetch parking space by ID
  // Fetch parking space by ID

  // Fetch user location
  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Get user's current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });

      // Calculate distance from default location
      if (defaultLocation) {
        const distanceInMeters = getDistance(
          { latitude, longitude },
          defaultLocation
        );
        setDistance(distanceInMeters); // Distance in meters
      }
    })();
  }, []);

  useEffect(() => {
    if (parkingSpot.id) {
      fetch(
        `http://192.168.225.160:3000/api/v1/parking_spaces/${parkingSpot.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched parking space details:", data);
          setParkingSpace(data); // Make sure to set the data here
          updateParkingRates(data); // Initialize parking rates after fetch
        })
        .catch((error) => {
          console.error("Error fetching parking space:", error);
        });
    }
  }, [parkingSpot.id]);

  const updateParkingRates = (space) => {
    setParkingRates({
      hourly: space.hourly_rate,
      daily: space.day_rate,
      weekly: space.week_rate,
      monthly: space.month_rate,
      sixMonths: space.six_month_rate,
      yearly: space.year_rate,
    });
    setPricingPlan("Daily"); // Reset pricing plan to default

    setTotalPrice(parseFloat(space.day_rate)); // Set default price as number

    setTwoWheelerCount(1); // Ensure counter starts from 1 after fetching rates
  };
  // Calculate total for Hourly and other plans

  // Handle toggling between Today and Tomorrow
  const handleDayChange = (day) => {
    setSelectedDay(day);
    if (day === "Today") {
      setDate(new Date());
      resetCounterAndPrice();
    } else if (day === "Tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow);
      resetCounterAndPrice();
    }
  };

  const resetCounterAndPrice = () => {
    setTwoWheelerCount(0);
    // Calculate total price only if pricingPlan is hourly
    if (pricingPlan === "Hourly") {
      setTotalPrice(0); // Reset total price for hourly plan
    } else {
      setTotalPrice(calculateTotal(twoWheelerCount)); // Set total for other plans
    }
  };

  // Increase counter and recalculate total price
  const increaseCounter = () => {
    const newCount = twoWheelerCount + 1;
    setTwoWheelerCount(newCount);
    if (pricingPlan === "Hourly") {
      const newTotal = calculateTotal(newCount);
      setTotalPrice(newTotal); // Update total price based on counter
    }
  };

  const decreaseCounter = () => {
    if (twoWheelerCount > 0) {
      const newCount = twoWheelerCount - 1;
      setTwoWheelerCount(newCount);
      if (pricingPlan === "Hourly") {
        const newTotal = calculateTotal(newCount);
        setTotalPrice(newTotal); // Update total price based on counter
      }
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date) => {
    const options = { weekday: "short", day: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };
  const setPricingPlanAndUpdatePrice = (plan) => {
    setPricingPlan(plan);
    setTwoWheelerCount(1); // Set the default count to 1
    // Set total price directly based on the selected plan
    let total = 1;
    switch (
      plan // Change pricingPlan to plan
    ) {
      case "Hourly":
        total = twoWheelerCount * parkingRates.hourly; // Use twoWheelerCount for hourly calculation
        break;
      case "Daily":
        total = parkingRates.daily; // Use fetched daily rate
        break;
      case "Weekly":
        total = parkingRates.weekly; // Added weekly case
        break;
      case "Monthly":
        total = parkingRates.monthly; // Use fetched monthly rate
        break;
      case "6 Months":
        total = parkingRates.sixMonths; // Use fetched six months rate
        break;
      case "Yearly":
        total = parkingRates.yearly; // Use fetched yearly rate
        break;
      default:
        total = 0;
    }
    setTotalPrice(total); // Set the total price
  };

  const calculateTotal = (count) => {
    if (pricingPlan === "Hourly") {
      return count * parkingRates.hourly; // Calculate total for hourly plan
    }
    // For other plans, totalPrice is directly set in setPricingPlanAndUpdatePrice
    return totalPrice; // Just return the current total price for non-hourly plans
  };

  const onStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
      // When start time is set, you may also want to reset end time if necessary
      setEndTime(selectedTime); // Uncomment if you want to reset end time to the selected start time
    }
  };

  const onEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      // Get hours for both start and end times
      const startHour = startTime.getHours();
      const endHour = selectedTime.getHours();

      // Prevent setting end time to AM if start time is PM
      if (startHour >= 12 && endHour < 12) {
        alert("End time cannot be in the AM if start time is in the PM.");
        return;
      }

      setEndTime(selectedTime);
      // Calculate total price based on the duration between start and end time
      const hoursDifference = Math.abs(endHour - startHour);
      const newTotal = calculateTotal(hoursDifference); // Update the total price based on duration
      setTotalPrice(newTotal);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <ScrollView contentContainerStyle={styles.container}> */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: defaultLocation.latitude,
            longitude: defaultLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.functionalityContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            {parkingSpace ? (
              <Text style={styles.spaceName}>
                {parkingSpace.building_name}, {parkingSpace.city}
              </Text>
            ) : (
              <Text>Loading parking space...</Text>
            )}
          </View>
          {/* Display Distance */}
          {userLocation && (
            <View style={styles.distanceContainer}>
              <Text style={styles.distanceText}>
                Distance from your location: {(distance / 1000).toFixed(2)} km
              </Text>
            </View>
          )}
          <View style={styles.dateSection}>
            <Text style={styles.sectionLabel}>Date of booking</Text>
            <View style={styles.datePicker}>
              <View style={styles.calendarDiv}>
                <TouchableOpacity
                  style={styles.calendarIconContainer}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Ionicons
                    name="calendar"
                    size={28}
                    color="#FFD700"
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.dateText}>{formatDate(date)}</Text>
              </View>

              <View style={styles.dateToggle}>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    selectedDay === "Today" && styles.activeButton,
                  ]}
                  onPress={() => handleDayChange("Today")}
                >
                  <Text style={styles.toggleText}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    selectedDay === "Tomorrow" && styles.activeButton,
                  ]}
                  onPress={() => handleDayChange("Tomorrow")}
                >
                  <Text style={styles.toggleText}>Tomorrow</Text>
                </TouchableOpacity>
              </View>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.pricingPlan}>
            <Text style={styles.sectionLabel}>Pricing & Plan</Text>
            {/* // Update the TouchableOpacity for pricing plans to ensure the right
          plan is set */}
            <View style={styles.priceGrid}>
              {Object.entries(parkingRates).map(([key, value]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.priceBox,
                    pricingPlan ===
                      (key === "hourly"
                        ? "Hourly"
                        : key === "daily"
                        ? "Daily"
                        : key === "weekly" // Added "weekly" instead of "threeMonths"
                        ? "Weekly"
                        : key === "monthly"
                        ? "Monthly"
                        : key === "sixMonths"
                        ? "6 Months"
                        : "Yearly") && styles.activePriceBox,
                  ]}
                  onPress={() =>
                    setPricingPlanAndUpdatePrice(
                      key === "hourly"
                        ? "Hourly"
                        : key === "daily"
                        ? "Daily"
                        : key === "weekly" // Added "weekly" instead of "threeMonths"
                        ? "Weekly"
                        : key === "monthly"
                        ? "Monthly"
                        : key === "sixMonths"
                        ? "6 Months"
                        : "Yearly"
                    )
                  }
                >
                  <Text style={styles.priceText}>
                    ₹ {value} /{" "}
                    {key === "hourly"
                      ? "Hourly"
                      : key === "daily"
                      ? "Daily"
                      : key === "weekly" // Added "weekly" instead of "threeMonths"
                      ? "Weekly"
                      : key === "monthly"
                      ? "Monthly"
                      : key === "sixMonths"
                      ? "6 Months"
                      : "Yearly"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Render duration and time selection only for Hourly plan */}
          {pricingPlan === "Hourly" && selectedDay === "Today" && (
            <View style={styles.counterSection}>
              <Text style={styles.sectionLabel}>Duration (in hours)</Text>
              <View style={styles.counterButtons}>
                <TouchableOpacity
                  onPress={decreaseCounter}
                  style={styles.counterButton}
                >
                  <Ionicons name="remove" size={20} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{twoWheelerCount}</Text>
                <TouchableOpacity
                  onPress={increaseCounter}
                  style={styles.counterButton}
                >
                  <Ionicons name="add" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Time division for "Tomorrow" + "Hourly" pricing */}
          {selectedDay === "Tomorrow" && pricingPlan === "Hourly" && (
            <>
              <View style={styles.timeSection}>
                <Text style={styles.sectionLabel}>Start Time</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setShowStartTimePicker(true)}
                >
                  <Text style={styles.timeText}>{formatTime(startTime)}</Text>
                </TouchableOpacity>
                {showStartTimePicker && (
                  <DateTimePicker
                    value={startTime}
                    mode="time"
                    display="default"
                    onChange={onStartTimeChange}
                  />
                )}
              </View>

              <View style={styles.timeSection}>
                <Text style={styles.sectionLabel}>End Time</Text>
                <TouchableOpacity
                  style={styles.timeButton}
                  onPress={() => setShowEndTimePicker(true)}
                >
                  <Text style={styles.timeText}>{formatTime(endTime)}</Text>
                </TouchableOpacity>
                {showEndTimePicker && (
                  <DateTimePicker
                    value={endTime}
                    mode="time"
                    display="default"
                    onChange={onEndTimeChange}
                  />
                )}
              </View>
            </>
          )}
          <View style={styles.horizontalLine} />
          <View style={styles.bookNowSection}>
            <View style={styles.priceBox}>
              <Text style={styles.priceSummary}>₹ {totalPrice}</Text>
            </View>

            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
const commonButtonStyle = {
  width: "48%", // Two columns, 48% width to allow for margins
  padding: 15,
  marginVertical: 5,
  borderRadius: 8,
  alignItems: "center",
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 15,
  },
  spaceName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFD700",
  },
  mapContainer: {
    flex: 1.5,
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  distanceContainer: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    margin: 10,
  },
  distanceText: {
    fontSize: 16,
    color: "#333",
  },
  horizontalLine: {
    height: 1, // Height of the line
    backgroundColor: "#ddd", // Light gray color for a mild appearance
    marginVertical: 10, // Optional: space around the line
  },
  functionalityContainer: {
    flex: 1,
    padding: 20,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    paddingVertical: 10,
    paddingHorizontal: 18,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Back button background for visibility
  },
  backText: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  title: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#FFF",
    fontSize: 14,
  },

  mapPlaceholder: {
    color: "#FFF",
  },
  calendarDiv: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  dateSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendarIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  calendarIcon: {
    marginRight: 10,
  },
  dateText: {
    color: "#FFD700",
    fontSize: 18,
  },
  dateToggle: {
    flexDirection: "row",
  },
  dateButton: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#FFD700",
  },
  toggleText: {
    color: "#FFF",
  },
  timeSection: {
    marginBottom: 20,
  },
  timeButton: {
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
  },
  timeText: {
    color: "#FFD700",
    fontSize: 18,
  },
  pricingPlan: {
    marginBottom: 20,
  },
  priceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  activePriceBox: {
    backgroundColor: "#FFD700",
    color: "black",
    // fontSize: 16,
    // backgroundColor: "red",
  },
  priceText: {
    color: "#FFF",
    fontSize: 16,
  },
  durationSelector: {
    marginBottom: 20,
  },
  durationControl: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  controlText: {
    color: "#FFF",
    fontSize: 24,
  },
  durationText: {
    color: "#FFD700",
    fontSize: 24,
  },
  bookNowSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
  },
  priceSummary: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
  },
  priceBox: {
    ...commonButtonStyle, // Use the common styles
    backgroundColor: "#333",
  },
  bookButton: {
    ...commonButtonStyle, // Use the common styles
    backgroundColor: "#FFD700", // Different background color
    flexDirection: "column",
  },
  bookButtonText: {
    color: "#000", // Different text color
    fontSize: 16,
    fontWeight: "bold",
  },
  counterSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  counterButtons: {
    flexDirection: "row",
    backgroundColor: "#333",
    width: "48%", // Two columns, 48% width to allow for margins
    padding: 15,
    backgroundColor: "#333",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  counterButton: {
    paddingHorizontal: 10,
  },
  counterValue: {
    color: "#FFF",
    fontSize: 18,
    paddingHorizontal: 10,
  },
});

export default BookScreen2;
