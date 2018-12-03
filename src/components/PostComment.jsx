import React, { Component } from "react";
import * as api from "../api";
import { navigate } from "@reach/router";
import CommentForm from "./CommentForm";
import PropTypes from "prop-types";

class PostComment extends Component {
  state = {
    body: "",
    error: null,
    comment: {},
    blank: false
  };
  render() {
    const { error, comment, blank } = this.state;

    const message = blank ? "Enter a comment before submitting" : "";
    if (error) return <p>Something went wrong:</p>;

    if (comment.body) {
      return (
        <div>
          <p className="by">{comment.created_by.username}</p>
          <p>{comment.body}</p>
          <p>0 votes</p>
          <p className="faded">Just now</p>
          <CommentForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            body={this.state.body}
          />
        </div>
      );
    }
    return (
      <CommentForm
        message={message}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        body={this.state.body}
      />
    );
  }

  componentDidMount() {
    const { body } = this.state;
    const storedBody = localStorage.getItem("comment");
    if (storedBody && body.length === 0) {
      localStorage.removeItem("comment");
      this.setState({ body: JSON.parse(storedBody) });
    }
  }

  handleSubmit = event => {
    const { body } = this.state;
    const { user, articleId } = this.props;
    event.preventDefault();

    if (!user.username) {
      const url = { url: `/articles/${articleId}` };
      localStorage.setItem("url", JSON.stringify(url));
      localStorage.setItem("comment", JSON.stringify(body));
      navigate("/login", {
        state: {
          from: "postComment",
          message: "Your comment will be saved for you to go back to"
        }
      });
    } else if (body.length === 0) {
      this.setState({ blank: true });
    } else {
      const newComment = {
        body,
        created_by: user._id,
        blank: false
      };

      api
        .postComment(articleId, newComment)
        .then(({ comment }) => {
          this.setState({
            comment: comment
          });
        })
        .catch(error => {
          this.setState({ error });
        });

      this.setState({
        body: ""
      });
    }
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
}

PostComment.propTypes = {
  articleId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default PostComment;
