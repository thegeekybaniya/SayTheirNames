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

import Screen from "../components/Screen";

import Modal from "../components/Modal";

import { Header, Icon, Image, Button } from "react-native-elements";
import AppView from "../components/AppView";
const SCREEN_WIDTH = Dimensions.get("window").width;

let MAX_WIDTH = 600;

let temph, IMG_HEIGHT;
if (SCREEN_WIDTH > MAX_WIDTH) {
  temph = MAX_WIDTH;
} else {
  temph = SCREEN_WIDTH;
}
IMG_HEIGHT = (temph / 2 / 180) * 200;
let IMG_WIDTH = (IMG_HEIGHT * 180) / 200;
console.log("HE", IMG_HEIGHT);

const DetailHeadingText = ({ children }) => {
  return (
    <Text style={{ color: "grey", fontSize: 15, fontFamily: "Karla" }}>
      {children.toUpperCase()}
    </Text>
  );
};

const DetailText = ({ children }) => {
  return (
    <Text
      style={{
        color: "black",
        fontSize: 18,
        fontFamily: "Karla",
        fontWeight: "bold",
      }}
    >
      {children.toUpperCase()}
    </Text>
  );
};

const PersonDetail = ({ route, navigation }) => {
  const [displayModal, setDisplayModal] = useState(false);

  const person = route.params;
  return (
    <>
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          leftComponent={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon
                  style={{ margin: 10 }}
                  name="ios-arrow-back"
                  type="ionicon"
                  color="black"
                  size={35}
                />
                <Text style={styles.backText}>Back</Text>
              </View>
            </TouchableOpacity>
          }
          centerComponent={{
            text: person.full_name.toUpperCase(),
            style: styles.headerText,
          }}
          rightComponent={
            <TouchableOpacity onPress={()=>{setDisplayModal(true)}}>
            <Icon
              style={{ margin: 10 }}
              name="dots-horizontal"
              type="material-community"
              color="black"
            />
            </TouchableOpacity>
          }
        />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.introContainer}>
            <View style={styles.introSubContainer}>
              <Image
                source={{ uri: person.images[0].image_url }}
                containerStyle={{ width: "100%", height: "100%" }}
              />
            </View>
            <View style={styles.introSubContainer}>
              <View style={{ flex: 1 }}>
                <DetailHeadingText>FULL NAME</DetailHeadingText>
                <DetailText>{person.full_name}</DetailText>
              </View>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <DetailHeadingText>Age</DetailHeadingText>
                  <DetailText>{person.age}</DetailText>
                </View>
                <View style={{ flex: 1 }}>
                  <DetailHeadingText>Children</DetailHeadingText>
                  <DetailText>{person.number_of_children || "-"}</DetailText>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <DetailHeadingText>Location</DetailHeadingText>
                <DetailText>{person.city || "-"}</DetailText>
              </View>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <DetailText>Context</DetailText>
            <Text style={{ fontFamily: "Karla", fontSize: 17 }}>
              {person.context}
            </Text>
          </View>
          <View
            style={{
              height: IMG_HEIGHT,
              width: SCREEN_WIDTH,
              paddingVertical: 5,
              alignItems: "center",
            }}
          >
            <ScrollView
              style={{ flex: 1, width: "100%", height: "100%" }}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {person.images.map((img) => {
                return (
                  <Image
                    source={{ uri: img.image_url }}
                    containerStyle={{
                      width: IMG_WIDTH,
                      height: "100%",
                      marginHorizontal: 10,
                    }}
                    key={img.id}
                  />
                );
              })}
            </ScrollView>
          </View>
          <Button
            title={"DONATE"}
            titleStyle={{ fontSize: 18, color: "white", fontFamily: "Karla" }}
            buttonStyle={{
              width: "100%",
              borderWidth: 1,
              borderColor: "black",
              backgroundColor: "black",
              margin: 5,
            }}
          />
        </ScrollView>
      </View>
      <Modal transparent={true} visible={displayModal} animationType="slide">
        <Screen
          style={{
            flex: 1,
            backgroundColor:'rgba(80,80,80,0.1)',
            justifyContent: "flex-end",
          }}
        >
          <View style={{ backgroundColor: "white", borderRadius: 5, height:"30%", paddingTop:25 }}>
            <Button
              title={"BOOKMARK"}
              titleStyle={{ fontSize: 18, color: "black", fontFamily: "Karla" }}
              buttonStyle={{
                width: "100%",
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "white",
                margin: 5,
              }}
            />
            <Button
              title={"SHARE"}
              titleStyle={{ fontSize: 18, color: "black", fontFamily: "Karla" }}
              buttonStyle={{
                width: "100%",
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "white",
                margin: 5,
              }}
            />
            <Button
              title={"CANCEL"}
              titleStyle={{ fontSize: 18, color: "white", fontFamily: "Karla" }}
              buttonStyle={{
                width: "100%",
                borderWidth: 1,
                borderColor: "black",
                backgroundColor: "black",
                margin: 5,
              }}
              onPress={()=>{setDisplayModal(false)}}
            />
          </View>
        </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    maxWidth: MAX_WIDTH,
    width: "100%",
    height: "100%",
  },
  introContainer: {
    width: "100%",
    height: IMG_HEIGHT,
    flexDirection: "row",
  },
  introSubContainer: { width: "50%", height: "100%", padding: 10 },
  header: { backgroundColor: "white", width: "100%" },
  headerText: { color: "black", fontFamily: "Karla", fontSize: 25 },
  backText: { color: "black", fontFamily: "Karla", fontSize: 15 },
});

export default PersonDetail;
