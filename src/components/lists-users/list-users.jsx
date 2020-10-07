import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EmailIcon from "@material-ui/icons/Email";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import BusinessIcon from "@material-ui/icons/Business";
import RoomIcon from "@material-ui/icons/Room";
import MapIcon from "@material-ui/icons/Map";
import PublicIcon from "@material-ui/icons/Public";
import WorkIcon from "@material-ui/icons/Work";
import StarIcon from "@material-ui/icons/Star";
import RateReviewIcon from "@material-ui/icons/RateReview";
import UpdateIcon from "@material-ui/icons/Update";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FolderList({ artisans }) {
  const classes = useStyles();
  console.log(artisans);
  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <AccessibilityIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="User Id" secondary={artisans.userId} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Name" secondary={artisans.firstname} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Last Name" secondary={artisans.lastname} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Nickname"
          secondary={artisans.nickname ? artisans.nickname : "N/A"}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <PhoneAndroidIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Phone Number" secondary={artisans.phoneNumber} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <EmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Email" secondary={artisans.email} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <BusinessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Business Name"
          secondary={artisans.businessName}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <RoomIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Address" secondary={artisans.address} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <MapIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="State" secondary={artisans.state} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <PublicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Country" secondary={artisans.country} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Specialization"
          secondary={artisans.specialization}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <StarIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Rating" secondary={artisans.rating} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <RateReviewIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Reviews" secondary={artisans.reviews} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Rc Number"
          secondary={artisans.RCNumber ? artisans.RcNumber : "N/A"}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="NIN"
          secondary={artisans.NIN ? artisans.NIN : "N/A"}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <UpdateIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Updated On"
          secondary={artisans.updateOn ? artisans.updateOn : "N/A"}
        />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar style={{ background: "#974578" }}>
            <UpdateIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Updated By"
          secondary={artisans.updatedBy ? artisans.updatedBy : "N/A"}
        />
      </ListItem>
    </List>
  );
}
