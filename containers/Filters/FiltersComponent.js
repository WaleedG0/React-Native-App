import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import styles from "./FiltersStyles";

export default class Filters extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { filters, onDeleteFilter, navigation } = this.props;
    const { navigate } = navigation;
    console.tron.log(filters);
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
          {filters.map((technology, i) => (
            <List key={i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={{ uri: technology.logo }} />
                </Left>
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
          ))}
        </View>
      </View>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  onDeleteFilter: PropTypes.func
};
