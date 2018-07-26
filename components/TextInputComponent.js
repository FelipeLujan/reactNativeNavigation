import React, { Component } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import MapView from 'react-native-maps';
import { connect } from "react-redux";



//components
import TextBoxComponent from "./TextBoxComponent";

//actions
import {setPlaceholder} from "../redux/actions/currentLocationAction";


class TextInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  onChangeText = (data) => {

  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Type here to translate!"
          onChangeText={(text) => {this.props.setPlaceholder(text);
          }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

});



export default connect(null,{setPlaceholder})(TextInputComponent);