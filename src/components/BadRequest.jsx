import React from "react";

const BadRequest = props => {
  return (
    <div>
      <br />
      <br />
      <p>{props.location.state.code}</p>

      <p>{props.location.state.message}</p>
      <p>on path {props.location.state.from}</p>
    </div>
  );
};

export default BadRequest;
