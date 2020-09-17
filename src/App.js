import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { connect } from 'react-redux';
import * as actions from './actions';
import NewPortal from './components/NewPortal';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLogin: false
    };
  }

  componentDidMount() {
    this.props.fetchUser();
    localStorage.removeItem('portals');
    localStorage.removeItem('portalProfile');
    localStorage.removeItem('portalBackground');
  }

  renderContent() {
    switch(this.props.auth || false) {
      case null:
        return null;
      case false:
        return (
          <React.Fragment>
            <Route exact path="/" component={Login} />
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <Route exact path="/" component={Home} />
            <Route exact path="/newPortal" component={NewPortal} />
          </React.Fragment>
        );
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {this.renderContent()}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
