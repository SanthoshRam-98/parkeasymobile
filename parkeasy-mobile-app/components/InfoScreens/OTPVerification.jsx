import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
const { width } = Dimensions.get("window");

const OTPVerification = ({ route, navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { verificationId, phoneNumber, isNewUser } = route.params; // Retrieve verificationId and isNewUser
  const maskedPhoneNumber = `${phoneNumber.substring(
    0,
    2
  )}*****${phoneNumber.slice(-3)}`;
  const inputRefs = useRef([]);
  const insets = useSafeAreaInsets();

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to the next input if value is not empty and it's not the last input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If the input is cleared, move back to the previous input
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const otpCode = otp.join(""); // Join OTP digits
    try {
      const confirmationResult = await confirmVerificationCode(
        verificationId,
        otpCode
      ); // Confirm verification code
      console.log("Verification successful!", confirmationResult);
      // Navigate to User Details or Home Screen
      navigation.navigate(isNewUser ? "UserDetails" : "UserHomeScreen");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again."); // Show alert for invalid OTP
    }
  };

  // ------------------------------ Trying Alternative ----------------------------------------------
  // const handleVerifyOtp = async () => {
  //   try {
  //     const otpValue = otp.join("");
  //     const response = await axios.post(
  //       "http://192.168.225.160:3000/api/v1/verify_otp",
  //       {
  //         phone_number: phoneNumber,
  //         otp: otpValue,
  //       }
  //     );

  //     if (response.data.success) {
  //       if (isNewUser) {
  //         navigation.navigate("UserDetails"); // New users go to UserDetails
  //       } else {
  //         navigation.navigate("UserHomeScreen"); // Existing users go directly to Home
  //       }
  //     } else {
  //       Alert.alert("Error", response.data.message || "Failed to verify OTP.");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error verifying OTP:",
  //       error.response?.data || error.message
  //     );
  //     Alert.alert("Error", "Failed to verify OTP. Please try again.");
  //   }
  // };
  // ------------------------------ Trying Alternative ----------------------------------------------
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={[styles.headerContainer, { marginTop: insets.top + 20 }]}>
        <Text style={styles.logo}>Park.Easy</Text>
      </View>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.instruction}>Enter OTP number we have sent to</Text>
      <Text style={styles.phoneNumber}>{`+91 ${maskedPhoneNumber}`}</Text>

      {/* OTP Input Fields */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => handleOtpChange(text, index)}
            placeholder="|"
            accessibilityLabel={`OTP digit ${index + 1}`}
          />
        ))}
      </View>

      <TouchableOpacity>
        <Text style={styles.resendText}>Didn't receive OTP? Resend OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.continueButton, { bottom: insets.bottom + 20 }]}
        onPress={handleVerifyOtp}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(19, 18, 18, 1)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 20,
  },
  logo: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 3,
    alignSelf: "flex-start",
  },
  title: {
    color: "rgba(255, 214, 19, 1)",
    fontSize: 24,
    textAlign: "center",
    marginTop: 40,
  },
  instruction: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 12,
  },
  phoneNumber: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
    width: "80%",
  },
  otpInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(140, 140, 140, 1)",
    fontSize: 20,
    textAlign: "center",
    width: width * 0.12, // Adjust width to be responsive
    padding: 10,
    color: "white",
  },
  resendText: {
    color: "rgba(140, 140, 140, 1)",
    fontSize: 12,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 20,
  },
  continueButton: {
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    paddingVertical: 16,
    alignItems: "center",
  },
  continueText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OTPVerification;
