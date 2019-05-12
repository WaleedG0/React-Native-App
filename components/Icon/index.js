import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import { Icon } from "expo";

const IconComponent = ({ name, size, style, color }) => (
  <Icon.Ionicons
    name={Platform.OS === "andriod" ? `md-${name}` : `ios-${name}`}
    size={size}
    style={style}
    color={color}
  />
);

IconComponent.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object
};

export default IconComponent;
