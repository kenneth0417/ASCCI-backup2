import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  createSemester,
  getSemesters,
  selectSemester,
} from "../../actions/semester";
import { CircularProgress } from "@material-ui/core";

const SetSemester = () => {
  const dispatch = useDispatch();

  const { semesters, isLoading } = useSelector((state) => state.semester);

  const selectedLabel = semesters?.find(
    (sem) => sem.isActive !== false
  )?.acadYear;

  const [sem, setSem] = useState("");

  const [select, setSelect] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(createSemester(sem));
      setSem("");
    } catch (error) {
      console.log("Err", error.message);
    }
  };

  const selectSubmit = (e) => {
    e.preventDefault();

    dispatch(selectSemester(select));
  };

  useEffect(() => {
    dispatch(getSemesters());
  }, []);

  return (
    <div>
      <Sidebar name="Semester" />
      <h1>Set Semester</h1>

      {isLoading ? <CircularProgress /> : <p>Selected: {selectedLabel}</p>}

      <form onSubmit={selectSubmit}>
        {semesters.map((sem, idx) => (
          <div className="radio" key={idx}>
            <input
              type="radio"
              value={sem.acadYear}
              name="sem"
              onChange={(e) => setSelect(e.target.value)}
            />
            {sem.acadYear}
          </div>
        ))}
        <button type="submit">Select</button>
      </form>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create Semester"
          value={sem}
          onChange={(e) => setSem(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SetSemester;
