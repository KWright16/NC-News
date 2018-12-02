import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import * as api from "../api";
import PropTypes from "prop-types";

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    return (
      <div className="nav">
        <nav className="navLink">
          {topics.map(topic => {
            return (
              <ul key={topic.slug}>
                <li>
                  <Link className="link" to={`/topic/${topic.slug}`}>
                    {<h3 className="navLink">{topic.title}</h3>}
                  </Link>
                </li>
              </ul>
            );
          })}
        </nav>
      </div>
    );
  }
  componentDidMount() {
    api
      .getAllData("topics")
      .then(({ topics }) => {
        this.setState({ topics });
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
  }
}
Nav.propTypes = {
  uri: PropTypes.string
};

export default Nav;
