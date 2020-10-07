import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class ConfirmAlert extends React.Component {
  state = {
    confirmationOption: "No",
  };
  submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            this.props.getOption("Yes", this.props.confirmAttribute),
        },
        {
          label: "No",
          onClick: () =>
            this.props.getOption("No", this.props.confirmAttribute),
        },
      ],
    });
  };

  render() {
    return (
      <div className="container">
        {this.props.confirmAttribute === "update" ? (
          <Button
            className="btn btn-success"
            style={{ color: "white" }}
            onClick={this.submit}
          >
            Update
          </Button>
        ) : (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              className="btn btn-danger"
              style={{ color: "white" }}
              onClick={this.submit}
            >
              delete
            </Button>
          </div>
        )}
      </div>
    );
  }
}
export default ConfirmAlert;
