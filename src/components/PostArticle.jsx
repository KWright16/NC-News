import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";

class PostArticle extends Component {
  state = {
    title: "",
    body: "",
    topic: "",
    created_by: "",
    error: null
  };
  render() {
    const { title, body, error, created_by } = this.state;
    if (!this.props.user.name) {
      navigate("/login");
    }
    if (error) return <p>Something went wrong:</p>;
    if (!created_by) {
      return (
        <div className="formContainer">
          <form className="addArticle form" onSubmit={this.handleSubmit}>
            <label htmlFor="topic">Topic: </label>
            <select
              className="input-box"
              id="topic"
              onChange={this.handleChange}
            >
              <option value="" selected={true} disabled>
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
              className="inputTitle input-box"
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
              className="textarea input-box"
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
          <Link to="/">Return to Articles</Link>
        </div>
      );
    }
  }
  handleSubmit = event => {
    const { topic, title, body } = this.state;
    const { user } = this.props;
    event.preventDefault();
    const newArticle = {
      title,
      body,
      created_by: user._id
    };

    api
      .postArticle(topic, newArticle)
      .then(() => {
        this.setState({
          created_by: user.name
        });
      })
      .catch(error => {
        this.setState({ error, created_by: user.name });
      });
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
}

export default PostArticle;
