import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
});

export default function ForgetPassword({ email }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const getActiveAdmin = JSON.parse(localStorage.getItem("persist:adminAuth"));
  const userTokens = JSON.parse(getActiveAdmin.adminAuth);
  const tokens = userTokens.adminStatus;
  const [loader, setloader] = useState(false);
  const [message, setmessage] = useState("");
  const handleSend = () => {
    setloader(true);
    const url = "https://sandbox.artisana.ng/api/identity/admin/forgotPassword";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.token}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((data) => {
        setmessage(data.result);
        setloader(false);
      })
      .catch((data) => {
        setmessage(data.error);
        setloader(false);
      });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List className="row">
        <div
          className="col-12"
          style={{ marginTop: "20px", paddingTop: "100px" }}
        >
          <h5
            style={{
              marginBottom: "30px",
              fontWeight: "bold",
              color: "#974578",
            }}
          >
            Forgot password
          </h5>
          {message ? (
            <div className="col-12" style={{ marginBottom: "20px" }}>
              <Alert severity="info">{message}</Alert>
            </div>
          ) : (
            ""
          )}
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="col-12"
            disabled
            value={email}
            style={{ marginBottom: "20px" }}
          />
          {loader ? (
            <Button
              variant="contained"
              color="primary"
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingTop: "10px",
                paddingBotton: "10px",
                marginBottom: "20px",
              }}
            >
              Please wait...
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingTop: "10px",
                paddingBotton: "10px",
                marginBottom: "20px",
              }}
              onClick={handleSend}
            >
              Send
            </Button>
          )}
        </div>
      </List>
    </div>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            variant="contained"
            color="primary"
            style={{
              paddingLeft: "30px",
              paddingRight: "30px",
              paddingTop: "10px",
              paddingBotton: "10px",
              marginBottom: "20px",
            }}
          >
            Forget Password
          </Button>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
