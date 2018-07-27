import React, {Component} from 'react';
import {connect} from 'react-redux';

class MyComponent extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(MyComponent);
