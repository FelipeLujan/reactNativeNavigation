// liraries
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";

//components
import Picker from "./components/views/Picker";
import Autocomplete from "./components/Autocomplete";
import MapViewComponent from "./components/mapview";
import WebviewMap from "./components/WebviewMap";

//ROUTES
const RootStack = createStackNavigator(
  {
    Home: Autocomplete,
    Maps: MapViewComponent,
    picker: Picker,
    webviewmap: WebviewMap
  },
  { initialRouteName: "Home" }
);

class App extends Component {
  render() {
    return <RootStack />;
  }
}

export default App;
