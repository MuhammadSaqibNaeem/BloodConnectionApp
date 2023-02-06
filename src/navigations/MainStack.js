/** @format */
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStack from "./AuthStack";
import ReceivedMessageDetail from "../ReceivedMessageDetail";
import DonorDetailsScreen from "../DonorDetailsScreen";
import BloodBankDetails from "../BloodBankDetails";
import ReceivedResponseDetail from "../ReceivedResponseDetail";
import DrawerNav from "../navigations/DrawerNav";
import { auth } from "../../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
const Stack = createStackNavigator();
const MainStack = ({ navigation }) => {
  //const user = auth.currentUser;
  const [user, setUser] = useState("");
  const checkUser = () => {
    const subs = onAuthStateChanged(auth, (userExists) => {
      console.log(userExists);
      if (userExists) {
        setUser(userExists);
      } else {
        setUser("");
      }
      return subs;
    });
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            name="DrawerNav"
            component={DrawerNav}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DonorDetailsScreen"
            component={DonorDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReceivedMessageDetail"
            component={ReceivedMessageDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BloodBankDetails"
            component={BloodBankDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ReceivedResponseDetail"
            component={ReceivedResponseDetail}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="AuthStack"
            options={{
              headerShown: false,
            }}
            component={AuthStack}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
