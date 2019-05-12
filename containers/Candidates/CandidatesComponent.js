import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Container, Content } from "native-base";

import Match from "../../components/Match";
import styles from "./CandidatesStyles";

export default class Candidates extends React.Component {
  static navigationOptions = {
    header: null
  };

  //height should be calculated
  render() {
    return (
      <View style={styles.container}>
        <Match />
        <Match />
        <Match />
        <Match />
        <Match />
        <Match />
        <Match />
        <Match />
        <Match />
        <Match />
      </View>
    );
  }
}

Candidates.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  onRejectCandidate: PropTypes.func,
  onAcceptCandidate: PropTypes.func
};
