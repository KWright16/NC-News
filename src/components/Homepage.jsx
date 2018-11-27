import React, { Component } from "react";
import * as api from "../api";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    return (
      <div>
        <ul>
          {articles.map(article => {
            return (
              <div key={article._id}>
                <li>{article.title}</li>
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
