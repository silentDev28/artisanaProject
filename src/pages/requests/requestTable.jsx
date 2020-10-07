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

export default function RequestTable({ allRequest }) {
  const classes = useStyles();
  console.log(allRequest);
  return (
    <div>
      {allRequest ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell align="center">Artisan Name</TableCell>

                <TableCell align="center">User Name</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRequest.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.jobId.title}
                  </TableCell>
                  <TableCell align="center">
                    {row.artisanId.firstname + " " + row.artisanId.lastname}
                  </TableCell>

                  <TableCell align="center">
                    {row.userId.firstname + " " + row.userId.lastname}
                  </TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <Link to={"/request/" + row._id}>
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
