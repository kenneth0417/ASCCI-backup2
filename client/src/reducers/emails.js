export default (state = { emails: [], isLoading: true }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "CREATE_EMAIL":
      return { ...state, emails: [...state.emails, action.payload] };
    case "GET_EMAIL":
      return { ...state, emails: action.payload };
    case "DELETE_EMAIL":
      return {
        ...state,
        emails: state.emails.filter((em) => em._id !== action.payload),
      };
    case "LOGOUT_ACC":
      return { ...state, emails: [] };
    default:
      return state;
  }
};
