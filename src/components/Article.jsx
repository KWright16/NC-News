import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";
import UpdateVotes from "./UpdateVotes";
import PostComment from "./PostComment";
import { navigate } from "@reach/router";

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
        <UpdateVotes urlId={this.props.uri} votes={article.votes} />
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

  changeCommentsShowing = () => {
    if (!this.state.commentsShowing) {
      this.setState({ commentsShowing: true });
    }
  };

  stopCommentsShowing = event => {
    event.preventDefault();
    if (this.state.commentsShowing) {
      this.setState({ commentsShowing: false });
    }
  };
}

export default Article;
