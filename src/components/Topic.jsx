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
    const { articles, isLoading } = this.state;
    if (isLoading) return <div className="loader">Loading...</div>;

    return (
      <Articles
        handleChange={this.handleChange}
        sortedArticles={articles}
        path="/articles"
      />
    );
  }
  componentDidMount() {
    this.fetchArticles();
  }
  componentDidUpdate(prevProps, prevState) {
    const { sortBy, articles } = this.state;
    const { sortArticles, slug } = this.props;
    if (prevProps.slug !== slug) {
      this.fetchArticles();
    }
    if (prevState.sortBy !== sortBy) {
      const sortedArticles = sortArticles(articles, sortBy);
      this.setState({ articles: sortedArticles, isLoading: false });
    }
  }
  fetchArticles = () => {
    api
      .getData("topics", this.props.slug, "articles")
      .then(articles => {
        const sortedArticles = this.props.sortArticles(
          articles,
          this.state.sortBy
        );
        this.setState({
          articles: sortedArticles,
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
