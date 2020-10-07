import React, { Component } from "react";
import { connect } from "react-redux";
import BadNetWork from "../../components/bad-newtwork/bad-newtwork";

import Alert from "@material-ui/lab/Alert";

import CategoryPagination from "./categoryPagination";
class AllCategory extends Component {
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
    const url = `https://sandbox.artisana.ng/api/category/admin/?page=${page}&&pageSize=${
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
          this.props.sendAllCategory(data);
        });
      })
      .catch((error) => {
        this.props.sendAllCategory("Failed to fetch");
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
    const url = `https://sandbox.artisana.ng/api/category/admin/?page=${page}&&pageSize=${
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
          this.props.sendAllCategory(data);
          this.setState({
            loader: false,
          });
        });
      })
      .catch((error) => {
        this.props.sendAllCategory("Failed to fetch");
      });
  };

  render() {
    const total = Math.ceil(this.props.allCategory.total / 25);
    return (
      <div style={{ marginTop: "20px" }}>
        {this.props.allCategory.message ===
        "Session Expired! Login again to continue." ? (
          <div>
            <Alert severity="error">{this.props.allCategory.message}</Alert>
          </div>
        ) : (
          <div>
            {this.props.allCategory === "Failed to fetch" ? (
              <BadNetWork />
            ) : (
              <div>
                <CategoryPagination
                  total={total}
                  page={this.state.page}
                  handleChange={this.handleChange}
                  allCategory={this.props.allCategory.items}
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
    sendAllCategory: (sendData) =>
      dispatch({ type: "all_category", data: sendData }),
  };
};
const mapStateToProps = ({ allCategory: { allCategory } }) => {
  return {
    allCategory,
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(AllCategory);
