import React, {Component} from 'react';
import './sheets/App.css';
import MapScreen from './MapScreen.js';
import Login from './Login.js';
import GameHeader from './GameHeader.js';
import Cookies from 'js-cookie';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hosturl: ("" + document.location.href).slice(0, -1),
      isLoggedIn: false,
      username: "",
    }
    this.checkLogin = this.checkLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.appOrLogIn = this.appOrLogIn.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  appOrLogIn() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <GameHeader hosturl={this.state.hosturl} logout={this.handleLogout} />
          <MapScreen hosturl={this.state.hosturl} />
        </div>
      );
    }
    else {
      return (
        <div id="login_container">
          <div id="login_greeting">
            <h1>CivClone</h1>
          </div>
          <div className="spacer">
          </div>
          <Login hosturl={this.state.hosturl} auth={this.handleLogin} />
        </div>
      );
    }
  }

  handleLogin(username, role) {
    this.setState({isLoggedIn: true, username: username, role: role});
  }

  checkLogin() {
    if (Cookies.get('user-token')) {
      fetch(this.state.hosturl + '/users/auth?token=' + Cookies.get('user-token'), {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        if (response.status < 400) {
          response.json().then(responseJson => {
            this.setState({isLoggedIn: true, username: responseJson.body.results.username})
            return true;
          });
        }
        else {
          return false;
        }
      }).catch(error => {
        console.log("ERROR: " + error);
        alert("An error occurred. Please contact the admin(s) if this persists");
        return false;
      });
    }
    else {
      return false;
    }
  }

  handleLogout() {
    fetch(this.state.hosturl + '/users/auth', {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status < 400) {
        response.text().then(responseText => {
          Cookies.remove('user-token');
          this.setState({isLoggedIn: false, username: ""});
        });
      }
      else {
        alert("Error while logging out. Contact admins if this persists");
      }
    }).catch(error => {
      console.log("ERROR: " + error);
      alert("An error occurred. Please contact the admin(s) if this persists");
    });
  }

  render() {
    return (
      <div className="App">
        {this.appOrLogIn()}
      </div>
    );
  }
}

export default App;
