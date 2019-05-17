import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList } from "react-native";
import { Spinner } from "native-base";
import Match from "../../components/Match";
import styles from "./CandidatesStyles";
import layout from "../../constants/Layout";

export default class Candidates extends React.Component {
  static navigationOptions = {
    header: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.matches.length !== this.props.matches.length ||
      nextProps.matches.length === 0
    ) {
      return true;
    }

    return false;
  }

  componentWillMount() {
    const { onLoadCandidates, candidatesDB } = this.props;

    if (candidatesDB.length === 0) {
      onLoadCandidates();
    }
  }

  render() {
    const {
      matches,
      loading,
      onAcceptCandidate,
      onRejectCandidate
    } = this.props;

    //could not get FlatList to work with tender animation
    let trimmedMatches = matches.length > 10 ? matches.slice(0, 10) : matches;

    return (
      <View style={styles.container}>
        {!loading && trimmedMatches.length > 0 && (
          <View>
            <View
              style={{
                height: layout.window.height - 120,
                width: layout.window.width - 20,
                margin: 10,
                borderRadius: 5,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>No Matches Left</Text>
            </View>

            {trimmedMatches.map((match, i) => (
              <Match
                onLike={onAcceptCandidate}
                onDislike={onRejectCandidate}
                key={i}
                match={match}
              />
            ))}
          </View>
        )}

        {loading && (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Spinner color="blue" />
          </View>
        )}

        {!loading && trimmedMatches.length === 0 && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No matches found</Text>
          </View>
        )}
      </View>
    );
  }
}

Candidates.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onRejectCandidate: PropTypes.func,
  onAcceptCandidate: PropTypes.func
};
