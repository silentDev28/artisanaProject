import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import PaginationControlled from "../../components/pagination/pagination";
import Alert from "@material-ui/lab/Alert";
class Users extends Component {
  state = {
    loader: false,
    page: 0,
    pageSize: 25,
    whereCondition: {},
    filter: {},
  };

  handleRequest = (paginationConfig = this.state) => {
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
    const url = `https://sandbox.artisana.ng/api/artisans/admin/all?page=${page}&&pageSize=${
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
          this.props.sendAllUsers(data);
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.sendAllUsers("Failed to fetch");
      });
  };
  componentDidMount() {
    this.handleRequest();
  }

  handleChange = (value) => {
    this.setState({
      loader: true,
    });
    let page = this.state.page + value;
    this.setState({
      whereCondition: this.state.filter,
    });
    let filter = this.state.whereCondition;

    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    const url = `https://sandbox.artisana.ng/api/artisans/admin/all?page=${page}&&pageSize=${
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
          this.props.sendAllUsers(data);
          this.setState({
            loader: false,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.sendAllUsers("Failed to fetch");
      });
  };
  render() {
    const total = Math.ceil(this.props.allAdminUsers.total / 25);
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allAdminUsers.message ===
        "Session Expired! Login again to continue." ? (
          <div>
            <Alert severity="error">{this.props.allAdminUsers.message}</Alert>
          </div>
        ) : (
          <div>
            {this.props.allAdminUsers === "Failed to fetch" ? (
              <BadNetWork />
            ) : (
              <PaginationControlled
                handleChange={this.handleChange}
                loader={this.state.loader}
                total={total}
                allUsers={this.props.allAdminUsers.items}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ adminUsers: { allAdminUsers } }) => {
  return {
    allAdminUsers,
  };
};
const dispatchStateToProps = (dispatch) => {
  return {
    sendAllUsers: (sendData) =>
      dispatch({ type: "all_admin_users", data: sendData }),
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Users);
