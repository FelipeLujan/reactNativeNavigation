import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native'

class TextBoxComponent extends Component {

    componentDidMount() {
        console.log(this.props)
    }


    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps)
    }


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
