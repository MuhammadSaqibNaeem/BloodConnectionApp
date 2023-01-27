/** @format */
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthStack from "./AuthStack";
import HomeScreen from "../HomeScreen";
const MainStack = ({ navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="AuthStack">
      <Stack.Screen
        name="AuthStack"
        options={{
          headerShown: false,
        }}
        component={AuthStack}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
