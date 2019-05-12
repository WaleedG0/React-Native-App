import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View, Text } from "react-native";
import styles from "./FiltersStyles";

export default class Filters extends React.Component {
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
          <Text>filters</Text>
        </ScrollView>
      </View>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  onDeleteFilter: PropTypes.func
};
