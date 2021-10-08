export default (state = { concerns: [], isLoading: true }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "CREATE":
      return { ...state, concerns: [...state.concerns, action.payload] };
    case "FETCH_ALL":
      return { ...state, concerns: action.payload };
    case "GET_FORUM":
      return { ...state, concerns: [action.payload] };
    case "REPLY":
      return { ...state, concerns: [action.payload] };
    case "ADMIN_CONCERNS":
      return { ...state, concerns: action.payload };
    case "ADMIN_FORUM":
      return { ...state, concerns: [action.payload] };
    case "ADMIN_REPLY":
      return { ...state, concerns: [action.payload] };
    case "CHANGE_STATUS":
      return { ...state, concerns: [action.payload] };
    case "FAC_CONCERNS":
      return { ...state, concerns: action.payload };
    case "FAC_FORUM":
      return { ...state, concerns: [action.payload] };
    case "FAC_REPLY":
      return { ...state, concerns: [action.payload] };
    case "FAC_STATUS":
      return { ...state, concerns: [action.payload] };
    case "REC_CONCERNS":
      return { ...state, concerns: action.payload };
    case "LOGOUT_ACC":
      return { ...state, concerns: [] };
    case "REC_FORUM":
      return { ...state, concerns: [action.payload] };
    case "REC_REPLY":
      return { ...state, concerns: [action.payload] };
    case "REC_STATUS":
      return { ...state, concerns: [action.payload] };
    case "ADMIN_SEARCH":
      return {
        ...state,
        concerns: state.concerns.filter((concern) =>
          action.payload.some((conc) => concern._id === conc._id)
        ),
      };
    case "ADMIN_SEARCH2":
      return { ...state, concerns: action.payload };
    case "ADMIN_SORT":
      return { ...state, concerns: action.payload };
    case "FAC_SEARCH":
      return {
        ...state,
        concerns: state.concerns.filter((concern) =>
          action.payload.some((conc) => concern._id === conc._id)
        ),
      };
    case "FAC_SEARCH2":
      return { ...state, concerns: action.payload };
    case "FAC_SORT":
      return { ...state, concerns: action.payload };
    case "ORDER_ASC":
      return {
        ...state,
        concerns: state.concerns.sort((a, b) =>
          a.dateCreated.localeCompare(b.dateCreated)
        ),
      };
    case "ORDER_DESC":
      return {
        ...state,
        concerns: state.concerns.sort(
          (a, b) => -a.dateCreated.localeCompare(b.dateCreated)
        ),
      };
    default:
      return state;
  }
};
