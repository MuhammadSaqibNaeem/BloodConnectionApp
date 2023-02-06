/** @format */
/////firebase///

import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signOut,
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
import { Platform } from "react-native";
import { Alert } from "react-native";
////responsive width height code ///
////responsive width height code ///
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///

const RegisterScreen = ({ navigation }) => {
  const SignUp = async () => {
    if (
      name != "" &&
      email != "" &&
      phoneNumber != "" &&
      bloodGroup != "" &&
      city != "" &&
      neighborhood != "" &&
      userId != "" &&
      bloodDonation != "" &&
      medicalCondition != "" &&
      password != ""
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            // Email verification sent!
            // ...
          });
          // signOut(auth)
          //   .then(() => {
          //     // Sign-out successful.
          //   })
          // .catch((error) => {
          //   // An error happened.
          // });
          setDoc(doc(db, "users", userCredential.user.uid), {
            uid: userCredential.user.uid,
            name,
            email,
            phoneNumber,
            bloodGroup,
            city,
            neighborhood,
            userId,
            bloodDonation,
            medicalCondition,
          });
          {
            Platform.OS === "ios"
              ? Alert.alert("Your Account Successfully Created")
              : ToastAndroid.show(
                  "Your Account Successfully Created",
                  ToastAndroid.SHORT
                );
          }

          navigation.navigate("LoginScreen");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          {
            Platform.OS === "ios"
              ? Alert.alert(errorMessage, ToastAndroid.SHORT)
              : ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
          }
        });
    } else {
      Alert.alert("Sorry, Please Enter All Data");
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [userId, setUserId] = useState("");
  const [bloodDonation, setBloodDonation] = useState("yes");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <ScrollView style={styles.container}>
          <View style={styles.imageViewStyle}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.HeadingTextStyleView}>
            <Text style={styles.HeadingTextStyle}>Registration Form</Text>
          </View>

          <View style={styles.textInputMaiView}>
            <View style={styles.textInputSubViews}>
              <TextInputCom
                text={"Name"}
                placeholder={"Please Enter Your Name"}
                borderWidth={2}
                borderRadius={16}
                onChangeText={(value) => setName(value)}
              />
            </View>
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
                text={"Phone Number"}
                placeholder={"Please Enter Your Phone Number"}
                borderWidth={2}
                borderRadius={16}
                keyboardType={"phone-pad"}
                onChangeText={(value) => setPhoneNumber(value)}
              />
            </View>
            <View style={[styles.textInputSubViews, { width: wp("88%") }]}>
              <Text style={styles.textStyle}>Blood Group</Text>
              <View style={styles.pickerStyle}>
                <Picker
                  selectedValue={bloodGroup}
                  onValueChange={(value) => setBloodGroup(value)}
                  style={{ width: wp("78%"), alignSelf: "center" }}
                  mode="dropdown"
                >
                  <Picker.Item label="Please Choose Blood Group" value="" />
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="O-" value="O-" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="AB-" value="AB-" />
                </Picker>
              </View>
            </View>
            <View style={styles.textInputSubViews}>
              <TextInputCom
                text={"City"}
                placeholder={"Enter Your City"}
                borderWidth={2}
                borderRadius={16}
                onChangeText={(value) => setCity(value)}
              />
            </View>
            <View style={styles.textInputSubViews}>
              <TextInputCom
                text={"Neighborhood"}
                placeholder={"Enter Your Neighborhood"}
                borderWidth={2}
                borderRadius={16}
                onChangeText={(value) => setNeighborhood(value)}
              />
            </View>
            <View style={styles.textInputSubViews}>
              <TextInputCom
                text={"User Id"}
                placeholder={"Enter Your User Id"}
                borderWidth={2}
                borderRadius={16}
                onChangeText={(value) => setUserId(value)}
              />
            </View>
            <View style={[styles.textInputSubViews, { width: wp("90%") }]}>
              <Text style={styles.textStyle}>Can You Donate Blood?</Text>
              <SwitchSelector
                initial={0}
                onPress={(value) => setBloodDonation(value)}
                textStyle={{ fontWeight: "bold" }}
                selectedTextColor={Colors.background}
                textColor={Colors.textColor}
                selectedColor={Colors.secondary}
                buttonColor={Colors.secondary}
                borderColor={Colors.secondary}
                borderWidth={2}
                borderRadius={16}
                textColor={Colors.secondary}
                selectedTextStyle={{
                  color: Colors.background,
                  fontWeight: "bold",
                }}
                height={hp("7%")}
                hasPadding
                options={[
                  { label: "Yes", value: "Yes" },
                  { label: "No", value: "No" },
                ]}
              />
            </View>
            <View style={styles.textInputSubViews}>
              <TextInputCom
                text={"Existing Medical Condition"}
                placeholder={"Please Enter Your Existing Medical Conditions"}
                borderWidth={2}
                borderRadius={16}
                onChangeText={(value) => setMedicalCondition(value)}
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
            <View style={styles.textInputSubViews}>
              <PrimaryButton title={"Submit"} onPress={() => SignUp()} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
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
    height: screenHeight * 1.65,
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
