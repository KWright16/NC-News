import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";

class Login extends Component {
  state = {
    username: ""
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
  handleSubmit = event => {
    event.preventDefault();
    api.getData("users").then(users => {
      this.props.checkUser(users, this.state.username);
      // this.setState?
    });
  };

  handleChange = event => {
    const { id, value } = event.target; // check these with console logs
    this.setState({
      [id]: value
    });
  };
}

Login.propTypes = {
  checkUser: PropTypes.func.isRequired
};

export default Login;
