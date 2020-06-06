import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { Header, Icon, Image, Button } from "react-native-elements";



function formatDate(date) {
  var d=date,
   month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].reverse().join('.');
}



const PeopleCard = ({ data, ...props }) => {
  return (
    
    <View
      style={{ width: 180, padding: 10 }}
     
    >
      <Image
        source={{ uri: data.images[0].image_url }}
        style={{ width: "100%", height: 200 }}
      />
      <Text style={{fontFamily:"Karla", fontWeight:"bold"}}>{data.full_name}</Text>
      <Text style={{fontFamily:"Karla", color:"grey"}}>{ formatDate( new Date(Date.parse(data.date_of_incident)))}</Text>
    </View>
  );
};

export default PeopleCard;
