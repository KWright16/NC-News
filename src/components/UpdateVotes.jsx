import React, { Component } from "react";
// import PropTypes from 'prop-types';
import * as api from "../api";

class UpdateVotes extends Component {
  render() {
    return (
      <div>
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
    api.updateData(this.props.urlId, value).then(article => {
      {
        /*update votes has wrong file path*/
      }
      console.log({ article }, "ARTICLE");
    });
  };
}

// UpdateVotes.propTypes = {

// };

export default UpdateVotes;
