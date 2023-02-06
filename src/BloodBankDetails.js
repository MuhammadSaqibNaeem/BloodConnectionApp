/** @format */
/////firebase///

import {
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";

/////firebase///////
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../assets/theme/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Platform, Alert } from "react-native";

////responsive width height code ///
////responsive width height code ///
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///

const BloodBankDetails = ({ navigation, route }) => {
  const BloodBankData = route.params;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Ionicons
          name="ios-arrow-back-sharp"
          size={50}
          color={Colors.secondary}
          onPress={() => navigation.goBack()}
        />

        <View style={styles.DetailsMainView}>
          <Text style={styles.headingTextStyle}>Blood Bank Details</Text>

          <View style={styles.textInputSubViews}>
            <Text
              style={[
                styles.headingTextStyle,
                { fontWeight: "500", fontSize: 22 },
              ]}
            >
              {`Name : ` + `${BloodBankData.bloodBankName}`}
            </Text>
            <Text
              style={[
                styles.headingTextStyle,
                { fontWeight: "500", fontSize: 22 },
              ]}
            >
              {`Phone Number : ` + `${BloodBankData.phoneNumber}`}
            </Text>
            <Text
              style={[
                styles.headingTextStyle,
                { fontWeight: "500", fontSize: 22 },
              ]}
            >
              {`Location : ` + `${BloodBankData.location}`}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BloodBankDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    height: screenHeight,
  },

  headingTextStyle: {
    fontWeight: "700",
    color: Colors.background,
    fontSize: 30,
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  textInputSubViews: {
    alignSelf: "center",
    width: screenWidth * 0.9,
  },
  DetailsMainView: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.5,
    marginTop: hp("5%"),
    alignSelf: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 30,
  },
});
