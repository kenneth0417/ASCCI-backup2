export default (state = { semesters: [], isLoading: true }, action) => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "END_LOADING":
      return { ...state, isLoading: false };
    case "CREATE_SEM":
      return { ...state, semesters: [...state.semesters, action.payload] };
    case "GET_SEM":
      return { ...state, semesters: action.payload };
    case "STUD_GET_SEM":
      return { ...state, semesters: action.payload };
    case "SELECT_SEM":
      return { ...state, semesters: action.payload };
    case "LOGOUT_ACC":
      return { ...state, semesters: [] };
    default:
      return state;
  }
};
