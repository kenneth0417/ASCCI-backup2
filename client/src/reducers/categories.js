export default (
  state = { category: [], isLoading: true, error: null },
  action
) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "ADD_CATEG":
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case "GET_CATEG":
      return { ...state, category: action.payload };
    case "ADMIN_CATEG":
      return { ...state, category: action.payload };
    case "LOGOUT_ACC":
      return { ...state, category: [] };
    case "ADMIN_DELETECATEG":
      return {
        ...state,
        category: state.category.filter(
          (categ) => categ._id !== action.payload
        ),
      };
    case "FAC_CATEG":
      return { ...state, category: action.payload };
    case "ADMIN_SEARCHCATEG":
      return { ...state, category: action.payload };
    case "GET_ERROR":
      return { ...state, error: action.payload };
    case "REMOVE_ERROR":
      return { ...state, error: null };
    default:
      return { ...state };
  }
};
