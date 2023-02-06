/** @format */
/////firebase///

import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../assets/theme/Colors";

////components//////
import PrimaryButton from "./components/PrimaryButton";
////components//////
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

const DonorDetailsScreen = ({ navigation, route }) => {
  const DonorData = route.params;
  console.log("Donor Name", DonorData);
  const [user, setUser] = useState();
  const [response, setResponse] = useState("");

  const [dResponse, setDResponse] = useState("");
  console.log("Donor Response=", dResponse.pending);
  /////UserName From Firebase/////
  const profileData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      setUser(docSnap.data().name);
    }
  };
  ///sendMessageToDonor///
  const sendMessage = () => {
    setDoc(doc(db, "Messages", auth.currentUser.uid), {
      senderUid: auth.currentUser.uid,
      receiverUid: DonorData.uid,
      user,
      response,
      pending: "true",
      button: "true",
      donorName: DonorData.name,
      donorPhoneNumber: DonorData.phoneNumber,
      donorLocation: DonorData.city,
    });
  };
  ///sendMessageToDonor///
  const DonorResponse = async () => {
    const q = query(
      collection(db, "Messages"),
      where("senderUid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      setDResponse(doc.data());
    });
  };

  /////UserName From Firebase/////
  useEffect(() => {
    DonorResponse();
    profileData();
  }, [DonorResponse]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Ionicons
          name="ios-arrow-back-sharp"
          size={50}
          color={Colors.secondary}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          <View style={styles.textInputMainView}>
            <View style={styles.textInputSubViews}>
              <Text>
                Hi, <Text style={{ fontWeight: "600" }}>{`${user}`}</Text> is
                looking for blood donor Are You Ok to Connect with
                <Text style={{ fontWeight: "600" }}> {`${user}`}</Text>
              </Text>
            </View>
            <View style={{ marginTop: hp("3%") }}>
              {dResponse.button != "true" ? (
                <PrimaryButton title={"Send"} onPress={sendMessage} />
              ) : null}
            </View>
            {dResponse ? (
              dResponse.pending == "true" ? (
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
                    <ActivityIndicator
                      size={"large"}
                      color={Colors.background}
                    />
                  </View>
                </View>
              ) : dResponse.response == "Yes" ? (
                <View style={styles.DonorProfileDataView}>
                  <Text
                    style={[
                      styles.responseTextStyle,
                      { color: Colors.secondary },
                    ]}
                  >
                    {` ${DonorData.name} ` + `Connecting With You`}
                  </Text>
                  <Text
                    style={[
                      styles.responseTextStyle,
                      { color: Colors.secondary },
                    ]}
                  >
                    {`Email : ` + `${DonorData.email}`}
                  </Text>
                  <Text
                    style={[
                      styles.responseTextStyle,
                      { color: Colors.secondary },
                    ]}
                  >
                    {`Phone Number : ` + `${DonorData.phoneNumber}`}
                  </Text>
                </View>
              ) : dResponse.response == "No" ? (
                <View style={styles.messageResponseViewStyle}>
                  <Text style={[styles.responseTextStyle, { fontSize: 18 }]}>
                    {`Sorry ` +
                      `${DonorData.name}` +
                      ` Can't Connected With You `}
                  </Text>
                </View>
              ) : null
            ) : null}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DonorDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    height: screenHeight,
  },

  messageViewStyle: {
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
  },
  responseTextStyle: {
    fontWeight: "700",
    color: Colors.background,
    fontSize: 20,
    alignSelf: "center",
  },
  textInputSubViews: {
    alignSelf: "center",
    padding: 15,
    borderColor: Colors.secondary,
    borderWidth: 2,
    borderRadius: 16,
  },
  textInputMainView: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.5,
    marginTop: hp("5%"),
    alignSelf: "center",
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
  DonorProfileDataView: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.2,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.secondary,
    alignSelf: "center",
    overflow: "hidden",
    marginTop: hp("5%"),
    justifyContent: "center",
  },
});
