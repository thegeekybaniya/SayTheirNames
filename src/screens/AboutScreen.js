import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Platform,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import * as Linking from "expo-linking";

import Screen from "../components/Screen";

import Modal from "../components/Modal";

import API from "../api";

import { Header, Icon, Image, Button, Card } from "react-native-elements";
import AppView from "../components/AppView";
const SCREEN_WIDTH = Dimensions.get("window").width;

let MAX_WIDTH = 600;

const AboutScreen = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [dat, setData] = useState({
    next: 1,
    petitions: [],
    last: null,
  });

  if (dat.next == 1) {
    API.getPetitions()
      .then((data) => {

        setData({
          next: dat.next + 1,
          petitions: dat.petitions.concat(data.data),
          last: data.meta.last_page,
        });
      })
      .catch((err) => {
        console.error( err);
      });
  }

  return (
    <>
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          centerComponent={{
            text: "ABOUT",
            style: styles.headerText,
          }}
        />
        <View style={styles.scrollContainer}>
          <Text
            style={{ paddingVertical: 10, fontFamily: "Karla", fontSize: 18 }}
          >
            "Say Their Names" is an open source initiative started by Franck
            Ndame, under the #BlackLivesMatter movement. "Say Their Name" aims
            to make it easy to donate, raise awareness, and sign petitions under
            the #BlackLivesMatter movement .
          </Text>
          <Text
            style={{ paddingVertical: 10, fontFamily: "Karla", fontSize: 18 }}
          >
            This is not the official implementation by the "Say Their Name"
            community. This is a voluntary project made by me (Purujit Bansal)
            using React-Native and Expo. The motivation behind this project was
            to come up with a quick cross-platform solution while the talented
            devs at "Say Their Name" organisation are making native
            implementations for each platform.
          </Text>
          <Button
            buttonStyle={{
              borderRadius: 5,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              borderColor: "black",
              backgroundColor: "white",
            }}
            type="outline"
            title="JOIN THE OFFICIAL COMMUNITY"
            titleStyle={{
              fontFamily: "Karla",
              color: "black",
              fontWeight: "bold",
            }}
            onPress={() => {
              Linking.openURL("https://t.co/czWzOaT93e?amp=1");
            }}
            containerStyle={{ paddingVertical: 10 }}
          />
          <Button
            buttonStyle={{
              borderRadius: 5,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              borderColor: "black",
              backgroundColor: "white",
            }}
            type="outline"
            title={"Checkout Official Repo".toUpperCase()}
            titleStyle={{
              fontFamily: "Karla",
              color: "black",
              fontWeight: "bold",
            }}
            onPress={() => {
              Linking.openURL("https://github.com/Say-Their-Name");
            }}
            containerStyle={{ paddingVertical: 10 }}
          />

          <Button
            buttonStyle={{
              borderRadius: 5,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
              borderColor: "black",
              backgroundColor: "black",
            }}
            type="solid"
            title={"About Me".toUpperCase()}
            titleStyle={{
              fontFamily: "Karla",
              color: "white",
              fontWeight: "bold",
            }}
            onPress={() => {
              Linking.openURL(
                "https://www.linkedin.com/in/purujit-bansal-ab3450121/"
              );
            }}
            containerStyle={{ paddingVertical: 10 }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    maxWidth: MAX_WIDTH,
    width: "100%",
    height: "100%",
  },

  introSubContainer: { width: "50%", height: "100%", padding: 10 },
  header: { backgroundColor: "white", width: "100%" },
  headerText: { color: "black", fontFamily: "Karla", fontSize: 25 },
  backText: { color: "black", fontFamily: "Karla", fontSize: 15 },
});

export default AboutScreen;
