import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Homepage from "./components/Homepage";
import Sidebar from "./components/Sidebar";
import Topic from "./components/Topic";
import Article from "./components/Article";
import Login from "./components/Login";
import PostArticle from "./components/PostArticle";

class App extends Component {
  state = {
    user: {},
    topic: {}
  };

  render() {
    const { user } = this.state;
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user.name) {
      this.setState({ user: JSON.parse(storedUser) });
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>NC News</h1>
        </header>
        <Nav />
        <Sidebar user={user} />{" "}
        <Router className="main">
          <Homepage path="/" />
          <Login login={this.login} path="/login" />
          <Topic getTopic={this.getTopic} path="/topic/:slug" />
          <Article path="/articles/:article_id/*" />
          <PostArticle user={user} path="/articles/new_article" />
          {/*<Topic path="/topics/:topic_slug/articles" /> */}
        </Router>
        <footer />
      </div>
    );
  }
  login = user => {
    this.setState({ user });
    localStorage.setItem("user", JSON.stringify(this.state.user));
  };
  getTopic = topic => {
    this.setState({ topic });
  };
  storeLogin = user => {};
}

export default App;
