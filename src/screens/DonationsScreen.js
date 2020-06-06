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
  TouchableOpacity
} from "react-native";
import { AppLoading } from "expo";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";

import { Header, Icon, Image, Button } from "react-native-elements";

import { ActivityIndicator } from "react-native";

import Carousel from "react-native-snap-carousel";

import Modal from "../components/Modal";
import PersonDetail from "./PersonDetail.js"

import CustomButton from "../components/CustomButton";
import Screen from "../components/Screen";
import PeopleCard from "../components/PeopleCard";
import API from "../api";
var _ = require("lodash");

const SCREEN_WIDTH = Dimensions.get("window").width;

let titleToKey = {
  Age: "age",
  City: "city",
  Date: "date_of_incident",
  Country: "country",
};

let keyToFilter = {};
let keys = Object.keys(titleToKey);
for (let i = 0; i < keys.length; i++) {
  keyToFilter[titleToKey[keys[i]]] = new Set();
}

let updateFilters = (people, keyToFilter) => {
  for (let i = 0; i < people.length; i++) {
    let peep = people[i];
    let ks = Object.keys(keyToFilter);
    console.log("Peep", peep.full_name);
    for (let j = 0; j < ks.length; j++) {
      let k = ks[j];
      console.log("krt", keyToFilter[k]);
      keyToFilter[k].add(peep[k]);
    }
  }

  return keyToFilter;
};

const DonationListScreen = ({navigation}) => {
  const [dat, setData] = useState({
    next: 1,
    people: [],
    last: null,
    keyToFilter,
  });
  const [filterModal, setFilterModal] = useState({
    visible: false,
    filter: {},
    openFilter: null,
  });
  let filterButtonPress = (filter) => {
    console.log("Show filter for ", filter, dat.next, filterModal);

    setFilterModal({
      ...filterModal,
      visible: !filterModal.visible,
      openFilter: titleToKey[filter],
    });
  };

  if (dat.next == 1) {
    API.getPeople()
      .then((data) => {
        console.log(data.data.length);
        let ktf = updateFilters(data.data, dat.keyToFilter);

        setData({
          next: dat.next + 1,
          people: dat.people.concat(data.data),
          last: data.meta.last_page,
          keyToFilter: ktf,
        });
      })
      .catch((err) => {
        console.log("Huri Baba", err);
      });
  }
  console.log("Peeps", dat.next, dat.last);

  console.log(keyToFilter, filterModal);
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          style={{ backgroundColor: "blue" }}
          source={require("./banner.png")}
          style={{ width: "100%", height: 200 }}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
    );
  };

  console.log(
    "SCREEN",
    SCREEN_WIDTH,
    filterModal.openFilter && dat.keyToFilter[filterModal.openFilter]
  );

  let displayData = _.filter(
    dat.people,
    _.matches(_.omitBy(filterModal.filter, _.isNil))
  );
  return (
    <>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={{ alignItems: "center" }}>
              <Header
                placement="left"
                containerStyle={styles.header}
                centerComponent={{
                  text: "SAY THEIR NAME",
                  style: styles.headerText,
                }}
                rightComponent={
                  <View style={{ flexDirection: "row" }}>
                    <Icon
                      style={{ margin: 10 }}
                      name="bookmark"
                      type="feather"
                      color="white"
                    />
                    <Icon
                      style={{ margin: 10 }}
                      name="search"
                      type="feather"
                      color="white"
                    />
                  </View>
                }
              />
              <View
                style={{
                  height: 60,
                  width: SCREEN_WIDTH,
                  paddingVertical: 5,
                  alignItems: "center",
                }}
              >
                <ScrollView
                  style={{ flex: 1 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignSelf: "center",
                      paddingHorizontal: 5,
                      alignItems: "baseline",
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontFamily: "Karla",
                        fontSize: 15,
                        fontWeight: "bold",
                        paddingHorizontal: 5,
                      }}
                    >
                      FILTER
                    </Text>
                    {Object.keys(titleToKey).map((k) => {
                      console.log(
                        k,
                        filterModal.filter[titleToKey[k]] ? true : false
                      );
                      return (
                        <CustomButton
                          title={k}
                          key={titleToKey[k]}
                          selected={
                            filterModal.filter[titleToKey[k]] ? true : false
                          }
                          onPress={filterButtonPress.bind(this, k)}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              <Carousel
                autoplay
                autoplayDelay={3000}
                autoplayInterval={3000}
                data={[0, 0, 0, 0, 0, 0, 0]}
                renderItem={_renderItem}
                layout={"default"}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={400}
                style={styles.carousel}
                layoutCardOffset={3}
                loop
              />
            </View>
          }
          style={{ width: "100%" }}
          contentContainerStyle={{ justifyContent: "center" }}
          data={displayData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>navigation.navigate("DonationDetailScreen",item)}>
              <PeopleCard data={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={Math.ceil(SCREEN_WIDTH / 180)}
          onEndReached={() => {
            if (dat.last != null && dat.next <= dat.last) {
              API.getPeopleNext(dat.next).then((data) => {
                console.log(data.data.length);
                let ktf = updateFilters(data.data, dat.keyToFilter);

                setData({
                  ...dat,
                  next: dat.next + 1,
                  people: dat.people.concat(data.data),
                  keyToFilter: ktf,
                });
              });
            }
          }}
          onEndReachedThreshold={0.1}
        />
      </View>
      <Modal visible={filterModal.visible} animationType="slide">
        <Screen>
          <Button
            style={{ padding: 10 }}
            titleStyle={{ color: "white" }}
            buttonStyle={{ backgroundColor: "black" }}
            title="Close"
            onPress={() =>
              setFilterModal({ ...filterModal, visible: !filterModal.visible })
            }
          />

          <Button
            style={{ paddingHorizontal: 10, paddingVertical: 5 }}
            titleStyle={{ color: "white" }}
            buttonStyle={{ backgroundColor: "black" }}
            title="Clear"
            onPress={() => {
              let tempf = filterModal.filter;
              tempf[filterModal.openFilter] = null;

              setFilterModal({
                ...filterModal,
                visible: !filterModal.visible,
                filter: tempf,
              });
            }}
          />
          <FlatList
            data={
              filterModal.visible &&
              Array.from(dat.keyToFilter[filterModal.openFilter])
            }
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => {
              console.log("Modal", item);
              return (
                <Button
                  title={item}
                  titleStyle={[
                    { fontFamily: "Roboto" },
                    filterModal.filter[filterModal.openFilter] == item
                      ? { color: "black" }
                      : { color: "grey" },
                  ]}
                  buttonStyle={{ backgroundColor: "white" }}
                  onPress={() => {
                    let tempf = filterModal.filter;
                    tempf[filterModal.openFilter] = item;

                    setFilterModal({
                      ...filterModal,
                      visible: !filterModal.visible,
                      filter: tempf,
                    });
                  }}
                />
              );
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
    alignItems: "center",
  },
  header: { backgroundColor: "black", width: "100%" },
  headerText: { color: "white", fontFamily: "Karla", fontSize: 25 },
  carousel: {},
});

const DonationStack = createStackNavigator();

const DonationsScreen = () => {
  return (
    <DonationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DonationStack.Screen
        name="DonationListScreen"
        component={DonationListScreen}
      />
      <DonationStack.Screen
        name="DonationDetailScreen"
        component={PersonDetail}
      />
    </DonationStack.Navigator>
  );
};

export default DonationsScreen;
