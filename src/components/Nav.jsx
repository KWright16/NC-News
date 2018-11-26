import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

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
              <Link to={`/topics`} key={topic.slug}>
                {topic.name}
              </Link> 
            );
          })} */}
        </nav>
      </div>
    );
  }
}

Nav.propTypes = {};

export default Nav;
