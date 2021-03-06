import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import PropTypes from "prop-types";

class PostArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    created_by: "",
    error: null,
    blank: null
  };
  render() {
    const { title, body, error, created_by, blank } = this.state;
    if (!this.props.user.name) {
      const url = { url: "/articles/new_article" };
      localStorage.setItem("url", JSON.stringify(url));
      navigate("/login");
    }
    const message = blank ? "All fields required" : "";
    if (error) return <p>Something went wrong:</p>;
    if (!created_by) {
      return (
        <div className="formContainer">
          <p className="blank">{message}</p>
          <form className="addArticle form" onSubmit={this.handleSubmit}>
            <label htmlFor="topic">Topic: </label>
            <select
              className={
                blank && blank.topic ? "input-box not-completed" : "input-box"
              }
              id="topic"
              onChange={this.handleChange}
              defaultValue="choose"
            >
              <option value="choose" disabled>
                Choose an option
              </option>
              <option value="coding">Coding</option>
              <option value="football">Football</option>
              <option value="cooking">Cooking</option>
            </select>
            <br />
            <br />
            <label htmlFor="title">Article Title: </label>
            <br />

            <input
              className={
                blank && blank.title
                  ? "inputTitle input-box not-completed"
                  : "inputTitle input-box"
              }
              type="text"
              id="title"
              value={title}
              onChange={this.handleChange}
            />
            <br />

            <label htmlFor="body">Article Body: </label>
            <br />
            <textarea
              id="body"
              className={
                blank && blank.body
                  ? "textarea input-box not-completed"
                  : "textarea input-box"
              }
              value={body}
              onChange={this.handleChange}
            />
            <br />
            <button>Post Article</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <h1>{title}</h1>
          <h3 className="by">By {created_by}</h3>
          <p>0 comments,</p>
          <p>0 votes</p>
          <p className="articleBody">{body}</p>
          <Link className="link button" to="/">
            Return to Articles
          </Link>
        </div>
      );
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { topic, title, body } = this.state;
    const { user } = this.props;
    const blank = this.validate(topic, title, body);

    if (blank.body || blank.title || blank.topic) {
      this.setState({ blank });
    } else {
      const newArticle = {
        title,
        body,
        created_by: user._id
      };

      api
        .postArticle(topic, newArticle)
        .then(() => {
          this.setState({
            created_by: user.name,
            blank: null
          });
        })
        .catch(error => {
          this.setState({ error, created_by: user.name });
        });
    }
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };

  validate = (topic, title, body) => {
    return {
      topic: topic.length === 0,
      title: title.length === 0,
      body: body.length === 0
    };
  };
}

PostArticle.propTypes = {
  user: PropTypes.object.isRequired
};

export default PostArticle;
