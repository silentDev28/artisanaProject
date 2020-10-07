import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import AdminPagination from "../admins/admin-pagination";
import Alert from "@material-ui/lab/Alert";
class Admins extends Component {
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
    const url = `https://sandbox.artisana.ng/api/admins/?page=${page}&&pageSize=${
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
          this.props.sendAllAdmins(data);
        });
      })
      .catch((error) => {
        this.props.sendAllAdmins("Failed to fetch");
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
    const url = `https://sandbox.artisana.ng/api/admins/?page=${page}&&pageSize=${
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
          this.props.sendAllAdmins(data);
          this.setState({
            loader: false,
          });
        });
      })
      .catch((error) => {
        this.props.sendAllAdmins("Failed to fetch");
      });
  };

  render() {
    console.log(this.props.allAdmins.items);

    const total = Math.ceil(this.props.allAdmins.total / 25);
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allAdmins.message ===
        "Session Expired! Login again to continue." ? (
          <div>
            <Alert severity="error">{this.props.allAdmins.message}</Alert>
          </div>
        ) : (
          <div>
            {this.props.allAdmins === "Failed to fetch" ? (
              <BadNetWork />
            ) : (
              <div>
                <AdminPagination
                  total={total}
                  page={this.state.page}
                  handleChange={this.handleChange}
                  allAdmins={this.props.allAdmins.items}
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
    sendAllAdmins: (sendData) =>
      dispatch({ type: "all_admins", data: sendData }),
  };
};
const mapStateToProps = ({ allAdmins: { allAdmins } }) => {
  return {
    allAdmins,
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Admins);
