import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import PropTypes from "prop-types";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true
  };
  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) return <div className="loader">Loading...</div>;
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
      .getAllData("articles")
      .then(({ articles }) => {
        this.setState({ articles, isLoading: false });
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

Articles.propTypes = {
  uri: PropTypes.string
};

export default Articles;
