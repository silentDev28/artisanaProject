import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import CircularIndeterminate from "../../components/loader/loader";
import DescriptionAlerts from "../../components/alert-message/alert";
class InputComponent extends Component {
  state = {
    email: "",
    password: "",
    message: "",
    loader: false,
  };
  handleChange = (evt, attr) => {
    this.setState({
      [attr]: evt.target.value,
    });
  };

  handleClick = async () => {
    this.setState({
      loader: true,
    });
    const url = "https://sandbox.artisana.ng/api/identity/admin/token";
    const data = await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    await data
      .json()
      .then((data) => {
        if (data.hasErrors === true) {
          this.setState({
            loader: false,
            message: data.message,
            email: "",
            password: "",
          });
        } else {
          this.props.sendAuthCredentials(data);
          this.setState({
            loader: false,
            message: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((error) => {
        this.setState({
          loader: false,
          message: error,
          email: "",
          password: "",
        });
      });
  };
  render() {
    return (
      <div>
        <div className="col-lg-12">
          <TextField
            id="outlined-email-input"
            label="Email Address"
            type="email"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(evt) => this.handleChange(evt, "email")}
            value={this.state.email}
          />
        </div>
        <div className="col-lg-12">
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(evt) => this.handleChange(evt, "password")}
            value={this.state.password}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
          className="row"
        >
          {this.state.message === "" ? (
            ""
          ) : (
            <div
              className="col-lg-11"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginLeft: "15px",
              }}
            >
              <DescriptionAlerts urlMessage={this.state.message} />
            </div>
          )}

          <div
            className="col-lg-12"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {this.state.loader ? (
              <Button
                style={{
                  background: " #974578",
                  color: "white",
                  padding: "10px",
                }}
              >
                <CircularIndeterminate />
              </Button>
            ) : (
              <Button
                style={{
                  background: " #974578",
                  color: "white",
                  padding: "10px",
                }}
                onClick={this.handleClick}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const dispatchStateToprops = (dispatch) => {
  return {
    sendAuthCredentials: (sendData) =>
      dispatch({ type: "admin_auth_status", data: sendData }),
  };
};
export default connect(null, dispatchStateToprops)(InputComponent);
