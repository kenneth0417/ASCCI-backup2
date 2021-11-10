import axios from "axios";

const url = "https://ascci.herokuapp.com";
/* const url = "http://localhost:5000"; */

export const adminGetAcc = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/accounts`);

    const filtered = data.filter((acc) => acc.role !== "Admin");

    dispatch({ type: "ADMIN_GETACC", payload: filtered });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const deleteAcc = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/Admin/deleteAcc/${id}`);

    dispatch({ type: "ADMIN_DELETEACC", payload: id });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const searchAcc = (search) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/searchAcc`, {
      params: { search },
    });

    const filtered = data.filter((acc) => acc.role !== "Admin");

    dispatch({ type: "ADMIN_SEARCHACC", payload: filtered });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const registerAcc = (newData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${url}/Admin/register`, newData);

    dispatch({ type: "REGISTER_ACC", payload: data });
  } catch (error) {
    console.log("Err", error.message);
    throw error;
  }
};
