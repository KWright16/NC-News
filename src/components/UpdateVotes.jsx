import React, { Component } from "react";
import * as api from "../api";

class UpdateVotes extends Component {
  state = {
    voteChange: 0,
    clicked: false,
    error: null
  };
  render() {
    const { voteChange, error } = this.state;
    if (error) return <p>Something went wrong</p>;
    return (
      <div>
        <p>{this.props.votes + voteChange} votes</p>
        <button
          onClick={this.handleClick}
          value="up"
          disabled={voteChange === 1}
        >
          Up Vote
        </button>
        <button
          onClick={this.handleClick}
          value="down"
          disabled={voteChange === -1}
        >
          Down Vote
        </button>
      </div>
    );
  }
  handleClick = event => {
    let { value } = event.target;
    const { clicked } = this.state;
    let change = {};
    const urlId = this.props.comment
      ? `/comments/${this.props.comment._id}`
      : this.props.urlId;

    if (!clicked)
      change =
        value === "down"
          ? { voteChange: -1, clicked: true }
          : { voteChange: 1, clicked: true };
    if (clicked) change = { voteChange: 0, clicked: false };

    this.setState(change);

    api.updateData(urlId, value).catch(error => {
      this.setState({ error });
    });
  };
}

export default UpdateVotes;
