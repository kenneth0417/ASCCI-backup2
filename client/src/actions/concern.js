import axios from "axios";

const url = "https://ascci.herokuapp.com";
/* const url = "http://localhost:5000"; */

export const createConcern = (concernData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${url}/Student/create`, concernData);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const getConcerns = (email) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    const { data } = await axios.get(`${url}/Student/`, {
      params: { email },
    });

    dispatch({ type: "FETCH_ALL", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const getForum = (id) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Student/concern/${id}`);

    dispatch({ type: "GET_FORUM", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const replyForum = (id, reply) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${url}/Student/concern/${id}/reply`, {
      reply,
    });

    dispatch({ type: "REPLY", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const allConcerns = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/`);

    dispatch({ type: "ADMIN_CONCERNS", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const orderAsc = () => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_ASC" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const orderDesc = () => async (dispatch) => {
  try {
    dispatch({ type: "ORDER_DESC" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const adminForum = (id) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/concern/${id}`);

    dispatch({ type: "ADMIN_FORUM", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const adminReply = (id, reply) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${url}/Admin/concern/${id}/reply`, {
      reply,
    });

    dispatch({ type: "ADMIN_REPLY", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const changeStatus = (id, status) => async (dispatch) => {
  try {
    const { data } = await axios.patch(`${url}/Admin/concern/${id}/status`, {
      status,
    });

    dispatch({ type: "CHANGE_STATUS", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facConcerns = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Facilitator/`);

    dispatch({ type: "FAC_CONCERNS", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facForum = (id) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Facilitator/concern/${id}`);

    dispatch({ type: "FAC_FORUM", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facReply = (id, reply) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `${url}/Facilitator/concern/${id}/reply`,
      { reply }
    );

    dispatch({ type: "FAC_REPLY", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facStatus = (id, status) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${url}/Facilitator/concern/${id}/status`,
      {
        status,
      }
    );

    dispatch({ type: "FAC_STATUS", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const recConcerns = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/receivers/`);

    dispatch({ type: "REC_CONCERNS", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const recForum = (id) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/receivers/concern/${id}`);

    dispatch({ type: "REC_FORUM", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const recReply = (id, reply) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${url}/receivers/concern/${id}/reply`, {
      reply,
    });

    dispatch({ type: "REC_REPLY", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const recStatus = (id, status) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${url}/receivers/concern/${id}/status`,
      { status }
    );

    dispatch({ type: "REC_STATUS", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const adminSearch = (search) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/Admin/search`, {
      params: { search },
    });

    dispatch({ type: "ADMIN_SEARCH", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const adminSearchNoSort = (search) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/Admin/search`, {
      params: { search },
    });

    dispatch({ type: "ADMIN_SEARCH2", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facSearch = (search) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/Facilitator/search`, {
      params: { search },
    });

    dispatch({ type: "FAC_SEARCH", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facSearchNoSort = (search) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${url}/Facilitator/search`, {
      params: { search },
    });

    dispatch({ type: "FAC_SEARCH2", payload: data });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const adminSort = (sort) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Admin/sort`, {
      params: { sort },
    });

    dispatch({ type: "ADMIN_SORT", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};

export const facSort = (sort) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });
    const { data } = await axios.get(`${url}/Facilitator/sort`, {
      params: { sort },
    });

    dispatch({ type: "FAC_SORT", payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log("Err", error.message);
  }
};
