import React, { Component } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 6.2038404;
const LONGITUDE = -75.6024592;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyATddP1Cm1SQ3JJzHamb1PONDAuMr4vxMc';

class MapViewComponent extends Component {

    constructor(props) {
        super(props);

        // AirBnB's Office, and Apple Park
        this.state = {
            coordinates: [
                {
                    latitude: 6.2038404,
                    longitude: -75.6024592,
                },
                "6.212275052208038,-75.57644583284855"
            ],
        };

        this.mapView = null;
    }

    onMapPress = (e) => {
        this.setState({
            coordinates: [
                ...this.state.coordinates,
                e.nativeEvent.coordinate,
            ],
        });
    }

    render() {
        return (
            <MapView
                initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                style={StyleSheet.absoluteFill}
                ref={c => this.mapView = c}
                onPress={this.onMapPress}
            >
                {this.state.coordinates.map((coordinate, index) =>
                    <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
                )}
                {(this.state.coordinates.length >= 2) && (
                    <MapViewDirections
                        origin={this.state.coordinates[0]}
                        waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): null}
                        destination={this.state.coordinates[this.state.coordinates.length-1]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={(result) => {
                            this.mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: (width / 20),
                                    bottom: (height / 20),
                                    left: (width / 20),
                                    top: (height / 20),
                                }
                            });
                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />
                )}
            </MapView>
        );
    }
}

export default MapViewComponent;