import React, { useState } from "react";
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

const ParkingBooking = () => {
  const [selectedDay, setSelectedDay] = useState("Today");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [duration, setDuration] = useState(1);
  const [pricingPlan, setPricingPlan] = useState("Daily");

  const pricingRates = {
    hourly: 20,
    daily: 150,
    monthly: 2999,
    threeMonths: 7999,
    sixMonths: 14999,
    yearly: 24000,
  };

  const calculateTotal = () => {
    switch (pricingPlan) {
      case "Hourly":
        return calculateHourlyTotal();
      case "Daily":
        return duration * pricingRates.daily;
      case "Monthly":
        return pricingRates.monthly; // Fixed price for monthly
      case "3 Months":
        return pricingRates.threeMonths; // Fixed price for 3 months
      case "6 Months":
        return pricingRates.sixMonths; // Fixed price for 6 months
      case "Yearly":
        return pricingRates.yearly; // Fixed price for yearly
      default:
        return 0;
    }
  };

  const calculateHourlyTotal = () => {
    // Calculate the difference in milliseconds
    const diffInMs = endTime - startTime;
    const hours = Math.ceil(diffInMs / (1000 * 60 * 60)); // Convert ms to hours
    return hours * pricingRates.hourly;
  };

  const totalAmount = calculateTotal();

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const onEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
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

  const incrementDuration = () => {
    setDuration((prevDuration) => prevDuration + 1);
  };

  const decrementDuration = () => {
    setDuration((prevDuration) => Math.max(prevDuration - 1, 1));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>RR Parking</Text>
            <Text style={styles.subtitle}>Vadapalani, Chennai</Text>
          </View>
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholder}>Map Placeholder</Text>
        </View>

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
                onPress={() => setSelectedDay("Today")}
              >
                <Text style={styles.toggleText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.dateButton,
                  selectedDay === "Tomorrow" && styles.activeButton,
                ]}
                onPress={() => setSelectedDay("Tomorrow")}
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

        {/* Start Time Section */}
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

        {/* End Time Section */}
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

        <View style={styles.pricingPlan}>
          <Text style={styles.sectionLabel}>Pricing & Plan</Text>
          <View style={styles.priceGrid}>
            {Object.entries(pricingRates).map(([key, value]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.priceBox,
                  pricingPlan ===
                    (key === "hourly"
                      ? "Hourly"
                      : key === "daily"
                      ? "Daily"
                      : key === "monthly"
                      ? "Monthly"
                      : key === "threeMonths"
                      ? "3 Months"
                      : key === "sixMonths"
                      ? "6 Months"
                      : "Yearly") && styles.activePriceBox,
                ]}
                onPress={() =>
                  setPricingPlan(
                    key === "hourly"
                      ? "Hourly"
                      : key === "daily"
                      ? "Daily"
                      : key === "monthly"
                      ? "Monthly"
                      : key === "threeMonths"
                      ? "3 Months"
                      : key === "sixMonths"
                      ? "6 Months"
                      : "Yearly"
                  )
                }
              >
                <Text style={styles.priceText}>
                  ₹ {value} /{" "}
                  {key === "hourly"
                    ? "Hour"
                    : key === "daily"
                    ? "Day"
                    : key === "monthly"
                    ? "Month"
                    : key === "threeMonths"
                    ? "3 Months"
                    : key === "sixMonths"
                    ? "6 Months"
                    : "Year"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration Selector is conditionally rendered */}
        {pricingPlan === "Hourly" || pricingPlan === "Daily" ? (
          <View style={styles.durationSelector}>
            <Text style={styles.sectionLabel}>Duration</Text>
            <View style={styles.durationControl}>
              <TouchableOpacity
                onPress={decrementDuration}
                style={styles.controlButton}
              >
                <Text style={styles.controlText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.durationText}>
                {duration} {pricingPlan === "Hourly" ? "Hour(s)" : "Day(s)"}
              </Text>
              <TouchableOpacity
                onPress={incrementDuration}
                style={styles.controlButton}
              >
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Book Now Button */}
        <View style={styles.bookNowSection}>
          <View style={styles.priceBox}>
            <Text style={styles.priceSummary}>₹ {totalAmount}.00</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
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
  mapContainer: {
    backgroundColor: "#333",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
  priceBox: {
    width: "48%", // Two columns, 48% width to allow for margins
    padding: 15,
    backgroundColor: "#333",
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  activePriceBox: {
    backgroundColor: "#FFD700",
    // color: "black",
    // fontSize: 16,
    // backgroundColor: "red",
  },
  priceText: {
    color: "#FFD700",
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
  bookButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ParkingBooking;
