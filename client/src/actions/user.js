import axios from "axios";

const url = "https://ascci.herokuapp.com";
/* const url = "http://localhost:5000"; */

export const getUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/auth/loggedin`);

    dispatch({ type: "GET_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`${url}/auth/login`, {
        email,
        password,
      });

      dispatch({ type: "LOGIN_USER", payload: data });
    } catch (error) {
      console.log("Err", error.response.data.errorMessage);
      throw error;
    }
  };

export const getAccount = (email) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/Admin/getAccount`, {
      params: { email },
    });
    dispatch({ type: "GET_ACCOUNT", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const updateAccount = (id, update) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${url}/Admin/updateAccount/${id}`, {
      update,
    });

    dispatch({ type: "UPDATE_ACCOUNT", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const updatePassword = (id, password) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${url}/Admin/updatePassword/${id}`, {
      password,
    });

    dispatch({ type: "UPDATE_PASSWORD", payload: data });
  } catch (error) {
    console.log("Err", error.message);
    throw error;
  }
};

export const facAccount = (email) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/Facilitator/getAccount`, {
      params: { email },
    });
    dispatch({ type: "FAC_ACCOUNT", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facUpdate = (id, update) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${url}/Facilitator/updateAccount/${id}`,
      { update }
    );

    dispatch({ type: "FAC_UPDATE", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facUpdatePassword = (id, password) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${url}/Facilitator/updatePassword/${id}`,
      { password }
    );

    dispatch({ type: "FAC_UPDATE_PASS", payload: data });
  } catch (error) {
    console.log("Err", error.message);
    throw error;
  }
};

export const logoutAccount = (id, password) => async (dispatch) => {
  try {
    await axios.get(`${url}/auth/logout`);

    dispatch({ type: "LOGOUT_ACC" });
  } catch (error) {
    console.log("Err", error.messagee);
  }
};

export const recAccount = (email) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/receivers/getAccount`, {
      params: { email },
    });
    dispatch({ type: "REC_ACCOUNT", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const recUpdate = (id, update) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${url}/receivers/updateAccount/${id}`, {
      update,
    });

    dispatch({ type: "REC_UPDATE", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const recUpdatePassword = (id, password) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${url}/receivers/updatePassword/${id}`,
      { password }
    );

    dispatch({ type: "REC_UPDATE_PASS", payload: data });
  } catch (error) {
    console.log("Err", error.message);
    throw error;
  }
};
