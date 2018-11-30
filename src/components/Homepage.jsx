import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    return (
      <ul className="articles">
        {articles
          .sort((a, b) => b.votes - a.votes)
          .map(article => {
            return (
              <li className="article-list" key={article._id}>
                <Link className="link" to={`/articles/${article._id}`}>
                  <h3 className="article-title">{article.title}</h3>
                </Link>
                <p className="by">By {article.created_by.name}</p>
                <p>
                  Votes {article.votes}, Comments {article.comment_count}
                </p>
                <br />
              </li>
            );
          })}
      </ul>
    );
  }
  componentDidMount() {
    api
      .getData("articles")
      .then(({ articles }) => {
        this.setState({ articles });
      })
      .catch(err => {
        const { uri } = this.props;
        navigate("/error", {
          replace: true,
          state: {
            code: err.response.status,
            message: err.response.statusText,
            from: uri
          }
        });
      });
  }
}

export default Homepage;
