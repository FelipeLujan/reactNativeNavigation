//libraries
import React, { Component } from "react";
import {  Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Constants, Location, Permissions } from "expo";

class Autocomplete extends Component {
  state = {
    location: null,
    errorMessage: null
  };

  componentDidMount() {
    //get user location
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
          //grab the destination data, coords, name of the place, etc
          this.onPress(data, destinationDetails);
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
          types: "geocode" // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: "bold"
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        }}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{}}
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
        predefinedPlaces={[]}
        debounce={0}
      />
    );
  }

  onPress(data, destinationDetails) {
    //ckeck if the current location and destination info is complete, if so, call onNavigate to go to the next screen
    let currentLocation = "Please wait while your location is determined";

    if (this.state.errorMessage) {
      currentLocation = this.state.errorMessage;
    } else if (this.state.location) {
      currentLocation = this.state.location;
    }
    if (
      currentLocation === "Your location could not be obtained." ||
      currentLocation === "Please wait while your location is determined"
    ) {
      alert(currentLocation);
    } else {
      if (currentLocation["coords"]["latitude"] === undefined) {
        alert("An error has occurred");
      } else {
        this.onNavigate(data, destinationDetails, currentLocation);
      }
    }
  }

  onNavigate(data, destinationDetails, currentLocation) {
    //grab the destinationDetails,currentLocation and pass them as props to the next screen

    //TODO: correctly parse the response from distanceMatrix web service in order to get the travel time as string or number
    // let URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${
    //     currentLocation["coords"]["latitude"]
    //     },${currentLocation["coords"]["longitude"]}&destinations=${destinationDetails["geometry"]["location"]["lat"]},${
    //     destinationDetails["geometry"]["location"]["lng"]
    //     }&key=AIzaSyCQ6DpQrBCYZryBBLlFDOaiAKIxMN523_E`;
    // fetch(URL)
    //     .then(data => {
    //         return data.json();
    //     })
    //     .then(response => {
    //         this.setState({ ETA: response });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    //grab all coordinates and pass them along the name of the destination and is context
    this.props.navigation.navigate("picker", {
      placeName: data.structured_formatting["main_text"],
      placeLocation: data.structured_formatting["secondary_text"],
      destination: {
        latitude: destinationDetails["geometry"]["location"]["lat"],
        longitude: destinationDetails["geometry"]["location"]["lng"]
      },
      currentLocation: {
        latitude: currentLocation["coords"]["latitude"],
        longitude: currentLocation["coords"]["longitude"]
      },
      ETA: { ETA: this.state.ETA }
    });
  }
}

export default Autocomplete;
