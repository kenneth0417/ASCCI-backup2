import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConcerns } from "../../actions/concern";
import moment from "moment";
import Sidebar from "../../components/Sidebar/Sidebar";
import { CircularProgress, CssBaseline, Grid, Box } from "@material-ui/core";
import AddconCard from "../../components/Cards/AddconCard";
import ConCard from "../../components/Cards/ConCard";

const Student = () => {
  const user = useSelector((state) => state.user);

  const { concerns, isLoading } = useSelector((state) => state.concern);

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      dispatch(getConcerns(user.email));
    } catch (error) {
      console.log("Err", error.message);
    }
  }, [user, dispatch]);

  return (
    <>
      <Sidebar name="Student" />
      <div style={{ margin: "40px" }}>
        <CssBaseline />
        <h1>Concerns</h1>
        <hr style={{ marginTop: "10px", marginBottom: "20px" }}></hr>
        <Grid item container xs={12} sm={12} md={12} lg={12} elevation={6}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {concerns.map((concern, idx) => (
                <ConCard
                  path={concern._id}
                  ticket={concern.ticket}
                  date={moment(concern.dateCreated).fromNow()}
                  subject={concern.subject}
                  conStatus={concern.status}
                  key={idx}
                />
              ))}
            </>
          )}
        </Grid>
        <Grid container>
          <Grid item xs={6} sm={6} md={3} elevation={6}>
            <Box marginTop="10px" textAlign="center">
              <AddconCard />
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Student;
