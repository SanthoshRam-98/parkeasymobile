import React, { useState } from "react";
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
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GoogleIcon from "/Users/santh/OneDrive/Desktop/parkeasymobile/parkeasy-mobile-app/screenImages/googleicon.svg";
const { width, height } = Dimensions.get("window");
const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const insets = useSafeAreaInsets();
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

          <TouchableOpacity
            style={styles.otpButton}
            onPress={() =>
              navigation.navigate("OTPVerification", { phoneNumber })
            }
          >
            <Text style={styles.otpButtonText}>Get OTP</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleSignInButton}>
            {/* Assuming GoogleIcon is an imported component */}
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
