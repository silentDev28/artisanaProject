import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import UsersTable from "../../pages/artisans/users-table";
import AddIcon from "@material-ui/icons/Add";
import PageLoader from "../../components/loader/pageLoader";
import AdminTable from "./adminTable";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SimpleTable from "../../pages/artisans/users-table";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function AdminPagination({ handleChange, total, allAdmins, loader }) {
  const classes = useStyles();
  // useEffect(() => pageUpdate());
  return (
    <div>
      {allAdmins ? (
        <div>
          <div className="row m-0">
            <div
              className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
              style={{
                fontWeight: "bold",
                marginBottom: "20px",
                color: "#974578",
              }}
            >
              Admins
            </div>
            <div
              className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link to="/admins/create">
                <Button
                  variant="outlined"
                  style={{ color: "#974578", marginRight: "10px" }}
                >
                  New <AddIcon />
                </Button>
              </Link>
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
              <AdminTable allAdmins={allAdmins} loader={loader} />
            )}
          </div>

          <Pagination
            count={total}
            showFirstButton
            showLastButton
            onChange={(evt, value) => handleChange(value)}
          />
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

export default AdminPagination;
