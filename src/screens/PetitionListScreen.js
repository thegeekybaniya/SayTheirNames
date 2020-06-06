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

const PetitionListScreen = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [dat, setData] = useState({
    next: 1,
    petitions: [],
    last: null,
  });

  if (dat.next == 1) {
    API.getPetitions()
      .then((data) => {
        console.log(data.data.length);

        setData({
          next: dat.next + 1,
          petitions: dat.petitions.concat(data.data),
          last: data.meta.last_page,
        });
      })
      .catch((err) => {
        console.log("Huri Baba", err);
      });
  }

  return (
    <>
      <View style={styles.container}>
        <Header
          containerStyle={styles.header}
          leftComponent={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                style={{ marginVertical: 10 }}
                name="filter-outline"
                type="material-community"
                color="black"
                size={35}
              />
              <Text style={styles.backText}>Filter</Text>
            </View>
          }
          centerComponent={{
            text: "PETITIONS",
            style: styles.headerText,
          }}
          rightComponent={
            <Icon
              style={{ margin: 10 }}
              name="search"
              type="feather"
              color="black"
            />
          }
        />
        <View style={styles.scrollContainer}>
          <FlatList
            data={dat.petitions}
            renderItem={({ item }) => (
              <Card image={{ uri: item.banner_img_url }}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    fontFamily: "Karla",
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>
                <Text style={{ marginBottom: 10, fontFamily: "Karla" }}>
                  {item.description}
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
                  title="READ MORE"
                  titleStyle={{
                    fontFamily: "Karla",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  onPress={() => {
                    Linking.openURL(item.link);
                  }}
                />
              </Card>
            )}
            keyExtractor={(item) => item.id}
            onEndReached={() => {
              if (dat.last != null && dat.next <= dat.last) {
                API.getPeopleNext(dat.next).then((data) => {
                  console.log(data.data.length);

                  setData({
                    ...dat,
                    next: dat.next + 1,
                    petitions: dat.petitions.concat(data.data),
                  });
                });
              }
            }}
            onEndReachedThreshold={0.1}
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

export default PetitionListScreen;
