import { Pages } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";
import PaginationControlled from "../../components/pagination/pagination";
import RolesPagination from "./rolesPagination";
import Alert from "@material-ui/lab/Alert";
class Roles extends Component {
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
    const url = `https://sandbox.artisana.ng/api/roles?page=${page}&&pageSize=${
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
          this.props.sendAllRoles(data);
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.sendAllRoles("Failed to fetch");
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
    const url = `https://sandbox.artisana.ng/api/roles?page=${page}&&pageSize=${
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
          this.props.sendAllRoles(data);
          this.setState({
            loader: false,
          });
        });
      })
      .catch((error) => {
        console.log(error);
        this.props.sendAllRoles("Failed to fetch");
      });
  };
  render() {
    const total = Math.ceil(this.props.allRoles.total / 25);
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allRoles.message ===
        "Session Expired! Login again to continue." ? (
          <div>
            <Alert severity="error">{this.props.allRoles.message}</Alert>
          </div>
        ) : (
          <div>
            {this.props.allRoles === "Failed to fetch" ? (
              <BadNetWork />
            ) : (
              <RolesPagination
                allRoles={this.props.allRoles.items}
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
const mapStateToProps = ({ totalRoles: { allRoles } }) => {
  return {
    allRoles,
  };
};
const dispatchStateToProps = (dispatch) => {
  return {
    sendAllRoles: (sendData) => dispatch({ type: "all_roles", data: sendData }),
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Roles);
