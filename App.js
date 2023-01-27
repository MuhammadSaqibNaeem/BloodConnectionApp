/** @format */

import AppRout from "./src/navigations/AppRout.js";
import { StatusBar, View } from "react-native";
import Colors from "./assets/theme/Colors.js";
function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.secondary} barStyle="light-content" />
      <AppRout />
    </View>
  );
}
export default App;
