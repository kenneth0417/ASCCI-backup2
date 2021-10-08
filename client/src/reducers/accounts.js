export default (state = { account: [], isLoading: true }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "ADMIN_GETACC":
      return { ...state, account: action.payload };
    case "ADMIN_DELETEACC":
      return {
        ...state,
        account: state.account.filter((acc) => acc._id !== action.payload),
      };
    case "ADMIN_SEARCHACC":
      return { ...state, account: action.payload };
    case "LOGOUT_ACC":
      return { ...state, account: [] };
    case "REGISTER_ACC":
      return { ...state, account: [...state.account, action.payload] };
    default:
      return { ...state };
  }
};
