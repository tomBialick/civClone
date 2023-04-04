import React, {Component} from 'react';
import './sheets/Login.css';
import CreateAccount from './CreateAccount.js'
import Cookies from 'js-cookie'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasAccount: true,
      username: "",
      password: ""
    }
    this.handleSignIn = this.handleSignIn.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.signInOrCreateAccount = this.signInOrCreateAccount.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleAccountCreated = this.handleAccountCreated.bind(this);
  }

  handleSignIn(event) {
    event.preventDefault();
    let user = this.state.username
    let pass = this.state.password
    let data = {
      "username": user,
      "password": pass
    };
    let data_json = JSON.stringify(data)

    fetch( this.props.hosturl + '/users/auth', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: data_json
    }).then(response => {
      if (response.status < 400) {
        response.json().then((responseJson) => {
          //Currently indefinite cookie
          Cookies.set('user-token', responseJson.body.results.username)
          this.props.auth(responseJson.body.results.username, responseJson.body.results.role)
        })
      }
      else {
        response.text().then(responseText => {
          alert(responseText)
        }).catch(error => {
          alert("An error occurred. Please let the admin(s) know if this persists")
          console.log("ERROR: " + error)
        })
      }
    }).catch(error => {
      alert("An error occurred. Please let the admin(s) know if this persists")
      console.log("ERROR: " + error)
    })
  }

  usernameChange(event) {
    if (event.target.value) {
      this.setState({username: event.target.value})
    }
  }

  passwordChange(event) {
    if (event.target.value) {
      this.setState({password: event.target.value})
    }
  }

  handleCreateAccount() {
    this.setState({hasAccount: false})
  }

  handleAccountCreated() {
    this.setState({hasAccount: true})
  }

  signInOrCreateAccount() {
    if (this.state.hasAccount) {
      return (
        <div id="login_area">
          <div id="login_creds_area">
            <label className="login_area_text">Username:</label>
            <input type="text" onChange={this.usernameChange}/>
            <label className="login_area_text">Password:</label>
            <input type="password" onChange={this.passwordChange}/>
          </div>
          <br />
          <button onClick={(e) => this.handleSignIn(e)}>Login</button>
          <button onClick={(e) => this.handleCreateAccount(e)}>Create Account</button>
        </div>
      )
    }
    else {
      return <CreateAccount hosturl={this.props.hosturl} accountMade={this.handleAccountCreated}/>
    }
  }

  render() {
    return (
      <div>
        {this.signInOrCreateAccount()}
      </div>
    )
  }
}

export default Login;
