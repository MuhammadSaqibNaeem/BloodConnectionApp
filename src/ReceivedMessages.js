/** @format */

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  FlatList,
} from "react-native";

/////Firebase/////
import { collection, query, where, getDocs } from "firebase/firestore";
/////Firebase/////

import React, { useEffect, useState } from "react";
////firebase///
// import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase.config";
/////firebase///
import Colors from "../assets/theme/Colors";

////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///

//////Button Component///

import Card from "./components/Card";
//////Button Component///

const ReceivedMessages = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);
  // console.log(auth.currentUser.uid);
  const [user, setUser] = useState("");
  console.log(user);
  //////Messages Data///////
  const MessagesData = async () => {
    const q = query(
      collection(db, "Messages"),
      where("receiverUid", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      let ReceivedMessages = [];
      ReceivedMessages.push(doc.data());
      setUser(ReceivedMessages);
    });
  };

  /////UserName From Firebase/////
  useEffect(() => {
    MessagesData();
  }, []);
  return (
    <SafeAreaView>
      {user ? (
        <SafeAreaView style={{ marginTop: "5%" }}>
          <FlatList
            data={user}
            renderItem={({ item }) => (
              <Card
                item={item}
                type={"ReceivedMessages"}
                onPress={() =>
                  navigation.navigate("ReceivedMessageDetail", item)
                }
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      ) : isLoading ? (
        <ActivityIndicator
          color={Colors.secondary}
          size={"large"}
          style={{ justifyContent: "center", marginTop: hp("40%") }}
        />
      ) : (
        <View style={{ justifyContent: "center", marginTop: hp("40%") }}>
          <Text
            style={{
              alignSelf: "center",
              color: Colors.secondary,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            There is No Received Messages
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReceivedMessages;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
    height: screenHeight,
  },
  HeadingTextStyleView: {
    width: screenWidth * 5,
    height: screenHeight * 0.1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    marginTop: hp("5%"),
  },
  pickerStyle: {
    width: wp("83%"),
    overflow: "hidden",
    borderWidth: 2,
    borderColor: Colors.secondary,
    borderRadius: 16,
    height: hp("7%"),
  },
  BloodDonateView: {
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
  HeadingTextStyle: {
    color: Colors.secondary,
    fontSize: 20,
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
