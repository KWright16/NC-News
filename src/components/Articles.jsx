import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

const Articles = props => {
  const { sortedArticles, handleChange } = props;

  return (
    <div className="clearfix">
      <div className="sortBy">
        <label className="sortLabel" htmlFor="sortBy">
          Sort By:{" "}
        </label>
        <select
          className="input-box"
          id="sortBy"
          onChange={handleChange}
          defaultValue="mostRecent"
        >
          <option value="mostRecent">Most Recent</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      <ul className="articles">
        {sortedArticles.map(article => {
          return (
            <li className="article-list" key={article._id}>
              <Link className="link" to={`/articles/${article._id}`}>
                <h3 className="article-title">{article.title}</h3>
              </Link>
              <p className="by">By {article.created_by.name}</p>
              <p>
                {article.created_at
                  .split("T")
                  .join(" ")
                  .slice(0, 16)}
              </p>
              <p>
                Votes {article.votes}, Comments {article.comment_count}
              </p>
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Articles.propTypes = {
  sortedArticles: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Articles;
