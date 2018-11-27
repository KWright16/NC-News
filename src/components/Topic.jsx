import React, { Component } from "react";
// import PropTypes from "prop-types";
import * as api from "../api";

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
                <li>{article.title}</li>
                <p>By {article.created_by.name}</p>
                <p>
                  Votes {article.votes}, Comments {article.comment_count}
                </p>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    api
      .getData("topics", this.props.slug)
      .then(({ articles }) => {
        this.setState({ articles });
      })
      .catch(console.log);
  }
}

// Topic.propTypes = {};

export default Topic;
