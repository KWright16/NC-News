import React, { Component } from "react";
import * as api from "../api";
import UpdateVotes from "./UpdateVotes";
import PostComment from "./PostComment";
import PropTypes from "prop-types";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    error: null
  };
  render() {
    const { comments, isLoading, error } = this.state;
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong:</p>;
    return (
      <div>
        {comments.map(comment => {
          return (
            <div key={comment._id}>
              <p className="by">{comment.created_by.username}</p>
              <p>{comment.body}</p>
              <p className="faded">{comment.created_at.split("T")[0]}</p>
              <UpdateVotes comment={comment} votes={comment.votes} />
              {this.props.user.username === comment.created_by.username ? (
                <button value={comment._id} onClick={this.deleteComment}>
                  Delete
                </button>
              ) : null}
              <br />
              <br />
            </div>
          );
        })}
        <PostComment articleId={this.props.article} user={this.props.user} />
      </div>
    );
  }
  componentDidMount() {
    this.fetchComments();
  }
  fetchComments = () => {
    api.getData("articles", this.props.article, "comments").then(comments => {
      this.setState({
        comments,
        isLoading: false
      });
    });
  };

  deleteComment = event => {
    const { value } = event.target;
    event.preventDefault();
    api
      .deleteComment(value)
      .then(() => {
        this.setState({ isLoading: true });
        this.fetchComments();
      })
      .catch(error => {
        this.setState({ error });
      });
  };
}

Comments.propTypes = {
  article: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default Comments;
