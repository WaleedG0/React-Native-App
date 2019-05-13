import React from "react";
import PropTypes from "prop-types";
import { Image, Animated, PanResponder } from "react-native";
import { Card, CardItem, Text, Body, H1 } from "native-base";
import layout from "../../constants/Layout";

import styles from "./styles";

export default class Match extends React.Component {
  position = new Animated.ValueXY();

  rotate = this.position.x.interpolate({
    inputRange: [-layout.window.width / 2, 0, layout.window.width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp"
  });

  rotateAndTranslate = {
    transform: [
      {
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
    ]
  };

  likeOpacity = this.position.x.interpolate({
    inputRange: [-layout.window.width / 2, 0, layout.window.width / 2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp"
  });

  dislikeOpacity = this.position.x.interpolate({
    inputRange: [-layout.window.width / 2, 0, layout.window.width / 2],
    outputRange: [1, 0, 0],
    extrapolate: "clamp"
  });

  componentWillMount() {
    const { match, onLike, onDislike } = this.props;

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: layout.window.width + 100, y: gestureState.dy }
          }).start(() => {
            onLike(match._id);
          });
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -layout.window.width - 100, y: gestureState.dy }
          }).start(() => {
            onDislike(match._id);
          });
        } else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start();
        }
      }
    });
  }

  render() {
    const { match } = this.props;
    return (
      <Animated.View
        {...this.PanResponder.panHandlers}
        style={[styles.animatedContainer, this.rotateAndTranslate]}
      >
        <Card style={{ flex: 1 }}>
          <Animated.View
            style={{
              opacity: this.likeOpacity,
              transform: [{ rotate: "-30deg" }],
              position: "absolute",
              top: 50,
              left: 40,
              zIndex: 1000
            }}
          >
            <Text
              style={{
                borderWidth: 1,
                borderColor: "green",
                color: "green",
                fontSize: 32,
                fontWeight: "800",
                padding: 10
              }}
            >
              LIKE
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: this.dislikeOpacity,
              transform: [{ rotate: "30deg" }],
              position: "absolute",
              top: 50,
              right: 40,
              zIndex: 1000
            }}
          >
            <Text
              style={{
                borderWidth: 1,
                borderColor: "red",
                color: "red",
                fontSize: 32,
                fontWeight: "800",
                padding: 10
              }}
            >
              NOPE
            </Text>
          </Animated.View>

          <CardItem>
            <Body>
              <H1>{`${match.name.first} ${match.name.last}`}</H1>
              <Text note>{match.currentCompany}</Text>
            </Body>
          </CardItem>

          <CardItem cardBody style={{ flex: 1 }}>
            <Image
              source={{
                uri: match.picture
              }}
              style={{ height: 400, width: null, flex: 1, resizeMode: "cover" }}
            />
          </CardItem>
        </Card>
      </Animated.View>
    );
  }
}

Match.propTypes = {
  match: PropTypes.object,
  onLike: PropTypes.func,
  onDislike: PropTypes.func
};
