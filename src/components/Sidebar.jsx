import React from "react";
import { Link } from "@reach/router";

const Sidebar = props => {
  return (
    <div className="sidebar">
      <section>
        {props.user.username ? (
          <div>
            <p className="user">Logged in as {props.user.username}</p>
            <Link className="link" to="/logout">
              <p className="sidebar-text">Logout</p>
            </Link>
          </div>
        ) : (
          <Link className="link" to="/login">
            <p className="sidebar-text">Login</p>
          </Link>
        )}

        <br />
        <Link className="link" to="/">
          <p className="sidebar-text">Home</p>
        </Link>
        <br />
        <Link className="link" to="/articles/new_article">
          <p className="sidebar-text">Post New Article</p>
        </Link>
      </section>
    </div>
  );
};

export default Sidebar;
