import React, { Component } from "react";
// import PropTypes from "prop-types";
import * as api from "../api";
import UpdateVotes from "./UpdateVotes";

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
    this.props.changeCommentsShowing();
    return (
      <div>
        {comments.map(comment => {
          return (
            <div key={comment._id}>
              <p className="by">{comment.created_by.username}</p>
              <p>{comment.body}</p>
              <p className="faded">{comment.created_at.split("T")[0]}</p>
              <UpdateVotes
                updateVotes={this.updateVotes}
                comment={comment}
                votes={comment.votes}
              />
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
      </div>
    );
  }
  componentDidMount() {
    this.fetchComments();
  }
  componentDidUpdate(prevState) {
    if (prevState.comments !== this.state.comments) {
      this.fetchComments();
    }
  }
  fetchComments = () => {
    api
      .getData("articles", this.props.article_id, "comments")
      .then(comments => {
        this.setState({
          comments,
          isLoading: false
        });
      });
  };
  updateVotes = ({ comment }) => {
    const updatedComments = this.state.comments.map(originalComment => {
      if (comment._id === originalComment._id) {
        return { ...originalComment, votes: comment.votes };
      } else {
        return originalComment;
      }
    });
    this.setState(state => {
      return { comments: updatedComments };
    });
  };
  deleteComment = event => {
    const { value } = event.target;
    event.preventDefault();
    api.deleteComment(value).catch(error => {
      this.setState({ error });
    });
    this.setState({ isLoading: true });
  };
}

// Comments.propTypes = {};

export default Comments;
