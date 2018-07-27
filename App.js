// liraries
import React, { Component } from "react";
import { View, WebView, StyleSheet, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

//components
import Main from "./components/views/Main";
import Map from "./components/views/Map";
import Autocomplete from "./components/Autocomplete";

const RootStack  = createStackNavigator({
    Home: Autocomplete,
    Maps: Map
},
    {initialRouteName: 'Home'});


class App extends Component {
  render() {
    return (

        <RootStack  />

    );
  }
}



export default App;
