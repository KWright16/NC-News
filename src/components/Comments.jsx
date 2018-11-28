import React, { Component } from "react";
// import PropTypes from "prop-types";
import * as api from "../api";
import UpdateVotes from "./UpdateVotes";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true
  };
  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) return <p>Loading...</p>;
    return (
      <div>
        {comments.map(comment => {
          return (
            <div key={comment._id}>
              <p className="by">{comment.created_by.username}</p>
              <p>{comment.body}</p>
              <p className="faded">{comment.created_at.split("T")[0]}</p>
              {/* <p>{comment.votes} votes</p> */}
              <UpdateVotes
                updateVotes={this.updateVotes}
                comment={comment}
                votes={comment.votes}
              />
              <br />
              <br />
            </div>
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    api
      .getData("articles", this.props.article_id, "comments")
      .then(comments => {
        console.log(comments);
        this.setState({
          comments,
          isLoading: false
        });
      });
  }
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
}

// Comments.propTypes = {};

export default Comments;
