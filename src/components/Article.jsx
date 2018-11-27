import React, { Component } from "react";
// import PropTypes from "prop-types";
import * as api from "../api";

class Article extends Component {
  state = {
    article: {},
    isLoading: true
  };
  render() {
    if (this.state.isLoading) return <p>Loading...</p>;
    const { article } = this.state;
    return (
      <div>
        <h1>{article.title}</h1>
        <h3>By {article.created_by.name}</h3>
        <p>
          {article.comment_count} comments, {article.votes} votes
        </p>
        <button>Up Vote</button>
        <button>Down Vote</button>
        <br />
        <br />
        <p className="articleBody">{article.body}</p>
      </div>
    );
  }
  componentDidMount() {
    api
      .getArticles(this.props.article_id)
      .then(({ article }) => {
        this.setState({
          article,
          isLoading: false
        });
      })
      .catch(console.log);
  }
}

// Article.propTypes = {};

export default Article;
