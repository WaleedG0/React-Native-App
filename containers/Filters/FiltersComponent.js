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
    const { filters, onDeleteFilter } = this.props;

    return (
      <View>
        <View style={{flexDirection: "row"}}>
        <Button style={{ flex: 1, margin: 10, justifyContent: "center"}} bordered onPress={() => onDeleteFilter(technology)}>
          <Text>Add Filter</Text>
        </Button>

        </View>

        <ScrollView>
          {filters.map((technology, i) => (
            <Container key={i}>
              <Content>
                <List>
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
                      <Button danger onPress={() => onDeleteFilter(technology)}>
                        <Text>Delete</Text>
                      </Button>
                    </Right>
                  </ListItem>
                </List>
              </Content>
            </Container>
          ))}
        </ScrollView>
      </View>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  onDeleteFilter: PropTypes.func
};
