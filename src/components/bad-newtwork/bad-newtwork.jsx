import React, { Component } from "react";
import BadNetworkImage from "../../images/poor-signal.png";
class BadNetWork extends Component {
  state = {};
  render() {
    return (
      <div style={{ marginTop: "10%" }}>
        <div
          style={{ width: "100%", justifyContent: "center", display: "flex" }}
        >
          <img
            src={BadNetworkImage}
            alt="logo"
            style={{
              width: "200px",
              height: "150px",
              justifyContent: "center",
              display: "flex",
            }}
          ></img>
        </div>

        <div
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            fontWeight: "bold",
            fontSize: "30px",
            color: "#974578",
          }}
        >
          Network Error
        </div>
      </div>
    );
  }
}

export default BadNetWork;
