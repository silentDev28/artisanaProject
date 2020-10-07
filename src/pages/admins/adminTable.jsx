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
import { getDate } from "../../components/time-date-converter/time-date-converter";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AdminTable({ allAdmins }) {
  const classes = useStyles();

  return (
    <div>
      {allAdmins ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>FirstName</TableCell>
                <TableCell align="center">LastName</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Created On</TableCell>
                {/* <TableCell align="center">Last Login</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAdmins.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.firstname}
                  </TableCell>
                  <TableCell align="center">{row.lastname}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.phoneNumber}</TableCell>
                  <TableCell align="center">{getDate(row.createdOn)}</TableCell>
                  {/* <TableCell align="center">{getDate(row.lastLogin)}</TableCell> */}
                  <TableCell align="center">
                    {" "}
                    <Link to={"/admins/" + row._id}>
                      <Button style={{ background: "#974578", color: "white" }}>
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
