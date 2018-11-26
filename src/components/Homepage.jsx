import React, { Component } from "react";
import * as api from "../api";

class Homepage extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <div>
        <ul>
          {/* {articles.map(article => {
            return (
              <div>
                <li key={article._id}>{article.title}</li>
              </div>
            );
          })} */}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    //     api
    //       .getArticles()
    //       .then(({ articles }) => {
    //         console.log(articles);
    //         this.setState({ articles });
    //       })
    //       .catch(console.log);
  }
}

export default Homepage;
