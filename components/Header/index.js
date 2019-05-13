import React from "react";
import {
  Container,
  Header,
  Body,
  Left,
  Right,
  Title
} from "native-base";
import Icon from "../Icon";
import styles from "./styles";

export default class HeaderComponent extends React.Component {
  render() {
    return (
        <Header>
          <Body style={styles.bodyContainer}>
            <Icon style={styles.logoIcon} name={"star-outline"} size={30} />
            <Title style={styles.headerTitle}>MOSSAD</Title>
          </Body>
        </Header>
    );
  }
}
