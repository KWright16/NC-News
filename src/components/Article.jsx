import React, { Component } from "react";
// import PropTypes from "prop-types";
import * as api from "../api";
import Comments from "./Comments";
import { Link, Router } from "@reach/router";
import UpdateVotes from "./UpdateVotes";
import PostComment from "./PostComment";

class Article extends Component {
  state = {
    article: {},
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>;

    return (
      <div>
        <h1>{article.title}</h1>
        <h3 className="by">By {article.created_by.name}</h3>
        <p>{article.comment_count} comments,</p>
        <UpdateVotes
          updateVotes={this.updateVotes}
          urlId={this.props.uri}
          votes={article.votes}
        />
        <p className="articleBody">{article.body}</p>
        <br />
        <br />
        <Link to={`/articles/${article._id}/comments`}>Show Comments</Link>
        <Router>
          <Comments
            article={this.props.article_id}
            user={this.props.user}
            path="/comments"
          />
        </Router>
        <PostComment articleId={article._id} user={this.props.user} />
      </div>
    );
  }
  componentDidMount() {
    api
      .getData("articles", this.props.article_id)
      .then(({ article }) => {
        this.setState({
          article,
          isLoading: false
        });
      })
      .catch(console.log);
  }

  updateVotes = ({ article }) => {
    this.setState(state => {
      return { article: { ...state.article, votes: article.votes } };
    });
  };
}

// Article.propTypes = {
//   article_id: PropTypes.string.isRequired
// };

export default Article;
