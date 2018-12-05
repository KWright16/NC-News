import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import { navigate } from "@reach/router";

class User extends Component {
  state = {
    userArticles: [],
    isLoading: true,
    totalVotes: 0,
    mostPopular: []
  };
  render() {
    const { isLoading, userArticles, totalVotes, mostPopular } = this.state;
    const { user } = this.props;

    if (isLoading) return <div className="loader">Loading...</div>;
    return (
      <div className="user-block">
        <div className="user-details">
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>You have written {userArticles.length} articles:</p>
          <p>You have {totalVotes} up votes</p>
        </div>
        <div className="profilePic">
          <img className="pic" src={user.avatar_url} alt="User profile" />
        </div>

        <ul className="usersArticles">
          <li>
            <h3>Top Articles</h3>
            <p>These are your most popular articles</p>
          </li>
          {mostPopular ? (
            mostPopular.map(article => {
              return (
                <li className="topArticles" key={article._id}>
                  <p>{article.title}</p>
                </li>
              );
            })
          ) : (
            <li>You haven't written any articles yet</li>
          )}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    api
      .getAllData("articles")
      .then(({ articles }) => {
        const userArticles = articles.filter(
          article => article.created_by.username === this.props.user.username
        );
        this.setState({ userArticles, isLoading: false });
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
  componentDidUpdate(prevProps, prevState) {
    const { userArticles } = this.state;
    if (prevState.userArticles.length !== userArticles.length) {
      const totalVotes = userArticles.reduce((votes, article) => {
        return (votes += article.votes);
      }, 0);
      const mostPopular = userArticles
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 3);

      this.setState({
        totalVotes,
        mostPopular
      });
    }
  }
}

User.propTypes = {
  user: PropTypes.object
};

export default User;
