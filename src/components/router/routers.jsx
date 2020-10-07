import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

function SimpleList({ routes }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {routes.map((lists) => {
          return (
            <Link to={lists.route} key={lists.name}>
              <ListItem button>
                <ListItemIcon>
                  <Icon style={{ color: " #974578" }}>{lists.icon}</Icon>
                </ListItemIcon>

                <ListItemText
                  primary={lists.name}
                  style={{ color: " #974578" }}
                />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );
}
const mapStateToProps = ({ routes: { routes } }) => {
  return {
    routes,
  };
};
export default connect(mapStateToProps)(SimpleList);
