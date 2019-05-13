import { StyleSheet } from "react-native";
import layout from "../../constants/Layout";

const styles = StyleSheet.create({
  animatedContainer: {
    //@todo height should be calculated and refactor this file
    height: layout.window.height - 120,
    width: layout.window.width - 20,
    margin: 10,
    borderRadius: 5,
    position: "absolute"
  },

  likeAnimatedContainer: {
    opacity: this.likeOpacity,
    transform: [{ rotate: "-30deg" }],
    position: "absolute",
    top: 50,
    left: 40,
    zIndex: 10000
  },

  likeText: {
    borderWidth: 1,
    borderColor: "green",
    color: "green",
    fontSize: 32,
    padding: 10
  },

  dislikeAnimatedContainer: {
    opacity: this.likeOpacity,
    transform: [{ rotate: "-30deg" }],
    position: "absolute",
    top: 50,
    right: 40,
    zIndex: 10000
  },

  dislikeText: {
    borderWidth: 1,
    borderColor: "red",
    color: "red",
    fontSize: 32,
    padding: 10
  }
});

export default styles;
