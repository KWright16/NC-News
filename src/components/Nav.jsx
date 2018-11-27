import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import * as api from "../api";

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    return (
      <div className="nav">
        <nav>
          <p>football coding topic...</p>

          {/* {topics.map(topic => {
            return (
              <Link to={`/topic/:topic_slug`} key={topic.slug}>
                {topic.name}
              </Link> 
            );
          })} */}
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

Nav.propTypes = {};

export default Nav;
