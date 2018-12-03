import React, { Component } from "react";
import "./App.css";
import "./spinner.css";
import Nav from "./components/Nav";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import Sidebar from "./components/Sidebar";
import Topic from "./components/Topic";
import Article from "./components/Article";
import Login from "./components/Login";
import PostArticle from "./components/PostArticle";
import Logout from "./components/Logout";
import BadRequest from "./components/BadRequest";
import NotFound from "./components/NotFound";

class App extends Component {
  state = {
    user: {},
    topic: {}
  };

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <header>
          <h1 className="App-header">NC News</h1>
        </header>
        <Nav />
        <Sidebar user={user} />{" "}
        <Router className="main">
          <Articles sortArticles={this.sortArticles} path="/" />
          <Login login={this.login} path="/login" />
          <Logout path="/logout" logout={this.logout} />
          <Topic sortArticles={this.sortArticles} path="/topic/:slug" />
          <Article user={user} path="/articles/:article_id/*" />
          <PostArticle user={user} path="/articles/new_article" />
          <NotFound default />
          <BadRequest path="/error" />
        </Router>
        <footer />
      </div>
    );
  }
  componentDidMount() {
    const { user } = this.state;
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user.name) {
      this.setState({ user: JSON.parse(storedUser) });
    }
  }
  login = user => {
    this.setState({ user });
    localStorage.setItem("user", JSON.stringify(this.state.user));
  };

  logout = () => {
    localStorage.removeItem("user");
    if (this.state.user.name) {
      this.setState({
        user: {}
      });
    }
  };
  sortArticles = (articles, sortBy) => {
    const sortFormatted = item => {
      return parseInt(
        item.created_at
          .split("-")
          .join("")
          .slice(0, 8) +
          item.created_at
            .split(":")
            .join("")
            .slice(11, 17)
      );
    };
    return sortBy === "popularity"
      ? articles.sort((a, b) => b.votes - a.votes)
      : articles.sort((a, b) => sortFormatted(b) - sortFormatted(a));
  };
}

export default App;
