import React, {Component} from 'react';
import { WebView} from 'react-native'

class WebviewMap extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.navigation.state.params);
        const currentLocation = this.props.navigation.getParam('currentLocation', 'obj')
        const destination = this.props.navigation.getParam('destination', 'obj')
        return (
            <WebView
                source={{uri: `https://www.google.com/maps/dir/?api=1&origin=${currentLocation['latitude']},${currentLocation['longitude']}&destination= ${destination['latitude']},${destination['longitude']}&travelmode=walking`}}
                style={{marginTop: 0, height: 500}}
            />
        );
    }
}


export default WebviewMap;