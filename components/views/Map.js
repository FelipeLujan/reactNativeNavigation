import React, {Component} from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native'
import TextBoxComponent from "../TextBoxComponent";
import { Constants, Location, Permissions } from 'expo';


class Map extends Component {




    render() {




        return (
            <View>
                <Text>{this.props.navigation.getParam('destination', 'place')}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});

function mapStateToProps(state) {
    return {};
}

export default Map
