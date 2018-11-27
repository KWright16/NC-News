import React from "react";
// import PropTypes from "prop-types";
import { Link } from "@reach/router";

const Sidebar = props => {
  console.log(props, "PROPS!");
  return (
    <div className="sidebar">
      <section>
        {props.user.username ? (
          <p>Logged in as {props.user.username}</p>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <br />
        <Link to="/">Home</Link>
        {/* <Link to="/newarticle">Post Article</Link>
        <Link>Topics</Link> */}
      </section>
    </div>
  );
};

// Sidebar.propTypes = {};

export default Sidebar;
