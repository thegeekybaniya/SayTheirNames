import React from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from "react-native-elements";

import DonationsScreen from "./src/screens/DonationsScreen.js";
import DonationListScreen from "./src/screens/DonationListScreen.js";
import PetitionListScreen from "./src/screens/PetitionListScreen.js";
import AboutScreen from "./src/screens/AboutScreen.js";

const Tab = createBottomTabNavigator();

let customFonts = {
  Karla: require("./assets/fonts/Karla-Regular.ttf"),
};
export default class App extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName, type;

                if (route.name === "Home") {
                  iconName = "home";
                  type="feather"
                } else if (route.name === "Donations") {
                  iconName = "heart-alt";
                  type="fontisto"

                } else if (route.name === "Petitions") {
                  iconName = "paper-plane";
                  type="simple-line-icon"

                } else {
                  iconName = "info";
                  type="feather"

                }

                // You can return any component that you like here!
                return (
                  <Icon
                    name={iconName}
                    size={size}
                    color={color}
                    type={type}
                  />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: "black",
              inactiveTintColor: "gray",
            }}
          >
            <Tab.Screen name="Home" component={DonationsScreen} />
            <Tab.Screen name="Donations" component={DonationListScreen} />
            <Tab.Screen name="Petitions" component={PetitionListScreen} />
            <Tab.Screen name="About" component={AboutScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else {
      return <AppLoading />;
    }
  }
}
