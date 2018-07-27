import React, { Component } from "react";
import {StyleSheet, View} from "react-native";
import Autocomplete from "../Autocomplete";
import TextBoxComponent from "../TextBoxComponent";

class Main extends Component {


  render() {

    return (

        <View style={styles.paddingTop}>
          <Autocomplete />

        </View>
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
    5050: {
        width: 50,
        height: 50,
        alignSelf: "center"
    }
});



export default Main
