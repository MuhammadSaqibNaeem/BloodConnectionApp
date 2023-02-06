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
import PrimaryButton from "./components/PrimaryButton";
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

const ReceivedMessageDetail = ({ navigation, route }) => {
  const receivedMessageUserData = route.params;
  const [response, setResponse] = useState("");
  const [button, setButton] = useState("");
  console.log("Button Data=", button.response);
  // console.log(receivedMessageUserData.senderUid);
  //////Message Response///////
  const sendResponse = async (responseData) => {
    const response = doc(db, "Messages", receivedMessageUserData.senderUid);
    await updateDoc(response, {
      response: responseData,
      pending: "false",
    });
  };
  const ButtonResponse = async () => {
    const q = query(
      collection(db, "Messages"),
      where("receiverUid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setButton(doc.data());
    });
  };
  useEffect(() => {
    ButtonResponse();
  });
  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        name="ios-arrow-back-sharp"
        size={50}
        color={Colors.secondary}
        onPress={() => navigation.goBack()}
      />

      <View style={[styles.textInputSubViews, { width: wp("90%") }]}>
        <Text style={styles.messageTextStyle}>
          Hi,
          <Text
            style={[styles.messageTextStyle, { fontWeight: "600" }]}
          >{` ${receivedMessageUserData.user} `}</Text>
          is looking for blood donor Are You Ok to Connect with
          <Text style={[styles.messageTextStyle, { fontWeight: "600" }]}>
            {` ${receivedMessageUserData.user}`}
          </Text>
        </Text>
      </View>
      {!button ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.secondary}
          style={{ marginTop: hp("5%") }}
        />
      ) : button.response == "" ? (
        <View
          style={{ marginTop: "5%", flexDirection: "row", alignSelf: "center" }}
        >
          <View style={{ marginRight: wp("5%") }}>
            <PrimaryButton
              title={"yes"}
              width={wp("30%")}
              onPress={() => {
                sendResponse("Yes");
                setResponse(sendResponse);
              }}
            />
          </View>
          <View style={{ marginLeft: wp("5%") }}>
            <PrimaryButton
              title={"No"}
              button={"outline"}
              width={wp("30%")}
              onPress={() => {
                sendResponse("No");
                setResponse(sendResponse);
              }}
            />
          </View>
        </View>
      ) : (
        <View style={{ marginTop: hp("3%"), alignSelf: "center" }}>
          <Text
            style={{
              color: Colors.secondary,
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            You Responded!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReceivedMessageDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    height: screenHeight,
  },

  textInputSubViews: {
    alignSelf: "center",
    padding: 15,
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    borderBottomEndRadius: 0,
    marginTop: hp("5%"),
  },
  messageTextStyle: {
    color: Colors.background,
  },
});
