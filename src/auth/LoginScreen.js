/** @format */
/////firebase///

import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
/////firebase///////
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../assets/theme/Colors";
import { Picker } from "@react-native-picker/picker";
import SwitchSelector from "react-native-switch-selector";
////components//////
import PrimaryButton from "../components/PrimaryButton";
import TextInputCom from "../components/TextInputCom";
////components//////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native";
////responsive width height code ///
////responsive width height code ///
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///

const LoginScreen = ({ navigation }) => {
  const ForgetPassword = () => {
    if (email != "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          {
            Platform.OS === "ios"
              ? Alert.alert("Password Reset Email has been Sent  Successfully")
              : ToastAndroid.show(
                  "Password Reset Email has been Sent  Successfully",
                  ToastAndroid.SHORT
                );
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      Alert.alert("Please Enter a Email Address to Forget a Password");
    }
  };
  const LogIn = async () => {
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential.user.emailVerified);
          if (userCredential.user.emailVerified) {
            navigation.navigate("DrawerNav");
          } else {
            Alert.alert("Please Verify Your Email Address");
            sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              // ...
            });
            // signOut(auth)
            //   .then(() => {
            //     // Sign-out successful.
            //   })
            //   .catch((error) => {
            //     // An error happened.
            //   });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      alert("Your Email Address or Password is invalid");
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        style={styles.container}
      >
        <View style={styles.imageViewStyle}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.HeadingTextStyleView}>
          <Text style={styles.HeadingTextStyle}>LogIn</Text>
        </View>

        <View style={styles.textInputMaiView}>
          <View style={styles.textInputSubViews}>
            <TextInputCom
              text={"Email"}
              placeholder={"Please Enter Your Email Address"}
              keyboardType={"email-address"}
              borderWidth={2}
              borderRadius={16}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          <View style={styles.textInputSubViews}>
            <TextInputCom
              text={"Password"}
              placeholder={"Enter Your Password"}
              secureTextEntry={true}
              borderWidth={2}
              borderRadius={16}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <TouchableOpacity
            style={{ alignSelf: "center", padding: 5 }}
            onPress={ForgetPassword}
          >
            <Text style={styles.textStyle}>Forget Password</Text>
          </TouchableOpacity>
          <View style={styles.textInputSubViews}>
            <PrimaryButton title={"LogIn"} onPress={() => LogIn()} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    width: screenWidth,
    height: screenHeight,
  },
  HeadingTextStyleView: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  pickerStyle: {
    width: wp("83%"),
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 16,
    height: hp("7%"),
  },
  HeadingTextStyle: {
    color: Colors.secondary,
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
  },
  textInputMaiView: {
    width: screenWidth * 0.9,
  },
  imageViewStyle: {
    width: screenWidth * 0.3,
    height: screenHeight * 0.15,
    alignSelf: "center",
    borderWidth: 5,
    borderRadius: 100,
    borderColor: Colors.secondary,
    top: hp("3%"),
  },
  imageStyle: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.18,
    justifyContent: "center",

    alignSelf: "center",
    bottom: 25,
  },
  textInputSubViews: { alignSelf: "center", padding: 15 },
  textStyle: {
    fontSize: 15,
    color: Colors.secondary,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});
