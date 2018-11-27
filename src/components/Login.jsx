import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";

class Login extends Component {
  state = {
    username: "",
    loggedIn: false
  };
  render() {
    const { username, loggedIn } = this.state;
    if (loggedIn) return <h2>Welcome back {username}</h2>;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const { id, value } = event.target; // check these with console logs
    this.setState({
      [id]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    api.getUsers(this.state.username).then(user => {
      this.props.login(user);
      this.setState({
        loggedIn: true
      });
    });
  };
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default Login;
