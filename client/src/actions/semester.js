import axios from "axios";

const url = "https://ascci.herokuapp.com";
/* const url = "http://localhost:5000"; */

export const createSemester = (semData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${url}/Admin/createSem`, {
      semester: semData,
    });
    dispatch({ type: "CREATE_SEM", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const getSemesters = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/getSem`);

    dispatch({ type: "GET_SEM", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const selectSemester = (sem) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${url}/Admin/selectSem`, {
      selected: sem,
    });

    dispatch({ type: "SELECT_SEM", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const studGetSemesters = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Student/getSem`);

    dispatch({ type: "STUD_GET_SEM", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};
