import React from "react";

import { connect } from "react-redux";

const UserImage = ({ adminStatus }) => {
  const user = adminStatus.user;
  return (
    <div style={{ color: "white" }}>
      <img
        src={user.imageUrl}
        alt="avater"
        className="avater-images"
        style={{ width: "50px", height: "50px", borderRadius: "100%" }}
      ></img>{" "}
      {user.firstname}
    </div>
  );
};
const mapStateToProps = ({ adminAuth: { adminStatus } }) => {
  return {
    adminStatus,
  };
};
export default connect(mapStateToProps)(UserImage);
