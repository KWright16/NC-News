import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    return (
      <div>
        <ul>
          {articles
            .sort((a, b) => b.votes - a.votes)
            .map(article => {
              return (
                <div key={article._id}>
                  <Link to={`/articles/${article._id}`}>{article.title}</Link>
                  <p>By {article.created_by.name}</p>
                  <p>
                    Votes {article.votes}, Comments {article.comment_count}
                  </p>
                </div>
              );
            })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    api
      .getData("articles")
      .then(({ articles }) => {
        this.setState({ articles });
      })
      .catch(console.log);
  }
}

export default Homepage;
