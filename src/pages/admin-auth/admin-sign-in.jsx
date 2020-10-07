import React, { Component } from "react";
import Logo from "../../images/artisana.jpeg";
import AdminForm from "../admin-auth/admin-form";
class AdminSignIn extends Component {
  state = {};
  render() {
    return (
      <div className="container col-lg-4" style={{ paddingTop: "80px" }}>
        <span
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "60px", height: "60px" }}
          ></img>
        </span>
        <h4
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            fontWeight: "bold",
            color: "#974578",
          }}
        >
          Sign In
        </h4>
        <AdminForm />
      </div>
    );
  }
}

export default AdminSignIn;
