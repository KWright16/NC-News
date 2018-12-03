import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import PropTypes from "prop-types";

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: "mostRecent"
  };
  render() {
    const { articles, isLoading, sortBy } = this.state;
    if (isLoading) return <div className="loader">Loading...</div>;

    const sortedArticles = this.props.sortArticles(articles, sortBy);
    return (
      <div className="clearfix">
        <div className="sortBy">
          <label htmlFor="sortBy">Sort By: </label>
          <select
            className="input-box"
            id="sortBy"
            onChange={this.handleChange}
            defaultValue="mostRecent"
          >
            <option value="mostRecent">Most Recent</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        <ul className="articles">
          {sortedArticles.map(article => {
            return (
              <li className="article-list" key={article._id}>
                <Link className="link" to={`/articles/${article._id}`}>
                  <h3 className="article-title">{article.title}</h3>
                </Link>
                <p className="by">By {article.created_by.name}</p>
                <p>
                  {article.created_at
                    .split("T")
                    .join(" ")
                    .slice(0, 16)}
                </p>
                <p>
                  Votes {article.votes}, Comments {article.comment_count}
                </p>
                <br />
              </li>
            );
          })}
        </ul>
      </div>
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
  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
}

Articles.propTypes = {
  uri: PropTypes.string
};

export default Articles;
