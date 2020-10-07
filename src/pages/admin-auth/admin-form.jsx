import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import InputComponent from "./input-component";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function AdminForm() {
  const classes = useStyles();

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      style={{ marginTop: "10px" }}
    >
      <InputComponent />
    </form>
  );
}
