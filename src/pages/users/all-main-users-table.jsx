import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import CheckIcon from "@material-ui/icons/Check";
import { useDispatch } from "react-redux";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AllMainUserTable({ allMainUsers }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleCurrentRoute = () => {
    dispatch({ type: "send_current_route", data: "/users" });
  };
  return (
    <div>
      {allMainUsers ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>FirstName</TableCell>
                  <TableCell align="center">LastName</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone Number</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="center">Active</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allMainUsers.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.firstname}
                    </TableCell>
                    <TableCell align="center">{row.lastname}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      {row.phoneNumber ? row.phoneNumber : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {row.state ? row.state : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {row.isActive ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CheckIcon style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {" "}
                      <Link to={"/users/" + row._id}>
                        <Button
                          style={{ background: "#974578", color: "white" }}
                          onClick={handleCurrentRoute}
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
