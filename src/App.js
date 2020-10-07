import React from "react";
import NavBar from "./components/navbar/navbar";
import "./App.css";
import AdminSignIn from "./pages/admin-auth/admin-sign-in";
import { connect } from "react-redux";
import Routers from "./components/router/routers";
import { BrowserRouter } from "react-router-dom";
import PageCover from "./pages/page-cover";
const App = ({ adminStatus }) => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        {adminStatus !== null ? (
          adminStatus.token && adminStatus.refresh_token && adminStatus.user ? (
            <div className="back-page">
              <div className="row m-0">
                <div className="col-lg-3 side-nav">
                  <Routers />
                </div>
                <div className="col">
                  <PageCover />
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          <AdminSignIn />
        )}
      </div>
    </BrowserRouter>
  );
};
const mapStateToProps = ({ adminAuth: { adminStatus } }) => {
  return {
    adminStatus,
  };
};
export default connect(mapStateToProps)(App);
