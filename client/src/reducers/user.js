const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  role: "",
};

export default (user = initialState, action) => {
  switch (action.type) {
    case "GET_USER":
      return (user = action.payload);
    case "LOGIN_USER":
      return (user = action.payload);
    case "GET_ACCOUNT":
      return (user = action.payload);
    case "UPDATE_ACCOUNT":
      return (user = action.payload);
    case "UPDATE_PASSWORD":
      return (user = action.payload);
    case "FAC_ACCOUNT":
      return (user = action.payload);
    case "FAC_UPDATE":
      return (user = action.payload);
    case "FAC_UPDATE_PASS":
      return (user = action.payload);
    case "LOGOUT_ACC":
      return (user = initialState);
    case "REC_ACCOUNT":
      return (user = action.payload);
    case "REC_UPDATE":
      return (user = action.payload);
    case "FAC_UPDATE_PASS":
      return (user = action.payload);
    default:
      return user;
  }
};
