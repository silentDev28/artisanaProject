import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationDrawer from "./notification-drawer/notification-drawer";
import ProfileDropDown from "./profile-dropdown/profile";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar({ adminStatus }) {
  const classes = useStyles();
  // const getTokens = JSON.parse(localStorage.getItem("persist:adminAuth"));
  // const tokens = JSON.parse(getTokens.adminAuth);
  // const token = tokens.adminStatus.token;
  // const refresh_token = tokens.adminStatus.refresh_token;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        {adminStatus === null ? (
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ fontWeight: "bold" }}
            >
              Artiasana
            </Typography>
          </Toolbar>
        ) : (
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              className={classes.title}
              style={{ fontWeight: "bold" }}
            >
              Artiasana
            </Typography>

            <NotificationDrawer />
            <ProfileDropDown />
          </Toolbar>
        )}
      </AppBar>
    </div>
  );
}
const mapStateToProps = ({ adminAuth: { adminStatus } }) => {
  return {
    adminStatus,
  };
};
export default connect(mapStateToProps)(NavBar);
