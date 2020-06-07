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
var _ = require("lodash");

import * as Linking from "expo-linking";

import Screen from "../components/Screen";

import Modal from "../components/Modal";

import API from "../api";

import {
  Header,
  Icon,
  Image,
  Button,
  Card,
  Input,
} from "react-native-elements";
import AppView from "../components/AppView";
const SCREEN_WIDTH = Dimensions.get("window").width;

let MAX_WIDTH = 600;

const DonationListScreen = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [dat, setData] = useState({
    next: 1,
    donations: [],
    last: null,
  });

  const [searchModal, setSearchModal] = useState({
    visible: false,
    search: null,
  });

  if (dat.next == 1) {
    API.getDonations()
      .then((data) => {

        setData({
          next: dat.next + 1,
          donations: dat.donations.concat(data.data),
          last: data.meta.last_page,
        });
      })
      .catch((err) => {
        console.error( err);
      });
  }

  let displayData = dat.donations;

  if (searchModal.search) {
    displayData = _.filter(displayData, (value) => {
      return JSON.stringify(value)
        .toLowerCase()
        .includes(searchModal.search.toLowerCase());
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
            text: "DONATE",
            style: styles.headerText,
          }}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                setSearchModal({ ...searchModal, visible: true });
              }}
            >
              <Icon
                style={{ margin: 10 }}
                name="search"
                type="feather"
                color="black"
              />
            </TouchableOpacity>
          }
        />
        <View style={styles.scrollContainer}>
          {searchModal.search && (
            <Text
              style={{
                color: "black",
                fontFamily: "Karla",
                paddingVertical: 10,
                textAlign: "center",
              }}
            >
              Showing results matching{" "}
              <Text style={{ fontWeight: "bold" }}>{searchModal.search}</Text>
            </Text>
          )}

          <FlatList
            data={displayData}
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
                  title="DONATE"
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
                API.getDonationsNext(dat.next).then((data) => {
                  console.log(data.data.length);

                  setData({
                    ...dat,
                    next: dat.next + 1,
                    donations: dat.donations.concat(data.data),
                  });
                });
              }
            }}
            onEndReachedThreshold={0.1}
          />
        </View>
      </View>
      <Modal visible={searchModal.visible} animationType="slide">
        <Screen>
          <Input
            style={{ padding: 10 }}
            placeholder="Search"
            value={searchModal.search}
            leftIcon={<Icon name="search" type="feather" color="grey" />}
            onChangeText={(value) =>
              setSearchModal({ ...searchModal, search: value })
            }
          />
          <Button
            style={{ padding: 10 }}
            titleStyle={{ color: "white" }}
            buttonStyle={{ backgroundColor: "black", padding: 10 }}
            title="Close"
            onPress={() =>
              setSearchModal({ ...searchModal, visible: !searchModal.visible })
            }
          />

          <Button
            style={{ paddingHorizontal: 10, paddingVertical: 5 }}
            titleStyle={{ color: "white" }}
            buttonStyle={{ backgroundColor: "black", padding: 10 }}
            title="Clear"
            onPress={() => {
            
              setSearchModal({
                ...searchModal,
                visible: !searchModal.visible,
                search: null,
              });
            }}
          />
        </Screen>
      </Modal>
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

export default DonationListScreen;
