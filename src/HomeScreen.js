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

/////Firebase/////
import { Picker } from "@react-native-picker/picker";
import SwitchSelector from "react-native-switch-selector";
import React, { useEffect, useState } from "react";
////firebase///
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

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
import PrimaryButton from "./components/PrimaryButton";
import Card from "./components/Card";
//////Button Component///

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  // console.log("uuuuuuuuuuuss", user.bloodGroup);
  const [userSelectedGroup, setUserSelectedGroup] = useState();
  console.log("User", userSelectedGroup);
  const [selectBloodGroup, setSelectBloodGroup] = useState("1");
  // console.log(selectBloodGroup);
  const [bloodDonation, setBloodDonation] = useState("No");
  const [bloodDonate, setBloodDonate] = useState("No");
  const [userConfirmation, setUserConfirmation] = useState("No");
  const [bloodData, setBloodData] = useState("");
  // console.log("blood Data===", bloodData);
  const [bloodBank, setBloodBank] = useState();

  ///blood Bank Data////
  const BloodBankName = async () => {
    const q = query(collection(db, "bloodBank"));
    const querySnapshot = await getDocs(q);
    let BloodBankData = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());

      BloodBankData.push(doc.data());
      setBloodBank(BloodBankData);
    });
  };
  //////userData///////
  const UserData = async () => {
    const q = query(
      collection(db, "users"),
      where("uid", "!=", auth.currentUser.uid),
      where("bloodGroup", "==", user.bloodGroup)
    );
    const querySnapshot = await getDocs(q);
    let UsersBloodData = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      UsersBloodData.push(doc.data());
      setBloodData(UsersBloodData);
    });
  };

  const allBloodGroups = async () => {
    //setSelectBloodGroup([]);
    // console.log("selected ", selectBloodGroup);

    const q = query(
      collection(db, "users"),
      where("bloodGroup", "==", selectBloodGroup),
      where("uid", "!=", auth.currentUser.uid)
    );
    const onSnapshot = await getDocs(q);

    onSnapshot.forEach((doc) => {
      if (doc.exists) {
        console.log(doc.id, " => ", doc.data());
        let selectedGroup = [];
        selectedGroup.push(doc.data());
        setUserSelectedGroup(selectedGroup);
      } else {
        setUserSelectedGroup([]);
      }
    });
  };

  /////UserName From Firebase/////
  const profileData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      setUser(docSnap.data());
    }
  };
  /////UserName From Firebase/////
  useEffect(() => {
    profileData();
    BloodBankName();
    UserData();
    allBloodGroups();
  }, [selectBloodGroup]);
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <ScrollView style={styles.container}>
          <View style={styles.imageViewStyle}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.HeadingTextStyleView}>
            {user ? (
              <Text style={styles.HeadingTextStyle}>
                Welcome {user.name.substring(0, 20)}!
              </Text>
            ) : (
              <ActivityIndicator size={"large"} color={Colors.secondary} />
            )}
          </View>

          <View style={styles.textInputMaiView}>
            <View style={[styles.textInputSubViews, { width: wp("90%") }]}>
              <Text style={styles.textStyle}>
                Are You Looking for Donate the Blood?
              </Text>
              <SwitchSelector
                initial={1}
                onPress={(value) => setBloodDonate(value)}
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
            {bloodDonate == "Yes" ? (
              <View style={styles.BloodDonateView}>
                <SafeAreaView style={styles.flatlistContainer}>
                  <FlatList
                    horizontal
                    data={bloodBank}
                    renderItem={({ item }) => (
                      <Card
                        item={item}
                        type={"bloodBank"}
                        onPress={() =>
                          navigation.navigate("BloodBankDetails", item)
                        }
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </SafeAreaView>
              </View>
            ) : null}

            <View style={[styles.textInputSubViews, { width: wp("90%") }]}>
              <Text style={styles.textStyle}>
                Are You Looking for Blood Donation?
              </Text>
              <SwitchSelector
                initial={1}
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
            {bloodDonation == "Yes" ? (
              <View style={styles.textInputSubViews}>
                <View style={[styles.textInputSubViews, { width: wp("90%") }]}>
                  <Text style={styles.textStyle}>is it for You?</Text>
                  <SwitchSelector
                    initial={1}
                    onPress={(value) => setUserConfirmation(value)}
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
                {userConfirmation == "Yes" ? (
                  <View style={styles.BloodDonateView}>
                    <SafeAreaView style={styles.flatlistContainer}>
                      <FlatList
                        horizontal
                        data={bloodData}
                        renderItem={({ item }) => (
                          <Card
                            item={item}
                            onPress={() =>
                              navigation.navigate("DonorDetailsScreen", item)
                            }
                          />
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </SafeAreaView>
                  </View>
                ) : (
                  <View style={styles.textInputSubViews}>
                    <Text style={styles.textStyle}>Blood Group</Text>
                    <View style={styles.pickerStyle}>
                      <Picker
                        selectedValue={selectBloodGroup}
                        onValueChange={(value) => setSelectBloodGroup(value)}
                        style={{ width: wp("78%"), alignSelf: "center" }}
                        mode="dropdown"
                      >
                        <Picker.Item
                          label="Please Choose Blood Group"
                          value="1"
                        />
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
                    {selectBloodGroup === "1" ? null : (
                      <View style={styles.BloodDonateView}>
                        <SafeAreaView style={styles.flatlistContainer}>
                          {userSelectedGroup ? (
                            <FlatList
                              horizontal
                              data={userSelectedGroup}
                              renderItem={({ item }) => (
                                <Card
                                  item={item}
                                  onPress={() =>
                                    navigation.navigate(
                                      "DonorDetailsScreen",
                                      item
                                    )
                                  }
                                />
                              )}
                              keyExtractor={(item) => item.id}
                            />
                          ) : (
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 30,
                                alignSelf: "center",
                                color: Colors.secondary,
                              }}
                            >
                              not found
                            </Text>
                          )}
                        </SafeAreaView>
                      </View>
                    )}
                  </View>
                )}
              </View>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
    width: screenWidth * 0.83,
    height: screenHeight * 0.15,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.secondary,
    alignSelf: "center",
    overflow: "hidden",
    marginTop: hp("3%"),
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
