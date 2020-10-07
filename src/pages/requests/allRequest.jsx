import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";

import Alert from "@material-ui/lab/Alert";

import RequestPagination from "./requestPagination";
class AllRequest extends Component {
  state = {
    loader: false,
    page: 0,
    pageSize: 25,
    whereCondition: {},
    filter: {},
  };
  handleRequest = (paginationConfig = this.state, value) => {
    let page = paginationConfig.page + 1;

    this.setState({
      whereCondition: this.state.filter,
    });
    let filter = paginationConfig.whereCondition;

    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/requests/admin/all/?page=${page}&&pageSize=${
      paginationConfig.pageSize
    }&&whereCondition=${JSON.stringify(filter)}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data.json().then((data) => {
          this.props.sendAllRequest(data);
        });
      })
      .catch((error) => {
        this.props.sendAllRequest("Failed to fetch");
      });
  };
  componentDidMount() {
    this.handleRequest();
  }
  handleChange = (value) => {
    // console.log(value);
    this.setState({
      loader: true,
    });
    let page = this.state.page + value;
    console.log(page);
    this.setState({
      whereCondition: this.state.filter,
    });
    let filter = this.state.whereCondition;

    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/requests/admin/all/?page=${page}&&pageSize=${
      this.state.pageSize
    }&&whereCondition=${JSON.stringify(filter)}`;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokens.token}`,
      },
    })
      .then((data) => {
        data.json().then((data) => {
          this.props.sendAllRequest(data);
          this.setState({
            loader: false,
          });
        });
      })
      .catch((error) => {
        this.props.sendAllRequest("Failed to fetch");
      });
  };

  render() {
    console.log(this.props.allRequest);
    const total = Math.ceil(this.props.allRequest.total / 25);
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allRequest.message ===
        "Session Expired! Login again to continue." ? (
          <div>
            <Alert severity="error">{this.props.allRequest.message}</Alert>
          </div>
        ) : (
          <div>
            {this.props.allRequest === "Failed to fetch" ? (
              <BadNetWork />
            ) : (
              <div>
                <RequestPagination
                  total={total}
                  page={this.state.page}
                  handleChange={this.handleChange}
                  allRequest={this.props.allRequest.items}
                  pageUpdate={this.handleRequest}
                  loader={this.state.loader}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
const dispatchStateToProps = (dispatch) => {
  return {
    sendAllRequest: (sendData) =>
      dispatch({ type: "all_Request", data: sendData }),
  };
};
const mapStateToProps = ({ allRequest: { allRequest } }) => {
  return {
    allRequest,
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(AllRequest);
