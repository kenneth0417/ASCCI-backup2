import axios from "axios";

const url = "https://ascci.herokuapp.com";
/* const url = "http://localhost:5000"; */

export const createEmail = (email) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${url}/Admin/createEmail`, { email });
    dispatch({ type: "CREATE_EMAIL", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const getEmail = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/getEmail`);
    dispatch({ type: "GET_EMAIL", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const deleteEmail = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/Admin/deleteEmail/${id}`);
    dispatch({ type: "DELETE_EMAIL", payload: id });
  } catch (error) {
    console.log("Err", error.message);
  }
};
