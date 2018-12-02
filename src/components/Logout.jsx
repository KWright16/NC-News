import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

const Logout = props => {
  props.logout();
  return (
    <div>
      <h3>Successfully logged out</h3>
      <p>Login to post or delete articles and comments</p>
      <br />
      <Link className="link button" to="/">
        Return to Homepage
      </Link>
    </div>
  );
};
Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default Logout;
