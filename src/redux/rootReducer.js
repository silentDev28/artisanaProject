import { combineReducers } from "redux";
import adminAuthCredentials from "./adminAtuhCredentials";
import allAdmins from "./allAdminsReducer";
import allAdminUsers from "./allAdminUsers";
import allCategoryReducer from "./allCategoryReducer";
import allJobsReducer from "./allJobsReducers";
import allMainUsers from "./allMainUsers";
import allRequestReducer from "./allRequest";
import currentRoute from "./currentRouteReducers";
import allPermissionsReducers from "./permissionsReducer";
import rolesReducers from "./rolesReducers";
import routersReducer from "./routerReducers";
const rootReducer = combineReducers({
  adminAuth: adminAuthCredentials,
  routes: routersReducer,
  adminUsers: allAdminUsers,
  allAdmins: allAdmins,
  allMainUsers: allMainUsers,
  totalRoles: rolesReducers,
  allPermissions: allPermissionsReducers,
  allJobs: allJobsReducer,
  currentRoute: currentRoute,
  allCategory: allCategoryReducer,
  allRequest: allRequestReducer,
});
export default rootReducer;
