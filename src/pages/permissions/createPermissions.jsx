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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
class CreatePermissions extends Component {
  state = {
    loader: false,
    message: "",
    canRead: true,
    canWrite: true,
    canDelete: true,
    canUpdate: true,
    name: "",
  };

  handleCreate = (evt, attr) => {
    this.setState({
      [attr]: evt.target.value,
    });
  };
  handleCheckPermission = (value, attr) => {
    this.setState({
      [attr]: value,
    });
  };
  handleSubmit = () => {
    this.setState({
      loader: true,
    });
    if (this.state.name === "") {
      this.setState({
        message: "Please fill all empty fields",
        name: "",

        loader: false,
      });
    } else {
      const { name, canDelete, canRead, canUpdate, canWrite } = this.state;
      const getActiveAdmin = JSON.parse(
        localStorage.getItem("persist:adminAuth")
      );
      const userTokens = JSON.parse(getActiveAdmin.adminAuth);
      const tokens = userTokens.adminStatus;

      let url = "https://sandbox.artisana.ng/api/permissions/create";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.token}`,
        },
        body: JSON.stringify({
          name,
          canRead,
          canDelete,
          canUpdate,
          canWrite,
        }),
      }).then((data) => {
        data
          .json()
          .then((data) => {
            this.setState({
              message: "New permission created successful",
              name: "",
              loader: false,
            });
          })
          .catch((error) => {
            this.setState({
              message: error.message,
              name: "",
              loader: false,
            });
          });
      });
    }
  };

  render() {
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
            Create Permissions
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
            <Link to="/permissions">
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
            this.state.message === "New permission created successful" ? (
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

          <div className="row m-0">
            <div style={{ marginBottom: "20px" }} className="col-lg-6">
              <TextField
                id="outlined-password-input"
                label="Permission Name"
                type="text"
                autoComplete="current-password"
                variant="outlined"
                className="col-lg-10"
                onChange={(evt) => this.handleCreate(evt, "name")}
                value={this.state.name}
              />
            </div>
            <div className="col-12" style={{ marginBottom: "20px" }}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Can Read</TableCell>
                      <TableCell align="center">Can Write</TableCell>
                      <TableCell align="center">Can Update</TableCell>
                      <TableCell align="center">Can Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {this.state.name}
                      </TableCell>
                      <TableCell align="center">
                        <input
                          type="checkbox"
                          checked={this.state.canRead}
                          onChange={(evt) =>
                            this.handleCheckPermission(
                              evt.target.checked,
                              "canRead"
                            )
                          }
                        ></input>
                      </TableCell>
                      <TableCell align="center">
                        <input
                          type="checkbox"
                          checked={this.state.canWrite}
                          onChange={(evt) =>
                            this.handleCheckPermission(
                              evt.target.checked,
                              "canWrite"
                            )
                          }
                        ></input>
                      </TableCell>
                      <TableCell align="center">
                        <input
                          type="checkbox"
                          checked={this.state.canUpdate}
                          onChange={(evt) =>
                            this.handleCheckPermission(
                              evt.target.checked,
                              "canUpdate"
                            )
                          }
                        ></input>
                      </TableCell>
                      <TableCell align="center">
                        <input
                          type="checkbox"
                          checked={this.state.canDelete}
                          onChange={(evt) =>
                            this.handleCheckPermission(
                              evt.target.checked,
                              "canDelete"
                            )
                          }
                        ></input>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
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
        </div>
      </div>
    );
  }
}

export default CreatePermissions;
