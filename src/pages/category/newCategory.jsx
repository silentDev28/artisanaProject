import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import AddIcon from "@material-ui/icons/Add";
import PageLoader from "../../components/loader/pageLoader";
import TextField from "@material-ui/core/TextField";
import CircularIndeterminate from "../../components/loader/loader";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useDispatch } from "react-redux";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewCategory() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.href = "/category";
  };
  const [state, setstate] = useState({
    imageUrl: "",
    loader: false,
    message: "",
  });
  const handleFile = (evt, attr) => {
    const getActiveAdmin = JSON.parse(
      localStorage.getItem("persist:adminAuth")
    );
    const userTokens = JSON.parse(getActiveAdmin.adminAuth);
    const tokens = userTokens.adminStatus;
    if (evt.target.files[0]) {
      setstate({ loader: true });

      const image = evt.target.files[0];
      let fd = new FormData();

      fd.append("imageUrl", image);
      const url = `https://sandbox.artisana.ng/api/configuration/fileUpload`;
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.token}`,
        },
        body: fd,
      }).then((data) => {
        data
          .json()
          .then((data) => {
            setstate({
              imageUrl: data.result,
              loader: false,
            });
          })
          .catch((error) => {
            setstate({
              message: error.message,
              imageUrl: "",
              loader: false,
            });
          });
      });
    }
  };
  const [input, setinput] = useState({
    name: "",
  });
  const handleCreate = (evt) => {
    setinput({
      name: evt.target.value,
    });
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    setstate({
      loader: true,
    });

    if (input.name === "") {
      setstate({
        message: "Please fill all required fields",
        imageUrl: state.imageUrl,
        loader: false,
      });
    } else {
      const getActiveAdmin = JSON.parse(
        localStorage.getItem("persist:adminAuth")
      );
      const userTokens = JSON.parse(getActiveAdmin.adminAuth);
      const tokens = userTokens.adminStatus;

      let url = "https://sandbox.artisana.ng/api/category/create";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.token}`,
        },
        body: JSON.stringify({
          imageUrl: state.imageUrl,
          name: input.name,
        }),
      }).then((data) => {
        data.json().then((data) => {
          if (data.hasErrors) {
            setinput({
              name: "",
            });
            setstate({
              message: data.message,

              imageUrl: "",
              loader: false,
            });
          } else {
            setinput({
              name: "",
            });

            setstate({
              message: "New category successful",
              imageUrl: "",
              loader: false,
            });
            // console.log(data);
            // dispatch({ type: "send_new_category", data: data.result });
          }
        });
      });
    }
  };
  console.log(state.message);
  return (
    <div>
      <Button
        variant="outlined"
        style={{ color: "#974578", marginRight: "10px" }}
        onClick={handleClickOpen}
      >
        New <AddIcon />
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {" New Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="container col-lg-12">
              {state.message ? (
                state.message === "New category successful" ? (
                  <Alert
                    severity="success"
                    className="col-lg-12"
                    style={{ marginBottom: "20px" }}
                  >
                    <AlertTitle>Success</AlertTitle>
                    {state.message}
                  </Alert>
                ) : (
                  <div className="col-lg-12" style={{ marginBottom: "20px" }}>
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {state.message}
                    </Alert>
                  </div>
                )
              ) : (
                ""
              )}
              {state.imageUrl ? (
                <div
                  style={{ marginBottom: "20px" }}
                  className="col-lg-12"
                  style={{ width: "400px" }}
                >
                  <TextField
                    id="outlined-password-input"
                    label="Enter Name"
                    type="text"
                    variant="outlined"
                    className="col-lg-12"
                    onChange={(evt) => handleCreate(evt)}
                    value={input.name}
                  />
                  <div className="col-lg-12" style={{ marginTop: "10px" }}>
                    {state.loader ? (
                      <Button style={{ background: "#974578", color: "white" }}>
                        <CircularIndeterminate />
                      </Button>
                    ) : (
                      <Button
                        style={{ background: "#974578", color: "white" }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {state.loader ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: "100%", textAlign: "center" }}>
                        <PageLoader />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h6
                        className="col-lg-12"
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          color: "#974578",
                        }}
                      >
                        Upload and image
                      </h6>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroupFileAddon01"
                          >
                            Upload
                          </span>
                        </div>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={(evt) => handleFile(evt, "imageupload")}
                            value={state.imageUrl}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="inputGroupFile01"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
