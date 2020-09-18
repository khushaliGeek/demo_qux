import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import { connect } from 'react-redux';
import * as actions from './actions';
import NewPortal from './components/NewPortal';
import Logout from './components/Logout';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLogin: false
    };

    // if (window.performance) {
    //   console.log(performance.navigation.TYPE_RELOAD);
    //   if (performance.navigation.TYPE_RELOAD) {
    //     alert( "All your data will be lost");
    //   }
    // }
  }

  componentDidMount() {
    this.props.fetchUser();
    this.removeCacheContent();
  }

  removeCacheContent() {
    localStorage.removeItem('portals');
    localStorage.removeItem('portalProfile');
    localStorage.removeItem('authorProfile');
    localStorage.removeItem('portalBackground');
    localStorage.removeItem('mainPortal');
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
            <Route exact path="/logout" component={Logout} />
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
