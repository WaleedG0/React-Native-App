import React from "react";
import { ScrollView, View } from "react-native";
import styles from "./CandidatesStyles";

import { Button, Text } from "native-base";

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
          <View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
