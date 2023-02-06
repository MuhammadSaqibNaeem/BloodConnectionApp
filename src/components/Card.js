/** @format */

import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React from "react";
import Colors from "../../assets/theme/Colors";
////responsive width height code ///
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
////responsive width height code ///
const Card = ({ item, type, onPress }) => {
  return (
    <>
      {type == "bloodBank" ? (
        <Pressable
          style={[styles.item, { width: wp("60%") }]}
          onPress={onPress}
        >
          <Text style={styles.title}>
            {`Name : ` + `${item.bloodBankName}`}
          </Text>
          <Text style={styles.title}>
            {`Phone Number : ` + `${item.phoneNumber.substring(0, 20) + "..."}`}
          </Text>
          <Text style={styles.title}>
            {`location : ` + `${item.location.substring(0, 20) + "..."}`}
          </Text>
        </Pressable>
      ) : type == "ResponseMessage" ? (
        <Pressable
          style={[
            styles.item,
            {
              // width: wp("60%"),
              justifyContent: "center",
              width: screenWidth * 0.9,
            },
          ]}
          onPress={onPress}
        >
          <Text style={styles.title}>
            {`Response From ` + `${item.donorName}`}
          </Text>
        </Pressable>
      ) : type == "ReceivedMessages" ? (
        <Pressable
          style={[
            styles.item,
            {
              // width: wp("60%"),
              justifyContent: "center",
              width: screenWidth * 0.9,
            },
          ]}
          onPress={onPress}
        >
          <Text style={styles.title}>{`Message From ` + `${item.user}`}</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.item} onPress={onPress}>
          <Text style={styles.title}>
            {`Name : ` + `${item.name.substring(0, 20) + "..."}`}
          </Text>
          <Text style={styles.title}>
            {`Blood Group : ` + `${item.bloodGroup}`}
          </Text>
          <Text style={styles.title}>
            {`location : ` + `${item.city.substring(0, 20) + "..."}`}
          </Text>
        </Pressable>
      )}
    </>
  );
};

export default Card;

const styles = StyleSheet.create({
  flatlistContainer: {
    flex: 1,
  },
  item: {
    backgroundColor: Colors.secondary,
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 16,
    width: screenWidth * 0.5,
    height: hp("10%"),
    alignSelf: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.background,
    alignSelf: "center",
  },
});
