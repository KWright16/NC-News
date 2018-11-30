import React from "react";
import { Link } from "@reach/router";

const Logout = props => {
  props.logout();
  return (
    <div>
      <h3>Successfully logged out</h3>
      <Link className="link button" to="/">
        Return to Homepage
      </Link>
    </div>
  );
};

export default Logout;
