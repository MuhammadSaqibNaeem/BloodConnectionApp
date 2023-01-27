/** @format */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../auth/LoginScreen";
import RegisterScreen from "../auth/RegisterScreen";
import WelcomeScreen from "../auth/WelcomeScreen";
const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="WelcomeScreen"
    >
      <Stack.Screen
        name="WelcomeScreen"
        options={{
          headerShown: false,
        }}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="LoginScreen"
        options={{
          headerShown: false,
        }}
        component={LoginScreen}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default Auth;
