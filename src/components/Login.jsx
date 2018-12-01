import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import { navigate } from "@reach/router";

class Login extends Component {
  state = {
    username: "jessjelly",
    loggedIn: false
  };
  render() {
    const { username, loggedIn } = this.state;
    let url = localStorage.getItem("url");
    if (loggedIn && url) {
      url = JSON.parse(url);
      localStorage.removeItem("url");
      navigate(url.url);
    }
    if (loggedIn) return <h2>Welcome back {username}</h2>;
    return (
      <div className="form">
        <p>Login to post or delete articles and comments</p>
        <br />
        <form onSubmit={this.handleSubmit}>
          <label className="input" htmlFor="username">
            Username
          </label>

          <input
            className="input-box"
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
    event.preventDefault();
    api
      .getUsers(this.state.username)
      .then(user => {
        this.props.login(user);
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
        const { uri } = this.props;
        navigate("/error", {
          replace: true,
          state: {
            code: err.response.status,
            message: err.response.statusText,
            from: uri
          }
        });
      });
  };
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default Login;
