// liraries
import React, { Component } from "react";
import { View, WebView, StyleSheet, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

//components
import Picker from "./components/views/Picker";
import Map from "./components/views/Map";
import Autocomplete from "./components/Autocomplete";
import MapViewComponent from "./components/mapview";

const RootStack  = createStackNavigator({
    Home: Autocomplete,
    Maps: MapViewComponent,
    test: Picker
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
