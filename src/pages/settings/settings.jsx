import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import ForgetPassword from "./forgetPassword";
import { getDate } from "../../components/time-date-converter/time-date-converter";
import ChangePassword from "../../pages/settings/changePassword";
import ResetPassword from "./resetPassword";
function Settings() {
  const adminAuth = useSelector((state) => state.adminAuth);
  const getAdminDetails = adminAuth.adminStatus;
  const UserDetails = getAdminDetails.user;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <div
        className="row m-0"
        style={{ paddingLeft: "30px", paddingTop: "10px" }}
      >
        <div
          className="col-lg-12 col-md-12 col-xs-12 col-sm-12 col-12"
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#974578",
          }}
        >
          Settings
        </div>
        <div className="col-lg-9 col-md-9 col-12">
          <div className="row">
            <div
              className="col-12"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "50px",
                marginTop: "30px",
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={UserDetails.imageUrl}
                className={classes.large}
              />
            </div>
            <div className="col-6">
              <TextField
                id="outlined-basic"
                label="First name"
                variant="outlined"
                className="col-12"
                disabled
                value={UserDetails.firstname}
              />
            </div>
            <div className="col-6">
              <TextField
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                className="col-12"
                disabled
                value={UserDetails.lastname}
              />
            </div>
            <div className="col-6" style={{ marginTop: "20px" }}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className="col-12"
                disabled
                value={UserDetails.email}
              />
            </div>
            <div className="col-6" style={{ marginTop: "20px" }}>
              <TextField
                id="outlined-basic"
                label="Last login"
                variant="outlined"
                className="col-12"
                disabled
                value={getDate(UserDetails.lastLogin)}
              />
            </div>
          </div>
        </div>
        <div
          className="col-lg-3 col-md-3 col-12"
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="row">
            <div className="col-12">
              <ForgetPassword email={UserDetails.email} />
              <ChangePassword adminData={UserDetails} />
              <ResetPassword adminData={UserDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
