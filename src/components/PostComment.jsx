import React, { Component } from "react";
import * as api from "../api";
import { navigate } from "@reach/router";
import CommentForm from "./CommentForm";

class PostComment extends Component {
  state = {
    body: "",
    error: null,
    comment: {}
  };
  render() {
    const { error, comment } = this.state;

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

    if (!this.props.user.username) {
      const url = { url: `/articles/${this.props.articleId}` };
      localStorage.setItem("url", JSON.stringify(url));
      localStorage.setItem("comment", JSON.stringify(this.state.body));
      navigate("/login");
    } else {
      const newComment = {
        body,
        created_by: user._id
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

export default PostComment;
