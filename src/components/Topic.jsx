import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import PropTypes from "prop-types";

class Topic extends Component {
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
                  Votes {article.votes}, Comments {article.comment_count}
                </p>
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      this.fetchArticles();
    }
  }
  fetchArticles = () => {
    api
      .getData("topics", this.props.slug, "articles")
      .then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
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
  };
  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
}

Topic.propTypes = {
  slug: PropTypes.string,
  uri: PropTypes.string
};

export default Topic;
