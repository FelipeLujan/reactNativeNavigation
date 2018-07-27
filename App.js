import React, { Component } from "react";
import { View, WebView, StyleSheet, Image } from "react-native";
import TextInputComponent from "./components/TextInputComponent";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Autocomplete from "./components/Autocomplete";
import { Provider } from "react-redux";
import TextBoxComponent from "./components/TextBoxComponent";
import {store} from "./redux/Store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.paddingTop}>
            <Autocomplete />
          <TextBoxComponent />
          <TextInputComponent />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  paddingTop: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
    5050:{
        width: 50, height: 50, alignSelf: 'center'
    }
});

export default App;
