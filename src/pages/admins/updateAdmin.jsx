import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import PageLoader from "../../components/loader/pageLoader";
import CircularIndeterminate from "../../components/loader/loader";
import { Link } from "react-router-dom";
import UpdateRoles from "./update-roles";
class AdminUpdate extends Component {
  state = {
    id: this.props.match.params.adminId,
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    imageUrl: "",
    hasResult: false,
    imageLoader: false,
    password: "",
    confirmPassword: "",
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/admins/${this.state.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data
          .json()
          .then((data) => {
            const firstname = data.result.firstname;
            const lastname = data.result.lastname;
            const email = data.result.email;
            const phoneNumber = data.result.phoneNumber;
            const imageUrl = data.result.imageUrl;
            console.log(data);
            this.setState({
              hasResult: data.hasResults,
              firstname,
              lastname,
              email,
              phoneNumber,
              imageUrl,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleFile = (evt, attr) => {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    if (evt.target.files[0]) {
      this.setState({
        imageLoader: true,
      });
      const image = evt.target.files[0];
      let fd = new FormData();

      fd.append("imageUrl", image);
      const url = `https://sandbox.artisana.ng/api/configuration/fileUpload`;
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.token}`,
        },
        body: fd,
      }).then((data) => {
        data
          .json()
          .then((data) => {
            this.setState({
              imageUrl: data.result,
              imageLoader: false,
            });
          })
          .catch((error) => {
            this.setState({
              message: error.message,
              imageUrl: "",
              imageLoader: false,
            });
          });
      });
    }
  };
  handleCreate = (evt, attr) => {
    this.setState({
      [attr]: evt.target.value,
    });
  };
  handleSubmit = () => {
    this.setState({
      loader: true,
    });
    if (
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.email === "" ||
      this.state.phoneNumber === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === "" ||
      this.state.roleId === ""
    ) {
      this.setState({
        message: "Please fill all empty fields",

        password: "",
        confirmPassword: "",

        loader: false,
      });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        message: "Password does not match",

        password: "",
        confirmPassword: "",

        loader: false,
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        message: "Your password must be atleast 6 characters",

        password: "",
        confirmPassword: "",

        loader: false,
      });
    } else {
      const {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        phoneNumber,
        imageUrl,
      } = this.state;
      const getActiveAdmin = JSON.parse(
        localStorage.getItem("persist:adminAuth")
      );
      const userTokens = JSON.parse(getActiveAdmin.adminAuth);
      const tokens = userTokens.adminStatus;

      let url = `https://sandbox.artisana.ng/api/admins/update/${this.state.id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.token}`,
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          confirmPassword: confirmPassword,
          imageUrl: imageUrl,
          roleId: this.state.roleId,
        }),
      }).then((data) => {
        data
          .json()
          .then((data) => {
            this.setState({
              message: "Admin update successful",

              loader: false,
            });
          })
          .catch((error) => {
            this.setState({
              message: error.message,

              password: "",
              confirmPassword: "",

              loader: false,
            });
          });
      });
    }
  };
  getRoleId = (roleId) => {
    this.setState({
      roleId,
    });
  };
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="row m-0">
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#974578",
            }}
          >
            Update Admin
          </div>
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#974578",
              justifyContent: "flex-end",
              display: "flex",
            }}
          >
            <Link to={"/admins/" + this.state.id}>
              <Button
                style={{
                  background: " #974578",
                  color: "white",
                  marginRight: "10px",
                }}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          {this.state.hasResult ? (
            <div>
              <div className="row m-0">
                {this.state.message ? (
                  this.state.message === "Admin update successful" ? (
                    <Alert
                      severity="success"
                      className="col-lg-11"
                      style={{ marginBottom: "20px" }}
                    >
                      <AlertTitle>Success</AlertTitle>
                      {this.state.message}
                    </Alert>
                  ) : (
                    <div className="col-lg-11" style={{ marginBottom: "20px" }}>
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {this.state.message}
                      </Alert>
                    </div>
                  )
                ) : (
                  ""
                )}
                <div style={{ marginBottom: "20px" }} className="col-lg-6">
                  <TextField
                    id="outlined-password-input"
                    label="First Name"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"
                    className="col-lg-10"
                    onChange={(evt) => this.handleCreate(evt, "firstname")}
                    value={this.state.firstname}
                  />
                </div>
                <div style={{ marginBottom: "20px" }} className="col-lg-6">
                  <TextField
                    id="outlined-password-input"
                    label="Last Name"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"
                    className="col-lg-10"
                    onChange={(evt) => this.handleCreate(evt, "lastname")}
                    value={this.state.lastname}
                  />
                </div>
                <div style={{ marginBottom: "20px" }} className="col-lg-6">
                  <TextField
                    id="outlined-password-input"
                    label="Email Address"
                    type="email"
                    autoComplete="current-password"
                    variant="outlined"
                    className="col-lg-10"
                    onChange={(evt) => this.handleCreate(evt, "email")}
                    value={this.state.email}
                  />
                </div>
                <div style={{ marginBottom: "20px" }} className="col-lg-6">
                  <TextField
                    id="outlined-password-input"
                    label="Phone Number"
                    type="text"
                    autoComplete="current-password"
                    variant="outlined"
                    className="col-lg-10"
                    onChange={(evt) => this.handleCreate(evt, "phoneNumber")}
                    value={this.state.phoneNumber}
                  />
                </div>
                <div style={{ marginBottom: "20px" }} className="col-lg-6">
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    className="col-lg-10"
                    onChange={(evt) => this.handleCreate(evt, "password")}
                    value={this.state.password}
                  />
                </div>
                <div style={{ marginBottom: "20px" }} className="col-lg-6">
                  <TextField
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    className="col-lg-10"
                    onChange={(evt) =>
                      this.handleCreate(evt, "confirmPassword")
                    }
                    value={this.state.confirmPassword}
                  />
                </div>
                <div style={{ marginBottom: "20px" }} className="col-lg-6">
                  <UpdateRoles getRolesId={this.getRoleId} />
                </div>
                <div className="col-lg-12">
                  {this.state.loader ? (
                    <Button style={{ background: "#974578", color: "white" }}>
                      <CircularIndeterminate />
                    </Button>
                  ) : (
                    <Button
                      style={{ background: "#974578", color: "white" }}
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>

              <div className="container col-lg-5">
                {this.state.imageLoader ? (
                  <PageLoader />
                ) : (
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroupFileAddon01"
                      >
                        Upload
                      </span>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile01"
                        aria-describedby="inputGroupFileAddon01"
                        onChange={(evt) => this.handleFile(evt, "imageupload")}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "15%",
              }}
            >
              <PageLoader />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AdminUpdate;
