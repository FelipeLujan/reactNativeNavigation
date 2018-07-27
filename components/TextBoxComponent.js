import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native'

class TextBoxComponent extends Component {

    render() {
        return (
            <View>
                <Text>your text goes here {this.props.text}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state)  => {
    return {
        text : state.text,
        currentLocation: state.currentLocation
    }
};


export default connect(
    mapStateToProps, null)(TextBoxComponent);
