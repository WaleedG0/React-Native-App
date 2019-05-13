import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View, Image } from "react-native";
import {
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Right,
  Button,
  Spinner
} from "native-base";

export default class Filters extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { filters, onDeleteFilter, loading, navigation } = this.props;
    const { navigate } = navigation;

    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <Button
            style={{ flex: 1, margin: 10, justifyContent: "center" }}
            bordered
            onPress={() => navigate("AddFilter")}
          >
            <Text>Add Filter</Text>
          </Button>
        </View>

        <View>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                marginTop: 30
              }}
            >
              <Spinner color="blue" />
            </View>
          ) : (
            filters.map((technology, i) => (
              <List key={i}>
                <ListItem thumbnail>
                  <View>
                    <Thumbnail
                      style={{ width: 50, height: 50 }}
                      source={{
                        uri: technology.logo
                      }}
                    />
                  </View>
                  <Body>
                    <Text>{technology.name}</Text>
                    <Text note numberOfLines={1}>
                      {`${technology.experianceYears} years of experince`}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      danger
                      onPress={onDeleteFilter.bind(this, technology)}
                    >
                      <Text>Delete</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
            ))
          )}
        </View>
      </View>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  onDeleteFilter: PropTypes.func
};
