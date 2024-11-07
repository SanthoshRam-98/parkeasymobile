import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PaytmPaymentScreen = ({ navigation }) => {
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [paytmUrl, setPaytmUrl] = useState(null);

  useEffect(() => {
    // Simulate a payment process
    setTimeout(() => {
      // Assume payment is completed
      setPaymentStatus("Success");
    }, 3000); // Simulate 3 seconds for payment process
  }, []);
  useEffect(() => {
    // Request to initiate payment from backend
    console.log("Initiating payment...");
    fetch("http://192.168.225.160:3000/paytm/initiate_payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPaytmUrl(data.paytm_txn_url);
      })
      .catch((error) => console.error("Error initiating payment:", error));
  }, []);
  const handleFinish = () => {
    console.log(
      "Navigating to PaymentDetailsScreen with status:",
      paymentStatus
    );
    navigation.navigate("PaymentDetailsScreen", {
      paymentStatus: paymentStatus, // Pass the payment status to the details screen
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paymentText}>
        {paymentStatus === "Pending"
          ? "Processing Payment..."
          : "Payment Successful!"}
      </Text>
      {paymentStatus === "Success" && (
        <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
          <Text style={styles.finishButtonText}>Finish</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  paymentText: {
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: "#FFC107",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  finishButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaytmPaymentScreen;
