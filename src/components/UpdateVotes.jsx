import React, { Component } from "react";
// import PropTypes from 'prop-types';
import * as api from "../api";

class UpdateVotes extends Component {
  render() {
    console.log();
    return (
      <div>
        <p>{this.props.votes}</p>
        <button onClick={this.handleClick} value="up">
          Up Vote
        </button>
        <button onClick={this.handleClick} value="down">
          Down Vote
        </button>
      </div>
    );
  }
  handleClick = event => {
    const { value } = event.target;
    const urlId = this.props.comment
      ? `/comments/${this.props.comment._id}`
      : this.props.urlId;
    api.updateData(urlId, value).then(article => {
      this.props.updateVotes(article);
    });
  };
}

// UpdateVotes.propTypes = {

// };

export default UpdateVotes;
