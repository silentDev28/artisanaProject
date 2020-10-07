var InitState = {
  allPermissions: [],
};
const allPermissionsReducers = (state = InitState, action) => {
  switch (action.type) {
    case "all_permissions":
      return {
        allPermissions: action.data,
      };

    default:
      return state;
  }
};
export default allPermissionsReducers;
