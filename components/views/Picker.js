import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  WebView,
  Button,
  Text
} from "react-native";
import Autocomplete from "../Autocomplete";
import TextBoxComponent from "../TextBoxComponent";
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
    this.currentLatitude = this.currentLocation["latitude"];
    this.currentLongitude = this.currentLocation["longitude"];
    this.destinationLatitude = this.destination["latitude"];
    this.destinationLongitude = this.destination["longitude"];

    let URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${
      this.currentLatitude
    },${this.currentLongitude}&destinations=${this.destinationLatitude},${
      this.destinationLongitude
    }&key=AIzaSyCQ6DpQrBCYZryBBLlFDOaiAKIxMN523_E`;
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

    fetch(URL)
      .then(data => {
        return data.json();
      })
      .then(response => {
        this.setState({ response: response });

      })
        .then(talkThatTalk())

      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log("response is ", this.props.navigation.state);
    return (
      <View>
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
          title={"MapView"}
          onPress={() => {
            this.props.navigation.navigate("Maps", {
              destination: this.destination,
              currentLocation: this.currentLocation
            });
          }}
        />

        <Button
          title={"Webview"}
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
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default Picker;
