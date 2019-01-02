import React, { Component } from "react";
import * as api from "../api";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import Articles from "./Articles";

class Homepage extends Component {
  state = {
    articles: [],
    isLoading: true,
    sortBy: "mostRecent",
    searchTerm: '',
    searchedArticles: null
  };

  render() {
    const { articles, isLoading, searchedArticles } = this.state;
    if (isLoading) return <div className="loader">Loading...</div>;

    return (
      <Articles
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        sortedArticles={searchedArticles ? searchedArticles : articles}
        path="/articles"
      />
    );
  }
  componentDidMount() {
    api
      .getAllData("articles")
      .then(({ articles }) => {
        const sortedArticles = this.props.sortArticles(
          articles,
          this.state.sortBy
        );
        this.setState({ articles: sortedArticles, isLoading: false, searchedArticles: null });
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
  componentDidUpdate(prevProps, prevState) {
    const { sortBy, articles } = this.state;
    const { sortArticles } = this.props;
    if (prevState.sortBy !== sortBy) {
      const sortedArticles = sortArticles(articles, sortBy);
      this.setState({ articles: sortedArticles, isLoading: false });
    }
  }
  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault()
    const { articles, searchTerm } = this.state
    const { searchArticles } = this.props
    const searchedArticles = searchArticles(articles, searchTerm)
    this.setState({ searchedArticles: searchedArticles, isLoading: false })
  }
}

Homepage.propTypes = {
  uri: PropTypes.string
};

export default Homepage;
