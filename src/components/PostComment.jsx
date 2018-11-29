import React, { Component } from "react";
// import PropTypes from 'prop-types';
import * as api from "../api";
import { navigate } from "@reach/router";

class PostComment extends Component {
  state = {
    body: "",
    created_by: "",
    error: null
  };
  render() {
    const { body, error, created_by } = this.state;
    if (error) return <p>Something went wrong:</p>;

    const storedBody = localStorage.getItem("comment");
    if (storedBody && body.length === 0) {
      localStorage.removeItem("comment");
      this.setState({ body: JSON.parse(storedBody) });
    }

    if (created_by && !this.props.commentsShowing) {
      return (
        <div>
          <p className="by">{created_by}</p>
          <p>{body}</p>
          <p>0 votes</p>
          <p className="faded">Just now</p>
          <br />
          <br />
        </div>
      );
    }
    return (
      <div className="commentFormContainer">
        <form className="addArticle" onSubmit={this.handleSubmit}>
          <label htmlFor="body">Add Comment: </label>
          <br />
          <textarea
            id="body"
            className="commentTextarea"
            value={body}
            onChange={this.handleChange}
          />
          <br />
          <button>Post Comment</button>
        </form>
      </div>
    );
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

      api.postComment(articleId, newComment).catch(error => {
        this.setState({ error });
      });

      this.setState({
        created_by: user.username,
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

// PostComment.propTypes = {

// };

export default PostComment;
