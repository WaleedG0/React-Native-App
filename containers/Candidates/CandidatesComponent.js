import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";
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
          <View />
        </ScrollView>
      </View>
    );
  }
}

Candidates.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  onRejectCandidate: PropTypes.func,
  onAcceptCandidate: PropTypes.func
};
