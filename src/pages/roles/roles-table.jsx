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

export default function RolesTable({ allRoles }) {
  const classes = useStyles();
  console.log(allRoles);
  return (
    <div>
      {allRoles ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>

                  <TableCell align="center">Created On</TableCell>
                  <TableCell align="center">Created By</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allRoles.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="center">
                      {getDate(row.createdOn)}
                    </TableCell>
                    <TableCell align="center">{row.createdBy}</TableCell>
                    <TableCell align="center">
                      {" "}
                      <Link to={"roles/" + row._id}>
                        <Button
                          style={{ background: "#974578", color: "white" }}
                        >
                          View More
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
