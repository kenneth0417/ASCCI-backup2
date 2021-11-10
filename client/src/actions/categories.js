import axios from "axios";

const url = "https://ascci.herokuapp.com";
/* const url = "http://localhost:5000"; */

export const addCategory =
  ({ category, identifier, definition }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`${url}/Admin/addCategory`, {
        category,
        identifier,
        definition,
      });

      dispatch({ type: "ADD_CATEG", payload: data });
    } catch (error) {
      console.log("Err", error.message);
      throw error;
    } finally {
      console.log("finally");
    }
  };

export const getCategories = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/Student/categories`);

    dispatch({ type: "GET_CATEG", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const adminCateg = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/categories`);

    dispatch({ type: "ADMIN_CATEG", payload: data });
    /* dispatch({ type: "REMOVE_ERROR" }); */
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const adminCategPage = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/categories`);

    dispatch({ type: "ADMIN_CATEG", payload: data });
    dispatch({ type: "END_LOADING" });
    /* dispatch({ type: "REMOVE_ERROR" }); */
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const deleteCateg = (id) => async (dispatch) => {
  try {
    await axios.delete(`${url}/Admin/deleteCateg/${id}`);

    dispatch({ type: "ADMIN_DELETECATEG", payload: id });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facCateg = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Facilitator/categories`);

    dispatch({ type: "FAC_CATEG", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const searchCateg = (search) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/searchCateg`, {
      params: { search },
    });

    dispatch({ type: "ADMIN_SEARCHCATEG", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};
