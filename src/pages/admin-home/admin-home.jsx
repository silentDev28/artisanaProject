import React, { Component } from "react";
import FirstCards from "./first-card-row";
class Home extends Component {
  state = {};
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <FirstCards />
      </div>
    );
  }
}

export default Home;
