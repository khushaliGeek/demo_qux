import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../actions';

class Logout extends React.Component {

    componentDidMount() {
        alert('By logging out, you will lose all portal data.');
        this.props.logoutUser();
    }

    render() {
        return(
            <div>
                <Redirect to="/" />
            </div>
        );
    }
}

export default connect(null, actions)(Logout);