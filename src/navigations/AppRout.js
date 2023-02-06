/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";

import { auth } from "../../firebase.config";

const AppRout = () => {
  const user = auth.currentUser;
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default AppRout;
