var InitState = {
  allAdmins: [],
};
const allAdmins = (state = InitState, action) => {
  switch (action.type) {
    case "all_admins":
      return {
        allAdmins: action.data,
      };

    default:
      return state;
  }
};
export default allAdmins;
