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
import { connect } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
class RequestDetails extends Component {
  state = {
    loader: false,
    id: this.props.match.params.requestDetails,

    hasResult: false,
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/requests/${this.state.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data.json().then((data) => {
          console.log(data);
          const artisanId = data.result.artisanId;
          const createdBy = data.result.createdBy;
          const createdOn = data.result.createdOn;
          const jobTitle = data.result.jobId.title;
          const jobDescription = data.result.jobId.description;
          const jobPhoneNumber = data.result.phoneNumber;
          const status = data.result.status;
          const updatedBy = data.result.updatedBy;
          const userId = data.result.userId._id;

          this.setState({
            hasResult: data.hasResults,
            artisanId,
            createdOn,
            createdBy,
            jobTitle,
            jobPhoneNumber,
            jobDescription,
            status,
            updatedBy,
            userId,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //   handleUpadateForm = (evt, attr) => {
  //     this.setState({
  //       [attr]: evt.target.value,
  //     });
  //   };
  //   handleDelete = (id) => {
  //     this.setState({
  //       loader: true,
  //     });
  //     const getActiveAdmin = JSON.parse(
  //       localStorage.getItem("persist:adminAuth")
  //     );
  //     const userTokens = JSON.parse(getActiveAdmin.adminAuth);
  //     const tokens = userTokens.adminStatus;
  //     const url = `https://sandbox.artisana.ng/api/category/delete/${id}`;
  //     fetch(url, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${tokens.token}`,
  //       },
  //     }).then((data) => {
  //       data
  //         .json()
  //         .then((data) => {
  //           console.log(data);
  //           this.setState({
  //             loader: false,
  //           });
  //           window.location.href = "/category";
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           this.setState({
  //             loader: false,
  //           });
  //         });
  //     });
  //   };
  //   handleDeactivate = () => {
  //     this.setState({
  //       loaderA: true,
  //     });
  //     const getActiveAdmin = JSON.parse(
  //       localStorage.getItem("persist:adminAuth")
  //     );
  //     const userTokens = JSON.parse(getActiveAdmin.adminAuth);
  //     const tokens = userTokens.adminStatus;

  //     let url = `https://sandbox.artisana.ng/api/category/deactivate/${this.state.id}`;
  //     fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${tokens.token}`,
  //       },
  //     }).then((data) => {
  //       data.json().then((data) => {
  //         this.setState({
  //           loaderA: false,
  //         });
  //         window.location.href = "/category/" + this.state.id;
  //       });
  //     });
  //   };
  //   handleActivate = () => {
  //     this.setState({
  //       loaderA: true,
  //     });
  //     const getActiveAdmin = JSON.parse(
  //       localStorage.getItem("persist:adminAuth")
  //     );
  //     const userTokens = JSON.parse(getActiveAdmin.adminAuth);
  //     const tokens = userTokens.adminStatus;

  //     let url = `https://sandbox.artisana.ng/api/category/activate/${this.state.id}`;
  //     fetch(url, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${tokens.token}`,
  //       },
  //     }).then((data) => {
  //       data.json().then((data) => {
  //         this.setState({
  //           loaderA: false,
  //         });
  //         window.location.href = "/category/" + this.state.id;
  //       });
  //     });
  //   };

  handleSendRoute = (userId) => {
    this.props.sendRoutes("/request/" + this.state.id);
  };
  handleSendArtisanRoute = () => {
    this.props.sendRoutes("/request/" + this.state.id);
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
            Request Details
          </div>
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/request">
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
            {/* <div
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
            </div> */}
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
                  Job Title
                </span>
                <br></br>
                {this.state.jobTitle}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Job Description
                </span>
                <br></br>
                {this.state.jobDescription}
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
                  Created On
                </span>
                <br></br>
                {getDate(this.state.createdOn)}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Request Status
                </span>
                <br></br>
                {this.state.status}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  User Details
                </span>
                <br></br>
                <Link to={"/users/" + this.state.userId}>
                  <Button
                    variant="outlined"
                    onClick={() => this.handleSendRoute(this.state.userId)}
                  >
                    View user{" "}
                    <VisibilityIcon
                      style={{ color: "green", marginLeft: "5px" }}
                    />
                  </Button>
                </Link>
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Artisan Details
                </span>
                <br></br>
                {this.state.artisanId ? (
                  <Link to={"/artisans/" + this.state.artisanId}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        this.handleSendArtisanRoute(this.state.artisanId)
                      }
                    >
                      View Artisan{" "}
                      <VisibilityIcon
                        style={{ color: "green", marginLeft: "5px" }}
                      />
                    </Button>
                  </Link>
                ) : (
                  "N/A"
                )}
              </div>
              <div
                className="col-lg-4"
                style={{ marginBottom: "20px", fontWeight: "bold" }}
              >
                <span style={{ fontWeight: "bold", color: "#974578" }}>
                  Updated By
                </span>
                <br></br>
                {this.state.updatedBy ? (
                  <Link to={"/artisans/" + this.state.artisanId}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        this.handleSendArtisanRoute(this.state.updatedBy)
                      }
                    >
                      View Artisan{" "}
                      <VisibilityIcon
                        style={{ color: "orange", marginLeft: "5px" }}
                      />
                    </Button>
                  </Link>
                ) : (
                  "N/A"
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
const dispatchStateToProps = (dispatch) => {
  return {
    sendRoutes: (sendData) =>
      dispatch({ type: "send_current_route", data: sendData }),
  };
};
export default connect(null, dispatchStateToProps)(RequestDetails);
