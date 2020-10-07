var InitState = {
  adminStatus: null,
};
const adminAuthCredentials = (state = InitState, action) => {
  switch (action.type) {
    case "admin_auth_status":
      return {
        adminStatus: action.data,
      };
    case "logout_user":
      return {
        adminStatus: action.data,
      };
    default:
      return state;
  }
};
export default adminAuthCredentials;
