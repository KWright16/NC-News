import React, { Component } from "react";
// import PropTypes from "prop-types";
import * as api from "../api";
import Comments from "./Comments";
import UpdateVotes from "./UpdateVotes";
import PostComment from "./PostComment";

class Article extends Component {
  state = {
    article: {},
    isLoading: true,
    commentsShowing: false
  };
  render() {
    const { article, isLoading, commentsShowing } = this.state;
    if (isLoading) return <p>Loading...</p>;

    return (
      <div>
        <h1 className="title">{article.title}</h1>
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
        {!commentsShowing ? (
          <button onClick={this.changeCommentsShowing}>Show Comments</button>
        ) : (
          <>
            <button onClick={this.stopCommentsShowing}>Hide Comments</button>
            <Comments
              changeCommentsShowing={this.changeCommentsShowing}
              article={this.props.article_id}
              user={this.props.user}
            />
          </>
        )}

        <PostComment
          commentsShowing={commentsShowing}
          articleId={article._id}
          user={this.props.user}
        />
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

  changeCommentsShowing = () => {
    if (!this.state.commentsShowing) {
      this.setState({ commentsShowing: true });
    }
  };

  stopCommentsShowing = () => {
    if (this.state.commentsShowing) {
      this.setState({ commentsShowing: false });
    }
  };
}

// Article.propTypes = {
//   article_id: PropTypes.string.isRequired
// };

export default Article;
