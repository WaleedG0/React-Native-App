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
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: layout.window.width + 100, y: gestureState.dy }
          }).start();
        } else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -layout.window.width - 100, y: gestureState.dy }
          }).start();
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
    return (
      <Animated.View
        {...this.PanResponder.panHandlers}
        style={[styles.animatedContainer, this.rotateAndTranslate]}
      >
        <Card style={{ flex: 1 }}>
          <Animated.View style={styles.likeAnimatedContainer}>
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>

          <Animated.View style={styles.dislikeAnimatedContainer}>
            <Text style={styles.dislikeText}>NOPE</Text>
          </Animated.View>

          <CardItem>
            <Body>
              <H1>NativeBase</H1>
              <Text note>GeekyAnts</Text>
            </Body>
          </CardItem>

          <CardItem cardBody style={{ flex: 1 }}>
            <Image
              source={{
                uri:
                  "https://cdn-images-1.medium.com/max/1200/1*Y0UYuGcFGSCfs5Eexafq6A.png"
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
  match: PropTypes.object
};
