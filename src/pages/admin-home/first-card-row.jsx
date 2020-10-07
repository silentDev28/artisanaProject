import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function FirstCards() {
  const cardRoles = {
    lists: [
      {
        id: 1,
        name: "Admins",
        icon: "admin_panel_settings",
        number: "5000",
        color: "#974578",
        route: "/admins",
      },
      {
        id: 2,
        name: "Users",
        icon: "people",
        number: "7000",
        color: "#974578",
        route: "/users",
      },
      {
        id: 3,
        name: "Artisans",
        icon: "people",
        number: "2000",
        color: "#974578",
        route: "/artisans",
      },
      {
        id: 4,
        name: "Roles",
        icon: "assignment_turned_in",
        number: "9000",
        color: "#974578",
        route: "/roles",
      },
    ],
  };
  const listCards = cardRoles.lists.map((lists) => {
    return (
      <div
        className="col-lg-3 col-md-6 col-sm-6 col-xs-6 col-12"
        style={{ marginBottom: "20px" }}
        key={lists.id}
      >
        <Link to={lists.route}>
          <Card>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-4 icon-div">
                <Icon
                  style={{
                    fontSize: "40px",
                    position: "absolute",
                    top: "30%",
                    color: "#974578",
                    right: "5%",
                  }}
                >
                  {lists.icon}
                </Icon>
              </div>

              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 col-8">
                <CardContent>
                  <Typography
                    component="h6"
                    variant="h6"
                    style={{ color: lists.color, fontWeight: "bold" }}
                  >
                    {lists.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={{ color: "black" }}
                  >
                    {lists.number}
                  </Typography>
                </CardContent>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    );
  });
  return <div className="row m-0">{listCards}</div>;
}
