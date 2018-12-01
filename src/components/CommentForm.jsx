import React from "react";
import PropTypes from "prop-types";

const CommentForm = props => {
  return (
    <div className="commentFormContainer">
      <form className="addArticle form" onSubmit={props.handleSubmit}>
        <label htmlFor="body">Add Comment: </label>
        <br />
        <textarea
          id="body"
          className="commentTextarea input-box"
          value={props.body}
          onChange={props.handleChange}
        />
        <br />
        <button>Post Comment</button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  handelSubmit: PropTypes.func,
  handleChange: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired
};

export default CommentForm;
