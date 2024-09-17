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

const { width } = Dimensions.get("window");

const OTPVerification = ({ route, navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { phoneNumber } = route.params;
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
        onPress={() => navigation.navigate("OnBoardScreen2")}
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
