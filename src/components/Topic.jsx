import React, { Component } from "react";
import * as api from "../api";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import Articles from "./Articles";

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
      <Articles
        handleChange={this.handleChange}
        sortedArticles={sortedArticles}
        path="/articles"
      />
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
