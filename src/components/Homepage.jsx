import React, { Component } from "react";
import * as api from "../api";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    console.log(articles, "<<<<");
    return (
      <div>
        <ul>
          {articles.map(article => {
            return (
              <div key={article._id}>
                <li>{article.title}</li>
                <p>By {article.created_by.name}</p>
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
