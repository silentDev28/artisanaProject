import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getDate } from "../../components/time-date-converter/time-date-converter";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function PermissionsTable({ allPermissions, checkRoute }) {
  const classes = useStyles();

  return (
    <div>
      {allPermissions ? (
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Can Read</TableCell>
                  <TableCell align="center">Can Update</TableCell>
                  <TableCell align="center">Can Write</TableCell>
                  <TableCell align="center">Can Delete</TableCell>
                  {checkRoute === "adminRoute" ? (
                    ""
                  ) : (
                    <TableCell align="center">Action</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {allPermissions.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">
                      {row.canRead ? (
                        <Icon className="text-success">done</Icon>
                      ) : (
                        <Icon className="text-danger">close</Icon>
                      )}
                    </TableCell>

                    <TableCell align="center">
                      {row.canUpdate ? (
                        <Icon className="text-success">done</Icon>
                      ) : (
                        <Icon className="text-danger">close</Icon>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.canWrite ? (
                        <Icon className="text-success">done</Icon>
                      ) : (
                        <Icon className="text-danger">close</Icon>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {row.canDelete ? (
                        <Icon className="text-success">done</Icon>
                      ) : (
                        <Icon className="text-danger">close</Icon>
                      )}
                    </TableCell>
                    {checkRoute === "adminRoute" ? (
                      ""
                    ) : (
                      <TableCell align="center">
                        {" "}
                        <Link to={"permissions/" + row._id}>
                          <Button
                            style={{ background: "#974578", color: "white" }}
                          >
                            View More
                          </Button>
                        </Link>
                      </TableCell>
                    )}
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
