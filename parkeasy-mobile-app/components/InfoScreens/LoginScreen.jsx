import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoogleIcon from "../../screenImages/googleicon.svg";
import axios from "axios";
const { width, height } = Dimensions.get("window");
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import * as AuthSession from "expo-auth-session"; // <-- Import added

const LoginScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const CLIENT_ID =
    "199863809916-0nt0vk16hjcuk93tti5ci3vk4b58dd94.apps.googleusercontent.com";
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: false, // disable proxy for custom builds
    }),
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      authenticateWithBackend(id_token);
    }
  }, [response]);

  const authenticateWithBackend = async (idToken) => {
    try {
      const res = await axios.post(
        "http://192.168.225.160:3000/api/v1/auth/google",
        {
          id_token: idToken,
        }
      );
      const token = res.data.token;
      await SecureStore.setItemAsync("userToken", token);
      Alert.alert("Success", "Logged in successfully");
      // Navigate to the next screen if needed
    } catch (error) {
      console.error("Authentication Error:", error);
      Alert.alert("Error", "Login failed");
    }
  };
  // Request OTP
  const requestOTP = async () => {
    try {
      // Ensure the phone number is in the correct format
      const formattedNumber = `+91${phoneNumber}`; // Adjust the country code as necessary

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        appVerifier
      );
      setVerificationId(confirmation.verificationId);

      navigation.navigate("OTPVerificationScreen", {
        verificationId: confirmation.verificationId,
        phoneNumber: formattedNumber,
      });
    } catch (error) {
      console.error("Error requesting OTP:", error);
      Alert.alert("Error", error.message); // Show an alert with the error message
    }
  };

  // ------------------------------ Trying Alternative ----------------------------------------------
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const insets = useSafeAreaInsets();
  // useEffect(() => {
  //   const checkUserExists = async (phoneNumber) => {
  //     try {
  //       const response = await axios.get(
  //         `http://192.168.225.160:3000/api/v1/check_user?phone_number=${phoneNumber}`
  //       );

  //       if (response.data.exists) {
  //         // Navigate to UserHomeScreen if the user exists
  //         navigation.navigate("UserHomeScreen");
  //       } else {
  //         // Navigate to LoginScreen if the user is new
  //         navigation.navigate("LoginScreen");
  //       }
  //     } catch (error) {
  //       console.error("Error checking user existence:", error);
  //     }
  //   };

  //   // Example: hardcoded phone number for testing
  //   const phoneNumber = "9566624085"; // Replace with user-entered phone number
  //   checkUserExists(phoneNumber);
  // }, [navigation]);
  // const handleGetOtp = async () => {
  //   if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
  //     Alert.alert("Please enter a valid 10-digit number");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(
  //       "http://192.168.225.160:3000/api/v1/send_otp",
  //       {
  //         phone_number: phoneNumber,
  //       }
  //     );

  //     if (response.data.success) {
  //       const isNewUser = response.data.is_new_user; // Get `isNewUser` from response
  //       navigation.navigate("OTPVerification", { phoneNumber, isNewUser });
  //     } else {
  //       Alert.alert("Failed to send OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error sending OTP:",
  //       error.response?.data || error.message
  //     );
  //     Alert.alert("Error", "Failed to send OTP. Please try again.");
  //   }
  // };
  // ------------------------------ Trying Alternative ----------------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.headerContainer, { marginTop: insets.top + 20 }]}>
          <Text style={styles.logo}>Park.Easy</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.subtitle}>
            Login to your account using phone number
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>IND</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.phonePrefix}>+91</Text>
              <Text style={styles.separator}>|</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter mobile number"
                placeholderTextColor="rgba(140, 140, 140, 1)"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                accessibilityLabel="Enter mobile number"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.otpButton} onPress={requestOTP}>
            <Text style={styles.otpButtonText}>Get OTP</Text>
          </TouchableOpacity>
          {/* Add this div for the reCAPTCHA verifier */}
          {/* <View id="recaptcha-container"></View> */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.googleSignInButton}
            onPress={() => promptAsync()}
          >
            <GoogleIcon style={styles.googleIcon} />
            <Text style={styles.googleSignInText}>Sign In with Google</Text>
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By joining Park.Easy, you agree with our{" "}
              <Text style={styles.termsLink}>
                Terms of services and privacy policy
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(19, 18, 18, 1)",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 20,
    minHeight: height,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 20,
  },
  logo: {
    color: "rgb(255, 214, 19)",
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 3,
  },
  contentContainer: {
    margin: "auto",
    alignItems: "center",
    width: "100%",
  },
  welcome: {
    color: "rgb(255, 214, 19)",
    fontSize: 32,
    fontWeight: "500",
    marginTop: 80,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
    marginTop: 12,
    maxWidth: width * 0.8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    padding: 12,
    marginTop: 36,
    width: "100%",
    maxWidth: 361,
  },
  countryCode: {
    color: "rgba(255, 214, 19, 1)",
    fontWeight: "600",
    marginRight: 10,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  phonePrefix: {
    color: "rgba(255, 255, 255, 1)",
  },
  separator: {
    color: "rgba(87, 87, 87, 1)",
    marginHorizontal: 8,
  },
  phoneInput: {
    color: "rgba(140, 140, 140, 1)",
    flex: 1,
  },
  otpButton: {
    borderRadius: 10,
    backgroundColor: "rgba(255, 214, 19, 1)",
    padding: 12,
    marginTop: 16,
    width: "100%",
    maxWidth: 361,
    alignItems: "center",
  },
  otpButtonText: {
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    width: "100%",
    maxWidth: 361,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(87, 87, 87, 1)",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "rgba(255, 255, 255, 1)",
  },
  googleSignInButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    padding: 12,
    marginTop: 8,
    width: "100%",
    maxWidth: 361,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  googleSignInText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 16,
    fontWeight: "300",
  },
  termsContainer: {
    marginTop: 192,
    alignItems: "center",
  },
  termsText: {
    color: "rgba(140, 140, 140, 1)",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "300",
    maxWidth: width * 0.8,
  },
  termsLink: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
