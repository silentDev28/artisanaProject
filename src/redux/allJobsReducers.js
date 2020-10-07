var InitState = {
  allJobs: [],
};
const allJobsReducer = (state = InitState, action) => {
  switch (action.type) {
    case "all_jobs":
      return {
        allJobs: action.data,
      };

    default:
      return state;
  }
};
export default allJobsReducer;
