import React, { Component } from "react";
import { MDBBtn, MDBCollapse } from "mdbreact";
import { Button } from "@material-ui/core";
import PermissionsTable from "../permissions/permissionTable";

class AdminPermission extends Component {
  state = {
    collapseID: "",
  };

  toggleCollapse = (collapseID) => () => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
  };

  render() {
    console.log(this.props.adminId);
    return (
      <>
        <Button
          onClick={this.toggleCollapse("basicCollapse")}
          variant="outlined"
        >
          view permission
        </Button>

        <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
          <PermissionsTable
            allPermissions={this.props.adminId.permissions}
            checkRoute={"adminRoute"}
          />
        </MDBCollapse>
      </>
    );
  }
}

export default AdminPermission;
