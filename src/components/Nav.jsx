import React, { Component } from "react";
// import PropTypes from "prop-types";
import { Link } from "@reach/router";
import * as api from "../api";

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
              <ul>
                <li key={topic.slug}>
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
      .getData("topics")
      .then(({ topics }) => {
        this.setState({ topics });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

// Nav.propTypes = {};

export default Nav;
