import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null
        };

        this.onLoginClick = this.onLoginClick.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    onLoginClick(e) {
        e.preventDefault();
        this.props.loginUser(this.state.username);
    }

    updateState(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        return (
            <div className="container justify-content-center">
                 <Form onSubmit={e => this.onLoginClick(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" required onChange={newVal => this.updateState('username', newVal.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required onChange={newVal => this.updateState('password', newVal.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
}

export default connect(null, actions)(Login);