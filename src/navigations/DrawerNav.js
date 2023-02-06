/** @format */
import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaView, Text, View, Alert, ToastAndroid } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../assets/theme/Colors";
import ReceivedMessages from "../ReceivedMessages";
import ReceivedResponseScreen from "../ReceivedResponseScreen";
import HomeScreen from "../HomeScreen";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { TouchableOpacity } from "react-native";
const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  const decide = () => {
    Alert.alert(
      "Log Out",
      "Are You Sure!",
      [
        {
          text: "Yes",
          onPress: () => logOut(),
          style: "yes",
        },
        { text: "No" },
      ],
      { cancelable: false }
    );
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {
        ToastAndroid.show("Logged Out", ToastAndroid.SHORT);
        navigation.navigate("WelcomeScreen");
        console.log("logout");
      })
      .catch((error) => {});
  };
  return (
    <>
      <DrawerItemList {...props} />
      <View
        {...props}
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignSelf: "center",
            position: "absolute",
            bottom: 20,
          }}
          onPress={decide}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
              paddingRight: 15,
            }}
          >
            Sign Out
          </Text>
          <Entypo name="log-out" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}

function App() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        drawerLabelStyle: {
          fontSize: 20,
          fontWeight: "bold",
          alignSelf: "center",
        },
        activeTintColor: Colors.secondary,
        headerTitleAlign: "center",
        drawerActiveBackgroundColor: Colors.secondary,
        drawerActiveTintColor: Colors.background,
        drawerInactiveTintColor: Colors.secondary,

        itemStyle: { marginVertical: 5 },
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{ drawerLabel: "Home", title: "Home" }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="Message"
        options={{
          drawerLabel: "Received Requests",
          title: "Received Requests",
        }}
        component={ReceivedMessages}
      />
      <Drawer.Screen
        name="Responded"
        options={{
          drawerLabel: "Responded Messages",
          title: "Responded Messages",
        }}
        component={ReceivedResponseScreen}
      />
    </Drawer.Navigator>
  );
}

export default App;
