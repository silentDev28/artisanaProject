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
import AdminPermission from "./admin-permission";
import ConfirmAlert from "../../components/confirmation-alert";
class AdminDetails extends Component {
  state = {
    loader: false,
    id: this.props.match.params.adminDetails,
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    imageUrl: "",
    hasResult: false,
    state: "",
    createdOn: "",
    updatedOn: "",
    updatedBy: "",
    userId: "",
    lastlogin: "",
    country: "",
    active: "",
    locked: "",
    roleData: "",
    confirmationOption: "",
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
        data.json().then((data) => {
          console.log(data);
          const firstname = data.result.firstname;
          const lastname = data.result.lastname;
          const email = data.result.email;
          const phoneNumber = data.result.phoneNumber;
          const address = data.result.address;
          const imageUrl = data.result.imageUrl;

          const state = data.result.state;

          const country = data.result.country;
          const createdOn = data.result.createdOn;

          const updatedOn = data.result.updatedOn;
          const updatedBy = data.result.updatedBy;
          const userId = data.result._id;
          const lastlogin = data.result.lastLogin;
          const active = data.result.isActive;
          const locked = data.result.isLocked;
          this.setState({
            hasResult: data.hasResults,
            firstname,
            lastname,
            email,
            phoneNumber,
            address,
            imageUrl,
            state,
            createdOn,
            updatedOn,
            updatedBy,
            userId,
            country,
            lastlogin,
            active,
            locked,
            roleData: data.result.roleId,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleUpadateForm = (evt, attr) => {
    this.setState({
      [attr]: evt.target.value,
    });
  };
  handleDelete = (id) => {
    this.setState({
      loader: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/admins/delete/${id}`;
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
          window.location.href = "/admins";
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loader: false,
          });
        });
    });
  };
  getOption = (option, confirmAttribute) => {
    this.setState({
      confirmationOption: option,
      confirmAttribute,
    });
  };
  render() {
    console.log(this.state.confirmAttribute);
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
            Admins Details
          </div>
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/admins">
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
            <div
              className="col-lg-12"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "100%",
                }}
              >
                <img
                  src={this.state.imageUrl}
                  alt="imageUrl"
                  style={{
                    borderRadius: "100%",
                    width: "100px",
                    height: "100px",
                  }}
                ></img>
              </div>
            </div>
            <div
              className="col-lg-12"
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            ></div>
            <div className="row m-0" style={{ paddingLeft: "15px" }}>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  First Name
                </span>
                <br></br>
                {this.state.firstname}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Last Name
                </span>
                <br></br>
                {this.state.lastname}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Email Address
                </span>
                <br></br>
                {this.state.email}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Phone Number
                </span>
                <br></br>
                {this.state.phoneNumber}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Address
                </span>
                <br></br>
                {this.state.address ? this.state.address : "N/A"}
              </div>

              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  State
                </span>
                <br></br>
                {this.state.state ? this.state.state : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Country
                </span>
                <br></br>
                {this.state.country ? this.state.country : "N/A"}
              </div>

              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Updated On
                </span>
                <br></br>
                {this.state.updatedOn ? this.state.updatedOn : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Updated By
                </span>
                <br></br>
                {this.state.updatedBy ? this.state.updatedBy : "N/A"}
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
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Last Login
                </span>
                <br></br>
                {this.state.lastlogin ? getDate(this.state.lastlogin) : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Active
                </span>
                <br></br>
                {this.state.active ? (
                  <CheckIcon style={{ color: "green" }} />
                ) : (
                  <CheckIcon style={{ color: "red" }} />
                )}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Locked
                </span>
                <br></br>
                {this.state.locked ? (
                  <LockIcon style={{ color: "green" }} />
                ) : (
                  <LockOpenIcon style={{ color: "red" }} />
                )}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Role Name
                </span>

                <br></br>
                {this.state.roleData
                  ? this.state.roleData.name
                  : "Roles not available"}
              </div>
              <div
                className="col-12"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                {this.state.roleData ? (
                  <AdminPermission adminId={this.state.roleData} />
                ) : (
                  ""
                )}
              </div>
              <div
                className="col-lg-12"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <div className="row">
                  <div className="col-6">
                    {this.state.confirmationOption === "Yes" ? (
                      <div>
                        {this.state.confirmAttribute === "update" ? (
                          <Link to={"/admins/update/" + this.state.userId}>
                            <Button
                              style={{ color: "white" }}
                              className="btn btn-success"
                            >
                              Update admin
                            </Button>
                          </Link>
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
                    style={{ justifyContent: "flex-end", display: "flex" }}
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
                                className="btn btn-danger"
                                onClick={() => this.handleDelete(this.state.id)}
                              >
                                Delete admin
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

export default AdminDetails;
