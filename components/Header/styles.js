import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      android: {
        justifyContent: "flex-end"
      }
    })
  },

  headerTitle: {
    textTransform: "capitalize"
  },

  logoIcon: {
    margin: 15,
    color: "#fff"
  }
});

export default styles;
