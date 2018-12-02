import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import { navigate } from "@reach/router";

class Login extends Component {
  state = {
    username: "jessjelly",
    loggedIn: false,
    blank: false,
    error: false
  };
  render() {
    const { username, loggedIn, blank, error } = this.state;
    const message = blank
      ? "Username is required"
      : error
      ? "No matching username"
      : "Login to post or delete articles and comments";
    let url = localStorage.getItem("url");
    if (loggedIn && url) {
      url = JSON.parse(url);
      localStorage.removeItem("url");
      navigate(url.url);
    }
    if (loggedIn) return <h2>Welcome back {username}</h2>;
    return (
      <div className="form">
        <p className={blank || error ? "blank" : ""}>{message}</p>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label className="input" htmlFor="username">
            Username
          </label>

          <input
            className={blank ? "input-box not-completed" : "input-box"}
            id="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = event => {
    const { username } = this.state;
    event.preventDefault();

    if (username.length === 0) {
      this.setState({ blank: true });
    } else {
      api
        .getSingleDatum("users", this.state.username)
        .then(user => {
          this.props.login(user);
          this.setState({
            loggedIn: true
          });
        })
        .catch(err => {
          this.setState({ blank: false, error: true });
        });
    }
  };
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default Login;
