import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import UsersTable from "../../pages/artisans/users-table";
import AddIcon from "@material-ui/icons/Add";
import PageLoader from "../../components/loader/pageLoader";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import RolesTable from "./roles-table";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function RolesPagination({ handleChange, total, allRoles, loader }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {allRoles ? (
        <div>
          <div
            className="col-lg-12 col-md-12 col-xs-12 col-sm-12 col-12"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#974578",
            }}
          >
            <div className="row">
              <div className="col-6">Roles</div>
              <div
                className="col-6"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Link to="/roles/create">
                  <Button
                    variant="outlined"
                    style={{ color: "#974578", marginRight: "10px" }}
                  >
                    New <AddIcon />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "20px" }}>
            {loader ? (
              <div>
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    paddingTop: "50px",
                  }}
                >
                  <PageLoader />
                </div>
                <div
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "18px",
                    marginTop: "5px",
                    color: "#974578",
                  }}
                >
                  Loading...
                </div>
              </div>
            ) : (
              <RolesTable allRoles={allRoles} />
            )}
          </div>
          <Pagination
            count={total}
            onChange={(evt, value) => handleChange(value)}
          />
        </div>
      ) : (
        <div
          style={{
            marginTop: "20%",
          }}
        >
          <div style={{ justifyContent: "center", display: "flex" }}>
            <PageLoader />
          </div>
          <div
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "18px",
              marginTop: "5px",
              color: "#974578",
            }}
          >
            Loading...
          </div>
        </div>
      )}
    </div>
  );
}

export default RolesPagination;
