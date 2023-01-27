/** @format */

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
///App Colors///
import Colors from "../../assets/theme/Colors";
///App Colors///
import PrimaryButton from "../components/PrimaryButton";
////responsive width height code ///
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///
const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageViewStyle}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.buttonView}>
        <View style={styles.buttonSubView}>
          <PrimaryButton title={"Login"} />
        </View>
        <View style={styles.buttonSubView}>
          <PrimaryButton
            title={"SignUp"}
            button={"outline"}
            onPress={() => navigation.navigate("RegisterScreen")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  imageViewStyle: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.3,
    justifyContent: "center",
  },
  imageStyle: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.3,
    justifyContent: "center",
  },
  buttonView: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    justifyContent: "center",
    // padding: 20,
  },
  buttonSubView: {
    marginTop: 20,
  },
});
