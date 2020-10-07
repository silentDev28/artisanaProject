var InitState = {
  allAdminUsers: [],
};
const allAdminUsers = (state = InitState, action) => {
  switch (action.type) {
    case "all_admin_users":
      return {
        allAdminUsers: action.data,
      };

    default:
      return state;
  }
};
export default allAdminUsers;
