import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  createSemester,
  getSemesters,
  selectSemester,
} from "../../actions/semester";
import { CircularProgress, Radio, Typography } from "@material-ui/core";

import {
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "20px",
  },
  center: {
    textAlign: "center",
  },
  input: {
    display: "none",
  },
}));

const SetSemester = () => {
  const classes = useStyles();

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
      <CssBaseline />
      <Sidebar name="Semester" />
      <div className={classes.root}>
        <h2>Set Semester</h2>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Typography>Selected: {selectedLabel}</Typography>
        )}
        <br />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <form onSubmit={selectSubmit}>
              <TextField
                variant="outlined"
                label="Semester"
                size="small"
                select
                SelectProps={{
                  native: true,
                }}
                value={sem.acadYear}
                onChange={(e) => setSelect(e.target.value)}
                required
              >
                <option style={{ display: "none" }} />
                {semesters.map((sem, idx) => (
                  <option key={idx} value={sem.acadYear}>
                    {sem.acadYear}
                  </option>
                ))}
              </TextField>
              <Button
                type="submit"
                variant="contained"
                style={{ display: "inline-block", marginLeft: "10px" }}
              >
                Select
              </Button>
            </form>
          </Grid>
          <Grid item xs={12} sm={12}>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                size="small"
                label="Create Semester"
                margin="none"
                value={sem}
                onChange={(e) => setSem(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                style={{ display: "inline-block", marginLeft: "10px" }}
              >
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SetSemester;
