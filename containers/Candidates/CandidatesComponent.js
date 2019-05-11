import React from "react";
import { ScrollView, View, Text } from "react-native";
import styles from "./CandidatesStyles";

export default class Candidates extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text>yayayayyaayaay!</Text>
        </ScrollView>
      </View>
    );
  }
}
