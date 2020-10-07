import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import AdminPagination from "../admins/admin-pagination";
import Alert from "@material-ui/lab/Alert";
import JobsPagination from "./jobsPagination";
class AllJobs extends Component {
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
    const url = `https://sandbox.artisana.ng/api/jobs/admin/all/?page=${page}&&pageSize=${
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
          console.log(data);
          this.props.sendAllJobs(data);
        });
      })
      .catch((error) => {
        this.props.sendAllJobs("Failed to fetch");
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
    const url = `https://sandbox.artisana.ng/api/jobs/admin/all/?page=${page}&&pageSize=${
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
          this.props.sendAllJobs(data);
          this.setState({
            loader: false,
          });
        });
      })
      .catch((error) => {
        this.props.sendAllJobs("Failed to fetch");
      });
  };

  render() {
    const total = Math.ceil(this.props.allJobs.total / 25);
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allJobs.message ===
        "Session Expired! Login again to continue." ? (
          <div>
            <Alert severity="error">{this.props.allJobs.message}</Alert>
          </div>
        ) : (
          <div>
            {this.props.allJobs === "Failed to fetch" ? (
              <BadNetWork />
            ) : (
              <div>
                <JobsPagination
                  total={total}
                  page={this.state.page}
                  handleChange={this.handleChange}
                  allJobs={this.props.allJobs.items}
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
    sendAllJobs: (sendData) => dispatch({ type: "all_jobs", data: sendData }),
  };
};
const mapStateToProps = ({ allJobs: { allJobs } }) => {
  return {
    allJobs,
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(AllJobs);
