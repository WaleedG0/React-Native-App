import { StyleSheet } from "react-native";
import layout from "../../constants/Layout";
import { Constants } from "expo";

const styles = StyleSheet.create({
  container: {
    height: layout.window.height - Constants.statusBarHeight,
    marginTop: Constants.statusBarHeight
  }
});

export default styles;
