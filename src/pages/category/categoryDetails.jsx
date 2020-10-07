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
import ConfirmAlert from "../../components/confirmation-alert";

class CategoryDetails extends Component {
  state = {
    loader: false,
    id: this.props.match.params.categoryDetails,

    hasResult: false,
  };
  componentDidMount() {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/category/${this.state.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data.json().then((data) => {
          console.log(data);
          const imageUrl = data.result.imageUrl;
          const createdBy = data.result.createdBy;
          const createdOn = data.result.createdOn;
          const isActive = data.result.isActive;
          const name = data.result.name;
          this.setState({
            hasResult: data.hasResults,
            imageUrl,
            createdBy,
            createdOn,
            createdBy,
            isActive,
            name,
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
    const url = `https://sandbox.artisana.ng/api/category/delete/${id}`;
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
          window.location.href = "/category";
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loader: false,
          });
        });
    });
  };
  handleDeactivate = () => {
    this.setState({
      loaderA: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;

    let url = `https://sandbox.artisana.ng/api/category/deactivate/${this.state.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data.json().then((data) => {
        this.setState({
          loaderA: false,
        });
        window.location.href = "/category/" + this.state.id;
      });
    });
  };
  handleActivate = () => {
    this.setState({
      loaderA: true,
    });
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;

    let url = `https://sandbox.artisana.ng/api/category/activate/${this.state.id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
    }).then((data) => {
      data.json().then((data) => {
        this.setState({
          loaderA: false,
        });
        window.location.href = "/category/" + this.state.id;
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
            Category Details
          </div>
          <div
            className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link to="/category">
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
                  Name
                </span>
                <br></br>
                {this.state.name}
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
                  CreatedBy
                </span>
                <br></br>
                {this.state.createdBy}
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
                  Activation Settings
                </span>
                <br></br>
                {this.state.loaderA ? (
                  <Button style={{ background: "#974578", color: "white" }}>
                    Loading...
                  </Button>
                ) : (
                  <div>
                    {this.state.isActive ? (
                      <Button
                        style={{ color: "white" }}
                        onClick={this.handleDeactivate}
                        className="btn btn-danger"
                      >
                        Deactivate Category
                      </Button>
                    ) : (
                      <Button
                        style={{ color: "white" }}
                        onClick={this.handleActivate}
                        className="btn btn-success"
                      >
                        Activate Category
                      </Button>
                    )}
                  </div>
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
                          <Link to={"/category/update/" + this.state.id}>
                            <Button
                              style={{ color: "white" }}
                              className="btn btn-success"
                            >
                              Update category
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
                                onClick={() => this.handleDelete(this.state.id)}
                                className="btn btn-danger"
                              >
                                Delete
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

export default CategoryDetails;
