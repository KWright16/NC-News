import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import Topic from "./components/Topic";
import Article from "./components/Article";
import Comments from "./components/Comments";

class App extends Component {
  state = {
    user: {}
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>NC News</h1>
        </header>
        <Nav />
        <Sidebar />
        <Router className="main">
          <Homepage path="/" />
          <Topic path="/topics/:topic_slug/articles" />
          <Article path="/topics/:article_id" />
          <Comments path="/comments/:article_id/comments" />
        </Router>
        <footer />
      </div>
    );
  }
}

export default App;
