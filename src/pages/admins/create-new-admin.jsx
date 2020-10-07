import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import PageLoader from "../../components/loader/pageLoader";
import CircularIndeterminate from "../../components/loader/loader";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
class CreateNewAdmin extends Component {
  state = {
    loader: false,
    message: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    roleId: "",
    totalRoles: "",
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/roles`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data.json().then((data) => {
        if (data.hasErrors) {
          return this.setState({
            totalRoles: "",
          });
        } else {
          this.setState({
            totalRoles: data.items,
          });
        }
      });
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
        loader: true,
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
              loader: false,
            });
          })
          .catch((error) => {
            this.setState({
              message: error.message,
              imageUrl: "",
              loader: false,
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
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        loader: false,
      });
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        message: "Password does not match",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        loader: false,
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        message: "Your password must be atleast 6 characters",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        loader: false,
      });
    } else {
      const {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
        imageUrl,

        phoneNumber,
      } = this.state;
      const getActiveAdmin = JSON.parse(
        localStorage.getItem("persist:adminAuth")
      );
      const userTokens = JSON.parse(getActiveAdmin.adminAuth);
      const tokens = userTokens.adminStatus;

      let url = "https://sandbox.artisana.ng/api/admins/create";
      fetch(url, {
        method: "POST",
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
        data.json().then((data) => {
          if (data.hasErrors) {
            this.setState({
              message: data.message,
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
              imageUrl: "",
              loader: false,
            });
          } else {
            this.setState({
              message: "Admin registration successful",
              firstname: "",
              lastname: "",
              email: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
              imageUrl: "",
              loader: false,
            });
          }
        });
      });
    }
  };
  handleRoles = (attr, value) => {
    this.setState({
      roleId: value,
    });
  };

  render() {
    const getAllRoles = this.state.totalRoles ? (
      this.state.totalRoles.map((role) => (
        <option value={role._id} key={role._id}>
          {role.name}
        </option>
      ))
    ) : (
      <div>Loading...</div>
    );
    return (
      <div style={{ marginTop: "20px" }}>
        <div className="row">
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#974578",
            }}
          >
            Create Admin
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
            <Link to="/admins">
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
        <div style={{ marginTop: "100px" }}>
          {this.state.message ? (
            this.state.message === "Admin registration successful" ? (
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
          {this.state.imageUrl ? (
            <div className="row m-0">
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
                  onChange={(evt) => this.handleCreate(evt, "confirmPassword")}
                  value={this.state.confirmPassword}
                />
              </div>
              <div style={{ marginBottom: "20px" }} className="col-lg-6">
                <FormControl variant="outlined" className="col-10">
                  <InputLabel>Select roles</InputLabel>
                  <Select
                    native
                    value={this.state.roleId}
                    label="Select roles"
                    onChange={(evt) =>
                      this.handleRoles("roleId", evt.target.value)
                    }
                  >
                    <option aria-label="None" value="" />
                    {getAllRoles}
                  </Select>
                </FormControl>
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
          ) : (
            <div className="container col-lg-5">
              {this.state.loader ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <PageLoader />
                  </div>
                </div>
              ) : (
                <div>
                  <h6
                    className="col-lg-12"
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#974578",
                    }}
                  >
                    Upload and image
                  </h6>
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
                        value={this.state.imageUrl}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CreateNewAdmin;
