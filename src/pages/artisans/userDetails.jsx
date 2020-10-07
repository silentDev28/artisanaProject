import React, { Component } from "react";
import ListsUsers from "../../components/lists-users/list-users";
import PageLoader from "../../components/loader/pageLoader";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import { getDate } from "../../components/time-date-converter/time-date-converter";
import { Button } from "@material-ui/core";
class UserDetails extends Component {
  state = {
    id: this.props.match.params.userDetails,
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
    businessName: "",
    country: "",
    rating: "",
    reviews: "",
    RCNumber: "",
    loader: false,
    loader2: false,
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/artisans/${this.state.id}`;
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
          const specialization = data.result.specialization;
          const imageUrl = data.result.imageUrl;
          const nickname = data.result.nickname;
          const NIN = data.result.NIN;
          const state = data.result.state;
          const businessName = data.result.businessName;
          const country = data.result.country;
          const createdOn = data.result.createdOn;
          const rating = data.result.rating;
          const reviews = data.result.reviews;
          const updatedOn = data.result.updatedOn;
          const updatedBy = data.result.updatedBy;
          const userId = data.result.userId;
          const RCNumber = data.result.RCNumber;
          const isEmailVerified = data.result.isEmailVerified;
          const hasOnBoarded = data.result.hasOnBoarded;
          const isLocked = data.result.isLocked;
          const userType = data.result.userType;
          const categoryName = data.result.categoryId.name;
          const categoryId = data.result.categoryId._id;
          const isActive = data.result.isActive;
          this.setState({
            hasResult: data.hasResults,
            firstname,
            lastname,
            email,
            phoneNumber,
            address,
            specialization,
            imageUrl,
            nickname,
            NIN,
            state,
            createdOn,
            updatedOn,
            updatedBy,
            userId,
            businessName,
            country,
            rating,
            reviews,
            RCNumber,
            isEmailVerified,
            isLocked,
            hasOnBoarded,
            userType,
            categoryName,
            categoryId,
            isActive,
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
  handleDeactivate = () => {
    this.setState({
      loader: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;

    let url = `https://sandbox.artisana.ng/api/artisans/deactivate/${this.state.id}`;
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
        window.location.href = "/artisans/" + this.state.id;
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

    let url = `https://sandbox.artisana.ng/api/artisans/activate/${this.state.id}`;
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
        window.location.href = "/artisans/" + this.state.id;
      });
    });
  };
  handleUnlock = () => {
    this.setState({
      loader2: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;

    let url = `https://sandbox.artisana.ng/api/artisans/unlockAccount/${this.state.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data.json().then((data) => {
        this.setState({
          loader2: false,
        });
        window.location.href = "/artisans/" + this.state.id;
      });
    });
  };
  render() {
    const getActiveRoute = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const currentRoute = JSON.parse(getActiveRoute.currentRoute);
    const id = this.props.match.params.userDetails;
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
                Artisan Details
              </div>
              <div
                className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#974578",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link to={currentRoute.currentRoute}>
                  <Button variant="outlined" style={{ color: "#974578" }}>
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
                {this.state.address}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Business Name
                </span>
                <br></br>
                {this.state.businessName}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Email Verified
                </span>
                <br></br>
                {this.state.isEmailVerified ? (
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
                  National identification Number
                </span>
                <br></br>
                {this.state.NIN ? this.state.NIN : "N/A"}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Registration Number
                </span>
                <br></br>
                {this.state.RCNumber ? this.state.RCNumber : "N/A"}
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
                  Rating
                </span>
                <br></br>
                {this.state.rating}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Reviews
                </span>
                <br></br>
                {this.state.reviews}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  On Boarded
                </span>
                <br></br>
                {this.state.hasOnBoarded ? (
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
                  Lock Status
                </span>
                <br></br>
                {this.state.isLocked ? (
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
                  User Type
                </span>
                <br></br>
                {this.state.userType}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Category
                </span>
                <br></br>
                <Button variant="outlined">{this.state.categoryName}</Button>
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
                        style={{ background: "red", color: "white" }}
                        onClick={this.handleDeactivate}
                      >
                        Deactivate User
                      </Button>
                    ) : (
                      <Button
                        style={{ background: "green", color: "white" }}
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
                {this.state.loader2 ? (
                  <Button style={{ background: "#974578", color: "white" }}>
                    Loading...
                  </Button>
                ) : (
                  <div>
                    {this.state.isLocked ? (
                      ""
                    ) : (
                      <Button
                        style={{ background: "green", color: "white" }}
                        onClick={this.handleUnlock}
                      >
                        Unlock User
                      </Button>
                    )}
                  </div>
                )}
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
