/** @format */

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
/////Firebase/////

import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../firebase.config";

/////Firebase/////

import React, { useEffect, useState } from "react";

import Colors from "../assets/theme/Colors";

////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///

const ReceivedResponseDetail = ({ navigation, route }) => {
  const DonorData = route.params;
  console.log(DonorData.response);
  //////Message Response///////

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Ionicons
          name="ios-arrow-back-sharp"
          size={50}
          color={Colors.secondary}
          onPress={() => navigation.goBack()}
        />
        {DonorData.response == "Yes" ? (
          <View style={styles.DetailsMainView}>
            <Text style={styles.headingTextStyle}>Donor Details</Text>

            <View style={styles.textInputSubViews}>
              <Text
                style={[
                  styles.headingTextStyle,
                  { fontWeight: "500", fontSize: 22 },
                ]}
              >
                {`Name : ` + `${DonorData.donorName}`}
              </Text>
              <Text
                style={[
                  styles.headingTextStyle,
                  { fontWeight: "500", fontSize: 22 },
                ]}
              >
                {`Phone Number : ` + `${DonorData.donorPhoneNumber}`}
              </Text>
              <Text
                style={[
                  styles.headingTextStyle,
                  { fontWeight: "500", fontSize: 22 },
                ]}
              >
                {`Location : ` + `${DonorData.donorLocation}`}
              </Text>
            </View>
          </View>
        ) : DonorData.response == "No" ? (
          <View style={styles.messageResponseViewStyle}>
            <Text style={[styles.responseTextStyle, { fontSize: 18 }]}>
              {`Sorry ` + `${DonorData.name}` + ` Can't Connected With You `}
            </Text>
          </View>
        ) : (
          <View style={styles.messageResponseViewStyle}>
            <Text style={styles.responseTextStyle}>
              {`Response from` + ` ${DonorData.name}`}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: hp("1%"),
              }}
            >
              <Text style={styles.responseTextStyle}>Pending</Text>
              <ActivityIndicator size={"large"} color={Colors.background} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ReceivedResponseDetail;

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
  messageResponseViewStyle: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.secondary,
    alignSelf: "center",
    overflow: "hidden",
    marginTop: hp("3%"),
    marginLeft: wp("5%"),
    justifyContent: "center",
    backgroundColor: Colors.secondary,
  },
  responseTextStyle: {
    fontWeight: "700",
    color: Colors.background,
    fontSize: 20,
    alignSelf: "center",
  },
});
