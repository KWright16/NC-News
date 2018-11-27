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
    const {
      comments: { comments },
      isLoading
    } = this.state;
    if (isLoading) return <p>Loading...</p>;
    console.log(comments, "<<<");
    return (
      <div>
        {comments.map(comment => {
          return (
            <div key={comment._id}>
              <p className="by">{comment.created_by.username}</p>
              <p>{comment.body}</p>

              <p className="faded">{comment.created_at.split("T")[0]}</p>
              <p>{comment.votes} votes</p>
              <UpdateVotes urlId={this.props.uri} />
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
}

// Comments.propTypes = {};

export default Comments;
