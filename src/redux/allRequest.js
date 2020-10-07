var InitState = {
  allRequest: [],
};
const allRequestReducer = (state = InitState, action) => {
  switch (action.type) {
    case "all_Request":
      return {
        allRequest: action.data,
      };

    default:
      return state;
  }
};
export default allRequestReducer;
