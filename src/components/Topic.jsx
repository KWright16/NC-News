import React, { Component } from "react";
// import PropTypes from "prop-types";
import * as api from "../api";
import { Link } from "@reach/router";

class Topic extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    return (
      <div>
        <ul>
          {articles.map(article => {
            return (
              <div key={article._id}>
                <Link to={`/articles/${article._id}`}>{article.title}</Link>
                <p>By {article.created_by.name}</p>
                <p>
                  Votes {article.votes}, Comments {article.comment_count}
                </p>
                <br />
                <br />
              </div>
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
        this.setState({ articles });
      })
      .catch(console.log);
  };
}

// Topic.propTypes = {
//   slug: PropTypes.String.isRequired
// };

export default Topic;
