var InitState = {
  allCategory: [],
};
const allCategoryReducer = (state = InitState, action) => {
  switch (action.type) {
    case "all_category":
      return {
        allCategory: action.data,
      };

    default:
      return state;
  }
};
export default allCategoryReducer;
