import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Button } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

export default class CustomButton extends Component {
  constructor() {
    super();

    this.state = {
      selected: false,
    };
  }

  // componentDidMount() {
  //   const { selected } = this.props;

  //   this.setState({
  //     selected,
  //   });
  // }

  render() {
    const { title } = this.props;
    const { onPress } = this.props;
    const { selected } = this.props;
    return (
      <Button
        title={title}
        titleStyle={selected?{fontSize: 15, color: "white"}:{ fontSize: 15, color: "black" }}
        buttonStyle={
          selected
            ? {
                backgroundColor: "black",
                width: 127,
                borderWidth: 1,
                borderColor: "black",
              }
            : {
                borderWidth: 1,
                borderColor: "black",
                width: 127,
                backgroundColor: "white",
              }
        }
        containerStyle={{ marginRight: 10 }}
        onPress={onPress}
      />
    );
  }
}
