//libraries
import React, { Component } from "react";
import {  View, Button, Text } from "react-native";
import { Speech } from "expo";

class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ""
    };
  }

  componentWillMount() {
    this.currentLocation = this.props.navigation.state.params[
      "currentLocation"
    ];
    this.destination = this.props.navigation.state.params["destination"];

    const talkThatTalk = () => {
      Speech.speak(
        `${
          this.props.navigation.state.params["placeName"]
        }, sure, its located in ${
          this.props.navigation.state.params["placeLocation"]
        }.`,
        { rate: 0.8 }
      );
    };
    console.log(this.props.navigation.params);

    talkThatTalk();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View>
          <Text>{this.props.navigation.state.params["placeName"]} </Text>
        </View>
        <View>
          <Text>
            sure, it's located at{" "}
            {this.props.navigation.state.params["placeLocation"]}
          </Text>
        </View>

        <Button
          title={"Overall route view (MapView)"}
          onPress={() => {
            this.props.navigation.navigate("Maps", {
              destination: this.destination,
              currentLocation: this.currentLocation
            });
          }}
        />

        <Button
          title={"Detailed route view (Webview)"}
          onPress={() => {
            this.props.navigation.navigate("webviewmap", {
              destination: this.destination,
              currentLocation: this.currentLocation
            });
          }}
        />
      </View>
    );
  }
}



export default Picker;
