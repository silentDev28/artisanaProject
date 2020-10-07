import React, { Component } from "react";
import ListsUsers from "../../components/lists-users/list-users";
import PageLoader from "../../components/loader/pageLoader";
import CheckIcon from "@material-ui/icons/Check";
import { getDate } from "../../components/time-date-converter/time-date-converter";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import CircularIndeterminate from "../../components/loader/loader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import ConfirmAlert from "../../components/confirmation-alert";
class RolesDetails extends Component {
  state = {
    loader: false,
    id: this.props.match.params.roleDetails,
    name: "",
    createdOn: "",
    createdBy: "",
    permissions: "",
    hasResult: "",
    message: "",
    uloader: false,
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/roles/${this.state.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data.json().then((data) => {
          console.log(data);

          const createdOn = data.result.createdOn;
          const permissions = data.result.permissions;

          const createdBy = data.result.createdBy;
          const name = data.result.name;
          const hasResult = data.hasResults;
          this.setState({
            createdOn,
            createdBy,
            name,
            permissions,
            hasResult,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (id) => {
    this.setState({
      loader: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/roles/delete/${id}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data
        .json()
        .then((data) => {
          console.log(data);
          this.setState({
            loader: false,
          });
          window.location.href = "/roles";
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loader: false,
          });
        });
    });
  };
  handleCheckPermission = (name, value, attr) => {
    // console.log(name, value);
    const getInitialPermissions = this.state.permissions.find(
      (role) => role.name === name
    );
    console.log(getInitialPermissions);
    if (getInitialPermissions) {
      const updatePermission = this.state.permissions.map((role) => {
        return role.name === name
          ? (role.canDelete === false ||
              role.canUpdate === false ||
              role.canWrite === false) &&
            role.canRead === false
            ? { ...role, [attr]: value, canRead: true }
            : { ...role, [attr]: value }
          : role;
      });

      this.setState({
        permissions: updatePermission,
      });
    }
  };
  handleRoleName = (value, attr) => {
    this.setState({
      [attr]: value,
    });
  };
  handleUpdate = () => {
    this.setState({
      uloader: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;

    let url = `https://sandbox.artisana.ng/api/roles/update/${this.state.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
      body: JSON.stringify({
        name: this.state.name,
        permissions: this.state.permissions,
      }),
    }).then((data) => {
      data
        .json()
        .then((data) => {
          this.setState({
            message: "Role update successful",

            uloader: false,
          });
        })
        .catch((error) => {
          this.setState({
            message: error.message,

            uloader: false,
          });
        });
    });
  };
  handleCheckAllPermission = (value) => {
    const totPermission = this.state.permissions.map((role) => {
      return {
        name: role.name,
        canRead: value,
        canWrite: value,
        canDelete: value,
        canUpdate: value,
      };
    });
    this.setState({
      permissions: totPermission,
    });
  };
  getOption = (option, confirmAttribute) => {
    this.setState({
      confirmationOption: option,
      confirmAttribute,
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
            Role Details
          </div>
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/roles">
              <Button
                variant="outlined"
                style={{ color: "#974578", marginRight: "10px" }}
              >
                Back
              </Button>
            </Link>
          </div>
        </div>

        {this.state.hasResult ? (
          <div style={{ marginTop: "30px" }}>
            <div className="row m-0" style={{ paddingLeft: "15px" }}>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <TextField
                  id="outlined-password-input"
                  label="Name"
                  type="text"
                  autoComplete="current-password"
                  variant="outlined"
                  className="col-lg-10"
                  onChange={(evt) =>
                    this.handleRoleName(evt.target.value, "name")
                  }
                  value={this.state.name ? this.state.name : "N/A"}
                />
              </div>

              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Created By
                </span>
                <br></br>
                {this.state.createdBy ? this.state.createdBy : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Created On
                </span>
                <br></br>
                {this.state.createdOn ? getDate(this.state.createdOn) : "N/A"}
              </div>
              <div className="col-12" style={{ marginBottom: "10px" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: "5px",
                    marginTop: "-5px",
                  }}
                >
                  Check all
                </span>{" "}
                <input
                  type="checkbox"
                  onChange={(evt) =>
                    this.handleCheckAllPermission(evt.target.checked)
                  }
                ></input>
              </div>
              <div className="col-12" style={{ marginBottom: "20px" }}>
                {this.state.permissions ? (
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
                        {this.state.permissions.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="center">
                              <input
                                type="checkbox"
                                checked={row.canRead}
                                onChange={(evt) =>
                                  this.handleCheckPermission(
                                    row.name,
                                    evt.target.checked,
                                    "canRead"
                                  )
                                }
                              ></input>
                            </TableCell>
                            <TableCell align="center">
                              <input
                                type="checkbox"
                                checked={row.canWrite}
                                onChange={(evt) =>
                                  this.handleCheckPermission(
                                    row.name,
                                    evt.target.checked,
                                    "canWrite"
                                  )
                                }
                              ></input>
                            </TableCell>
                            <TableCell align="center">
                              <input
                                type="checkbox"
                                checked={row.canUpdate}
                                onChange={(evt) =>
                                  this.handleCheckPermission(
                                    row.name,
                                    evt.target.checked,
                                    "canUpdate"
                                  )
                                }
                              ></input>
                            </TableCell>
                            <TableCell align="center">
                              <input
                                type="checkbox"
                                checked={row.canDelete}
                                onChange={(evt) =>
                                  this.handleCheckPermission(
                                    row.name,
                                    evt.target.checked,
                                    "canDelete"
                                  )
                                }
                              ></input>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  ""
                )}
              </div>
              <div
                className="col-lg-12"
                style={{
                  marginBottom: "20px",
                }}
              >
                {this.state.message ? (
                  <div>
                    {this.state.message === "Role update successful" ? (
                      <Alert severity="success">{this.state.message}</Alert>
                    ) : (
                      <Alert severity="error">{this.state.message}</Alert>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className="col-12"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <div className="row">
                  <div className="col-6">
                    {this.state.confirmationOption === "Yes" ? (
                      <div>
                        {this.state.confirmAttribute === "update" ? (
                          <div>
                            {this.state.uloader ? (
                              <Button
                                style={{
                                  background: "#974578",
                                  color: "white",
                                }}
                              >
                                <CircularIndeterminate />
                              </Button>
                            ) : (
                              <Button
                                style={{ color: "white" }}
                                onClick={this.handleUpdate}
                                className="btn btn-success"
                              >
                                Update role
                              </Button>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <ConfirmAlert
                        getOption={this.getOption}
                        confirmAttribute={"update"}
                      />
                    )}
                  </div>
                  <div
                    className="col-6"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {this.state.confirmationOption === "Yes" ? (
                      <div>
                        {this.state.confirmAttribute === "delete" ? (
                          <div>
                            {this.state.loader ? (
                              <Button
                                style={{
                                  background: "#974578",
                                  color: "white",
                                }}
                              >
                                <CircularIndeterminate />
                              </Button>
                            ) : (
                              <Button
                                style={{ color: "white" }}
                                onClick={() => this.handleDelete(this.state.id)}
                                className="btn btn-danger"
                              >
                                Delete role
                              </Button>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ) : (
                      <ConfirmAlert
                        getOption={this.getOption}
                        confirmAttribute={"delete"}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "20%" }}>
            <div style={{ justifyContent: "center", display: "flex" }}>
              <PageLoader />
            </div>
            <div
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "18px",
                marginTop: "5px",
                color: "#974578",
              }}
            >
              Loading...
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RolesDetails;
