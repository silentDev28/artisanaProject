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
import PermissionsTable from "./permissionTable";
// import RolesTable from "./roles-table";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function PermissionsPagination({
  handleChange,
  total,
  allPermissions,
  loader,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {allPermissions ? (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <div className="row m-0">
              <div
                className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#974578",
                }}
              >
                Permissions
              </div>
              <div
                className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
                style={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                  color: "#974578",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Link to="/permissions/create">
                  <Button style={{ background: "#974578", color: "white" }}>
                    New
                    <AddIcon />
                  </Button>
                </Link>
              </div>
              <div className="col-lg-12">
                {loader ? (
                  <div>
                    <div
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        paddingTop: "50px",
                      }}
                      className="col-lg-12"
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
                  <div>
                    <div className="col-lg-12">
                      <PermissionsTable allPermissions={allPermissions} />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                      <Pagination
                        count={total}
                        onChange={(event, val) => handleChange(val)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "20%" }}>
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

export default PermissionsPagination;
