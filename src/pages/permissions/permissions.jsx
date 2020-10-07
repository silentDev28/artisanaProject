import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import PermissionsPagination from "./permissionsPagination";
import Alert from "@material-ui/lab/Alert";
class Permissions extends Component {
  state = {
    page: 0,
    pageSize: 25,
    whereCondition: {},
    filter: {},
    loader: false,
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
    const url = `https://sandbox.artisana.ng/api/permissions?page=${page}&&pageSize=${
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
          this.props.sendAllPermissions(data);
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.sendAllPermissions("Failed to fetch");
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
    const url = `https://sandbox.artisana.ng/api/permissions?page=${page}&&pageSize=${
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
          this.props.sendAllPermissions(data);
          this.setState({
            loader: false,
          });
        });
      })
      .catch((error) => {
        this.props.sendAllPermissions("Failed to fetch");
      });
  };
  render() {
    const total = Math.ceil(this.props.allPermissions.total / 25);
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allPermissions.message ===
        "Session Expired! Login again to continue." ? (
          <div>
            {" "}
            <Alert severity="error">{this.props.allPermissions.message}</Alert>
          </div>
        ) : (
          <div>
            {this.props.allPermissions === "Failed to fetch" ? (
              <BadNetWork />
            ) : (
              <PermissionsPagination
                page={this.state.page}
                allPermissions={this.props.allPermissions.items}
                handleChange={this.handleChange}
                total={total}
                loader={this.state.loader}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ allPermissions: { allPermissions } }) => {
  return {
    allPermissions,
  };
};
const dispatchStateToProps = (dispatch) => {
  return {
    sendAllPermissions: (sendData) =>
      dispatch({ type: "all_permissions", data: sendData }),
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Permissions);
