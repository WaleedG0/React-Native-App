import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import Candidates from "../containers/Candidates/CandidatesContainer";
import Filters from "../containers/Filters/FiltersContainer";
import AddFilter from "../containers/AddFilter/AddFilterContainer";

const CandidatesStack = createStackNavigator({
  Candidates
});

CandidatesStack.navigationOptions = {
  tabBarLabel: "Candidates",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const FiltersStack = createStackNavigator(
  {
    Filters,
    AddFilter
  },
  { initialRouteName: "Filters" }
);

FiltersStack.navigationOptions = {
  tabBarLabel: "Filters",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

export default createBottomTabNavigator({
  CandidatesStack,
  FiltersStack
});
