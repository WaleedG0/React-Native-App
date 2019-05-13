import React from "react";
import { ScrollView, View } from "react-native";
import { Form, Item, Picker, Input, Button, Text } from "native-base";
import Icon from "../../components/Icon";
import styles from "./AddFilterStyles";

export default class AddFilter extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    values: {
      name: "Presto",
      experianceYears: "1"
    }
  };

  handleValueChange = (inputName, value) => {
    this.setState(prevState => ({
      values: { ...prevState.values, [inputName]: value }
    }));
  };

  handleAddFilter() {
    const { values } = this.state;
    const { navigation, addFilter } = this.props;

    if (values.name && values.experianceYears) {
      addFilter(values);
      navigation.navigate("Filters");
    }
  }

  render() {
    const { technologiesDB, addFilter } = this.props;
    const { values } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select A Technology"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.values.name}
                onValueChange={value => this.handleValueChange("name", value)}
              >
                {technologiesDB.map((technology, index) => (
                  <Picker.Item
                    key={index}
                    label={technology.name}
                    value={technology.name}
                  />
                ))}
              </Picker>
            </Item>
            <Item regular style={{ marginTop: 20 }}>
              <Input
                value={this.state.values.experianceYears}
                placeholder="Years of experince"
                onChangeText={value =>
                  this.handleValueChange("experianceYears", value)
                }
              />
            </Item>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <Button
                style={{ flex: 1, marginTop: 30, justifyContent: "center" }}
                onPress={() => this.handleAddFilter()}
              >
                <Text>Add</Text>
              </Button>
            </View>
          </Form>
        </ScrollView>
      </View>
    );
  }
}
