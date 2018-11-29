import React from "react";
// import PropTypes from "prop-types";
import { Link } from "@reach/router";

const Sidebar = props => {
  return (
    <div className="sidebar">
      <section>
        {props.user.username ? (
          <div>
            <p>Logged in as {props.user.username}</p>
            <Link to="/logout">Logout</Link>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <br />
        <Link to="/">Home</Link>
        <br />
        <Link to="/articles/new_article">Post New Article</Link>
        {/* <Link>Topics</Link> */}
      </section>
    </div>
  );
};

// Sidebar.propTypes = {};

export default Sidebar;
