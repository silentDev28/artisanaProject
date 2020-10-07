var InitState = {
  allRoles: [],
};
const rolesReducers = (state = InitState, action) => {
  switch (action.type) {
    case "all_roles":
      return {
        allRoles: action.data,
      };

    default:
      return state;
  }
};
export default rolesReducers;
