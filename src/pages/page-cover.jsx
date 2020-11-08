import React, { Component } from "react";
import Home from "./admin-home/admin-home";
import { Switch, Route } from "react-router-dom";
import Artisans from "./artisans/users";
import UserDetails from "./artisans/userDetails";
import Admins from "./admins/admins";
import AdminDetails from "./admins/adminDetails";
import mainUsers from "./users/main-users";
import MainUsers from "./users/main-users";
import MainUserDetails from "./users/all-main-user-details";
import Roles from "./roles/roles";
import CreateNewAdmin from "./admins/create-new-admin";
import AdminUpdate from "./admins/updateAdmin";
import CreateRoles from "./roles/create-new-roles";
import RolesDetails from "./roles/roles-details";
import Permissions from "./permissions/permissions";
import CreatePermissions from "./permissions/createPermissions";
import PermissionsDetails from "./permissions/permissionDetails";
import allJobs from "./jobs/allJobs";
import JobDetails from "./jobs/jobDetails";
import allCategory from "./category/allCategory";
import categoryDetails from "./category/categoryDetails";
import CategoryUpdate from "./category/updateCategory";
import allRequest from "./requests/allRequest";
import RequestDetails from "./requests/requestDetails";
import Settings from "../pages/settings/settings";
class PageCover extends Component {
  state = {};
  render() {
    return (
      <div className="pageCont">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/artisans/:userDetails" component={UserDetails}></Route>
          <Route path="/artisans" component={Artisans}></Route>
          <Route path="/admins/create" component={CreateNewAdmin}></Route>
          <Route path="/admins/update/:adminId" component={AdminUpdate}></Route>
          <Route path="/admins/:adminDetails" component={AdminDetails}></Route>

          <Route path="/admins" component={Admins}></Route>

          <Route path="/users/:userId" component={MainUserDetails}></Route>

          <Route path="/users" component={MainUsers}></Route>
          <Route path="/roles/create" component={CreateRoles}></Route>
          <Route path="/roles/:roleDetails" component={RolesDetails}></Route>
          <Route path="/roles" component={Roles}></Route>
          <Route
            path="/permissions/create"
            component={CreatePermissions}
          ></Route>
          <Route
            path="/permissions/:permissionDetails"
            component={PermissionsDetails}
          ></Route>
          <Route path="/permissions" component={Permissions}></Route>
          <Route path="/jobs/:jobDetails" component={JobDetails}></Route>
          <Route path="/jobs" component={allJobs}></Route>
          <Route
            path="/category/update/:categoryId"
            component={CategoryUpdate}
          ></Route>
          <Route
            path="/category/:categoryDetails"
            component={categoryDetails}
          ></Route>
          <Route path="/category" component={allCategory}></Route>
          <Route
            path="/request/:requestDetails"
            component={RequestDetails}
          ></Route>
          <Route path="/request" component={allRequest}></Route>
          <Route path="/settings" component={Settings}></Route>
        </Switch>
      </div>
    );
  }
}

export default PageCover;
