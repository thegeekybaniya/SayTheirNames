import React from 'react'
import { SafeAreaView,StyleSheet, Platform, StatusBar } from "react-native";

export default function AppView({style,children,...props}) {
return <SafeAreaView props style={[styles,style]} >{children}</SafeAreaView>
    



}

const styles = StyleSheet.create({
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0

})