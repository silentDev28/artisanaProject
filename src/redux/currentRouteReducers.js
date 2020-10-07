var InitState = {
  currentRoute: "",
};
const currentRoute = (state = InitState, action) => {
  switch (action.type) {
    case "send_current_route":
      return {
        currentRoute: action.data,
      };

    default:
      return state;
  }
};
export default currentRoute;
