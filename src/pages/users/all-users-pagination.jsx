import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import AllMainUserTable from "./all-main-users-table";
import CircularIndeterminate from "../../components/loader/loader";
import PageLoader from "../../components/loader/pageLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function AllUsersPagination({ handleChange, total, allMainUsers, loader }) {
  const classes = useStyles();
  console.log(allMainUsers);
  return (
    <div className={classes.root}>
      {allMainUsers ? (
        <div>
          <div
            className="col-lg-12 col-md-12 col-xs-12 col-sm-12 col-12"
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#974578",
            }}
          >
            Users
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
              <AllMainUserTable allMainUsers={allMainUsers} />
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

export default AllUsersPagination;
