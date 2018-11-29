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
                <ul>
                  <li key={article._id}>
                    <Link className="link" to={`/articles/${article._id}`}>
                      <h3 className="article-title">{article.title}</h3>
                    </Link>
                    <p>By {article.created_by.name}</p>
                    <p>
                      Votes {article.votes}, Comments {article.comment_count}
                    </p>
                  </li>
                </ul>
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
