import React from "react";
// import PropTypes from 'prop-types';
import { Link } from "@reach/router";

const Logout = props => {
  props.logout();
  return (
    <div>
      <h3>Successfully logged out</h3>
      <Link to="/">Return to Homepage</Link>
    </div>
  );
};

// Logout.propTypes = {

// };

export default Logout;
