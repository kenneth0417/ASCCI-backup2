import axios from "axios";

const url = "https://ascci.herokuapp.com";
/* const url = "http://localhost:5000"; */

export const reset = async (email) => {
  try {
    await axios.post(`${url}/auth/reset`, {
      email,
    });
  } catch (error) {
    console.log("Err", error.message);
    throw error;
  }
};

export const resetPass = async (id, newPass, verifyPass) => {
  try {
    await axios.post(`${url}/auth/reset/${id}`, {
      newPass,
      verifyPass,
    });
  } catch (error) {
    console.log("Err", error.message);
    throw error;
  }
};
