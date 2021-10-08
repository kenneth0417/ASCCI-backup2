import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { facAccount, facUpdatePassword } from "../../actions/user";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "react-modal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    elevation: 1,
  },
  zindex: {
    zIndex: 1,
    elevation: 1,
  },
  color: {
    backgroundColor: "#FFE599",
    color: "black",
  },
  input: {},
}));

Modal.setAppElement("#root");

const customStyles = {
  overlay: { zIndex: 1 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const FacUpdatePass = () => {
  const classes = useStyles();

  const { email } = useSelector((state) => state.user);

  const { _id: id } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [password, setPassword] = useState({
    currentPass: "",
    newPass: "",
    verifyPass: "",
  });

  const [error, setError] = useState(<br />);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(<br />);

    if (!password.currentPass || !password.newPass || !password.verifyPass) {
      setError("The password inputs cannot leave as a blank.");
    } else {
      try {
        await dispatch(facUpdatePassword(id, password));
        setModalOpen(true);
        setPassword({ currentPass: "", newPass: "", verifyPass: "" });
      } catch (error) {
        setError(error.response.data.errorMessage);
      }
    }
  };

  useEffect(() => {
    dispatch(facAccount(email));
  }, [dispatch, email]);
  return (
    <>
      <div>
        <h1>Password Reset</h1>
        <hr></hr>
        <Box p={6}>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              {/*Keep Box Minimized, Intended Empty Space*/}
              <Box
                component={Grid}
                item
                sm={12}
                md={2}
                display={{ xs: "none", sm: "none", md: "block" }}
              ></Box>
              <Grid item xs={12} sm={2} md={2} elevation={6}>
                <Box textAlign="center">Current Password:</Box>
              </Grid>
              <Grid item xs={12} sm={8} md={6} elevation={6}>
                <Typography color="error" style={{ marginBottom: "5px" }}>
                  {error}
                </Typography>
                <TextField
                  type="password"
                  id="Current Password"
                  label="Current"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  value={password.currentPass}
                  onChange={(e) =>
                    setPassword({ ...password, currentPass: e.target.value })
                  }
                ></TextField>
              </Grid>
              {/*Keep Box Minimized, Intended Empty Space*/}
              <Box
                component={Grid}
                item
                sm={12}
                md={2}
                display={{ xs: "none", sm: "none", md: "block" }}
              ></Box>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              {/*Keep Box Minimized, Intended Empty Space*/}
              <Box
                component={Grid}
                item
                sm={12}
                md={2}
                display={{ xs: "none", sm: "none", md: "block" }}
              ></Box>

              <Grid item xs={12} sm={2} md={2} elevation={6}>
                <Box textAlign="center">New Password:</Box>
              </Grid>
              <Grid item xs={12} sm={8} md={6} elevation={6}>
                <TextField
                  type="password"
                  id="New Password"
                  label="New"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  value={password.newPass}
                  onChange={(e) =>
                    setPassword({ ...password, newPass: e.target.value })
                  }
                ></TextField>
              </Grid>
              {/*Keep Box Minimized, Intended Empty Space*/}
              <Box
                component={Grid}
                item
                sm={12}
                md={2}
                display={{ xs: "none", sm: "none", md: "block" }}
              ></Box>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              {/*Keep Box Minimized, Intended Empty Space*/}
              <Box
                component={Grid}
                item
                sm={12}
                md={2}
                display={{ xs: "none", sm: "none", md: "block" }}
              ></Box>

              <Grid item xs={12} sm={2} md={2} elevation={6}>
                <Box textAlign="center">Confirm New Password:</Box>
              </Grid>
              <Grid item xs={12} sm={8} md={6} elevation={6}>
                <TextField
                  type="password"
                  id="Confirm New Password"
                  label="Confirm New"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  value={password.verifyPass}
                  onChange={(e) =>
                    setPassword({ ...password, verifyPass: e.target.value })
                  }
                ></TextField>
              </Grid>
              {/*Keep Box Minimized, Intended Empty Space*/}
              <Box
                component={Grid}
                item
                sm={12}
                md={2}
                display={{ xs: "none", sm: "none", md: "block" }}
              ></Box>
            </Grid>
            <br></br>
            <br></br>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={3}
            >
              {/*Keep Box Minimized, Intended Empty Space*/}
              <Box
                component={Grid}
                item
                sm={12}
                md={3}
                display={{ xs: "none", sm: "none", md: "block" }}
              ></Box>

              <Grid item xs={12} sm={12} md={3} elevation={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() =>
                    setPassword({
                      currentPass: "",
                      newPass: "",
                      verifyPass: "",
                    })
                  }
                >
                  Clear
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={3} elevation={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>

              {/*Keep Box Minimized, Intended Empty Space*/}
              <Box
                component={Grid}
                item
                sm={12}
                md={3}
                display={{ xs: "none", sm: "none", md: "block" }}
              ></Box>
            </Grid>
          </form>
          <Modal
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}
            style={customStyles}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button className="modalBtn" onClick={() => setModalOpen(false)}>
                X
              </button>
            </div>

            <div style={{ margin: "20px" }}>
              <p style={{ fontSize: "24px" }}>
                Your password has been successfully changed.
              </p>
            </div>
          </Modal>
        </Box>
      </div>
    </>
  );
};

export default FacUpdatePass;
