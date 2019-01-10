import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api";
import { navigate } from "@reach/router";
import { Doughnut } from 'react-chartjs-2'

class User extends Component {
  state = {
    userArticles: [],
    isLoading: true,
    totalVotes: 0,
    mostPopular: [],
    data: {}
  };
  render() {
    const { isLoading, userArticles, totalVotes, mostPopular, data } = this.state;
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
        <div className='chart'>
          <h3>What you've been writting about</h3>
          <Doughnut data={data} id='chart' width={100} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
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
        const topicData = articles.reduce((acc, article) => {
          acc[article.belongs_to] = (acc[article.belongs_to] || 0) + 1
          return acc
        }, {})
        const data = {
          labels: Object.keys(topicData),
          datasets: [{
            data: Object.values(topicData),
            backgroundColor: [
              '#eeaa7b',
              '#07889b',
              '#66b9bf'
            ],
            hoverBackgroundColor: [
              '#e37222',
              '#e37222',
              '#e37222'
            ]
          }]
        }
        this.setState({ userArticles, isLoading: false, data });
      })
      .catch(err => {
        const { uri } = this.props;
        console.log(err)
        navigate("/error", {
          replace: true,
          state: {
            // code: err.response.status,
            // message: err.response.statusText,
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
