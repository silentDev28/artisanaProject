import React, { Component } from "react";
import ListsUsers from "../../components/lists-users/list-users";
import PageLoader from "../../components/loader/pageLoader";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { getDate } from "../../components/time-date-converter/time-date-converter";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
class UserDetails extends Component {
  state = {
    id: this.props.match.params.userId,
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    address: "",
    specialization: "",
    imageUrl: "",
    nickname: "",
    hasResult: false,
    NIN: "",
    state: "",
    createdOn: "",
    updatedOn: "",
    updatedBy: "",
    userId: "",
    lastlogin: "",
    loginTime: "",
    isActive: "",
    contry: "",
    loader: false,
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/users/${this.state.id}`;
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

          const createdOn = data.result.createdOn;

          const updatedOn = data.result.updatedOn;
          const updatedBy = data.result.updatedBy;
          const userId = data.result._id;
          const lastlogin = data.result.lastLogin;
          const loginTime = data.result.loginTime;
          const isActive = data.result.isActive;
          const country = data.result.country;
          const createdBy = data.result.createdBy;
          const hasOnboarded = data.result.hasOnboarded;
          const rating = data.result.rating;
          const reviews = data.result.reviews;
          const userType = data.result.userType;
          const emailVerification = data.result.isEmailVerified;
          this.setState({
            hasResult: data.hasResults,
            firstname,
            lastname,
            email,
            phoneNumber,
            country,
            imageUrl,
            address,
            state,
            createdOn,
            updatedOn,
            updatedBy,
            userId,
            lastlogin,
            loginTime,
            isActive,
            createdBy,
            hasOnboarded,
            rating,
            reviews,
            userType,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleDeactivate = () => {
    this.setState({
      loader: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;

    let url = `https://sandbox.artisana.ng/api/users/deactivate/${this.state.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data.json().then((data) => {
        this.setState({
          loader: false,
        });
        window.location.href = "/users/" + this.state.id;
      });
    });
  };
  handleActivate = () => {
    this.setState({
      loader: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;

    let url = `https://sandbox.artisana.ng/api/users/activate/${this.state.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data.json().then((data) => {
        this.setState({
          loader: false,
        });
        window.location.href = "/users/" + this.state.id;
      });
    });
  };
  render() {
    const getActiveRoute = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const currentRoute = JSON.parse(getActiveRoute.currentRoute);

    return (
      <div>
        {this.state.hasResult ? (
          <div style={{ marginTop: "30px" }}>
            <div className="row m-0">
              <div
                className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#974578",
                }}
              >
                User Details
              </div>
              <div
                className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link to={currentRoute.currentRoute}>
                  <Button
                    variant="outlined"
                    style={{ color: "#974578", marginRight: "10px" }}
                  >
                    Back
                  </Button>
                </Link>
              </div>
            </div>
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
                {this.state.phoneNumber ? this.state.phoneNumber : "N/A"}
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
                  Active
                </span>
                <br></br>
                {this.state.isActive ? (
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
                  Login Time
                </span>
                <br></br>
                {this.state.loginTime ? getDate(this.state.loginTime) : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Onboarded
                </span>
                <br></br>
                {this.state.hasOnboarded ? (
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
                  Reviews
                </span>
                <br></br>
                {this.state.reviews ? this.state.reviews : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Rating
                </span>
                <br></br>
                {this.state.rating ? this.state.rating : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  User Type
                </span>
                <br></br>
                {this.state.userType ? this.state.userType : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Email Verification Status
                </span>
                <br></br>
                {this.state.emailVerification ? (
                  <CheckIcon style={{ color: "green" }} />
                ) : (
                  <CheckIcon style={{ color: "red" }} />
                )}
              </div>
            </div>

            <div className="row container">
              <div className="col-lg-6" style={{ paddingLeft: "30px" }}>
                {this.state.loader ? (
                  <Button style={{ background: "#974578", color: "white" }}>
                    Loading...
                  </Button>
                ) : (
                  <div>
                    {this.state.isActive ? (
                      <Button
                        className="btn btn-danger"
                        style={{ color: "white" }}
                        onClick={this.handleDeactivate}
                      >
                        Deactivate User
                      </Button>
                    ) : (
                      <Button
                        style={{ color: "white" }}
                        className="btn btn-success"
                        onClick={this.handleActivate}
                      >
                        Activate User
                      </Button>
                    )}
                  </div>
                )}
              </div>
              <div
                className="col-lg-6"
                style={{
                  paddingRight: "30px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button style={{ background: "green", color: "white" }}>
                  Unlock User
                </Button>
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

export default UserDetails;
