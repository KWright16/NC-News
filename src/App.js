import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import Topic from "./components/Topic";
// import Article from "./components/Article";
// import Comments from "./components/Comments";
import Login from "./components/Login";

class App extends Component {
  state = {
    user: "",
    topic: {}
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>NC News</h1>
        </header>
        <Nav />
        <Sidebar /> {/* pass down user to display message in sidebar*/}
        <Router className="main">
          <Homepage path="/" />
          <Login checkUser={this.checkUser} path="/login" />
          <Topic getTopic={this.getTopic} path="/topic/:slug" />
          {/*<Topic path="/topics/:topic_slug/articles" />
          <Article path="/topics/:article_id" />
          <Comments path="/comments/:article_id/comments" /> */}
        </Router>
        <footer />
      </div>
    );
  }
  checkUser = (users, username) => {
    const currentUser = users.filter(user => {
      return user === username;
    });
    this.setState(currentUser);
  };
  getTopic = topic => {
    this.setState({ topic });
  };
}

export default App;
