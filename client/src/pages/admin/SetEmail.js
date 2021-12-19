import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { createEmail, getEmail, deleteEmail } from "../../actions/emails";

const SetEmail = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const { emails, isLoading } = useSelector((state) => state.emails);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createEmail(email));
  };

  useEffect(() => {
    dispatch(getEmail());
  }, []);

  return (
    <div>
      <Sidebar name="Set Email" />
      <form onSubmit={handleSubmit}>
        <label>Enter acceptable email: </label>
        <input
          type="text"
          placeholder="cics@ust.edu.ph"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <h3>Acceptable emails:</h3>
      <ul>
        {emails.map((em) => (
          <div key={em._id}>
            <li>{em.email}</li>
            <button onClick={() => dispatch(deleteEmail(em._id))}>X</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SetEmail;
