var InitState = {
  allMainUsers: [],
};
const allMainUsers = (state = InitState, action) => {
  switch (action.type) {
    case "all_Main_users":
      return {
        allMainUsers: action.data,
      };

    default:
      return state;
  }
};
export default allMainUsers;
