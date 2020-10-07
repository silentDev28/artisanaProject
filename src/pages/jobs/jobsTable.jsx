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

export default function JobsTable({ allJobs }) {
  const classes = useStyles();

  return (
    <div>
      {allJobs ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Description</TableCell>

                <TableCell align="center">Created On</TableCell>
                {/* <TableCell align="center">Last Login</TableCell> */}
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allJobs.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    {row.description.length > 50
                      ? row.description.substring(0, 50) + "..."
                      : row.description}
                  </TableCell>

                  <TableCell align="center">{getDate(row.createdOn)}</TableCell>
                  {/* <TableCell align="center">{getDate(row.lastLogin)}</TableCell> */}
                  <TableCell align="center">
                    {" "}
                    <Link to={"/jobs/" + row._id}>
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
