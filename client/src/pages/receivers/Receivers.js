import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { recConcerns } from "../../actions/concern";
import ConCard from "../../components/Cards/ConCard";
import { CircularProgress, CssBaseline, Grid } from "@material-ui/core";
import Sidebar from "../../components/Sidebar/Sidebar";

const Receivers = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const { concerns, isLoading } = useSelector((state) => state.concern);

  useEffect(() => {
    dispatch(recConcerns());
  }, [dispatch]);
  return (
    <>
      <Sidebar name={user.role} />
      <div style={{ margin: "20px" }}>
        <CssBaseline />
        <h2 style={{ textAlign: "center" }}>Concerns</h2>

        <Grid item container xs={12} sm={12} md={12} lg={12} elevation={6}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {concerns.map((concern, idx) => (
                <>
                  {concern.receiver.includes(user.email) && (
                    <ConCard
                      path={concern._id}
                      ticket={concern.ticket}
                      date={moment(concern.dateCreated).fromNow()}
                      subject={concern.subject}
                      conStatus={concern.status}
                      key={idx}
                    />
                  )}
                </>
              ))}
            </>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Receivers;
