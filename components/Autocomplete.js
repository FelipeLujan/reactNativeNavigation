import React, { Component } from "react";
import { Image, Text, View, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { connect } from "react-redux";
import { setPlaceholder } from "../redux/actions/currentLocationAction";
import { Constants, Location, Permissions } from "expo";

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 6.21209, lng: 2.4597668 } }
};
const exito = {
  description: "exito",
  geometry: { location: { lat: 48.8496818, lng: -75.574745 } }
};

class Autocomplete extends Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Your location could not be obtained."
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let currentLocation = "Waiting..";
    if (this.state.errorMessage) {
      currentLocation = this.state.errorMessage;
    } else if (this.state.location) {
      currentLocation = this.state.location;
    }

    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={1} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, destinationDetails = null) => {

            console.log(destinationDetails)
            this.props.navigation.navigate("test", {

                placeName: data.structured_formatting['main_text'],
                placeLocation: data.structured_formatting['secondary_text'],
                destination: {
                    latitude: destinationDetails['geometry']['location']['lat'],
                    longitude: destinationDetails['geometry']['location']['lng']
                },
                currentLocation: {
                    latitude: currentLocation["coords"]["latitude"],
                    longitude: currentLocation["coords"]["longitude"]
                }
            });
        }}
        getDefaultValue={() => {
          return ""; // text input default value
        }}
        query={{
          // available
          //
          // options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyATddP1Cm1SQ3JJzHamb1PONDAuMr4vxMc",
          language: "es", // language of the results
          types: "establishment" // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: "bold"
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          types: "food"
        }}
        filterReverseGeocodingByTypes={[
          "point_of_interest",
          "neighborhood",
          "route",
          "political",
          "street_address"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[homePlace, exito]}
        debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }
}

export default Autocomplete;
