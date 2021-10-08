import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { facAccount, facUpdate } from "../../actions/user";
import validator from "validator";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Modal from "react-modal";
import { Typography } from "@material-ui/core";

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

const FacUpdate = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { _id: id } = useSelector((state) => state.user);

  const { email } = useSelector((state) => state.user);

  const user = useSelector((state) => state.user);

  const [update, setUpdate] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [error, setError] = useState(<br />);

  const [emailErr, setEmailErr] = useState(<br />);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(<br />);
    setEmailErr(<br />);

    if (!update.firstName || !update.lastName) {
      setError("Please fill-up the inputs below.");
    } else if (
      !validator.isAlpha(update.firstName) ||
      !validator.isAlpha(update.lastName)
    ) {
      setError("The name must only contain valid characters.");
    } else if (!validator.isEmail(update.email)) {
      setEmailErr("The email you entered is invalid.");
    } else if (!update.email) {
      setEmailErr("Please enter your email below.");
    } else {
      dispatch(facUpdate(id, update));
      setModalOpen(true);
    }
  };

  useEffect(() => {
    dispatch(facAccount(email));
  }, [dispatch, email]);
  return (
    <>
      <h1>Account Information</h1>
      <hr></hr>
      <Box p={5}>
        <form onSubmit={handleSubmit}>
          <Box marginBottom="10px" fontWeight="500">
            <h2>Full Name</h2>
          </Box>
          <Typography color="error">{error}</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <Box marginTop="10px">
                <TextField
                  id="First Name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  value={update.firstName}
                  onChange={(e) =>
                    setUpdate({ ...update, firstName: e.target.value })
                  }
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <Box marginTop="10px" marginBottom="10px">
                <TextField
                  id="Last Name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  value={update.lastName}
                  onChange={(e) =>
                    setUpdate({ ...update, lastName: e.target.value })
                  }
                ></TextField>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} elevation={6}>
              <Box fontWeight="500">
                <h2>Login Information</h2>
              </Box>
              <Typography color="error">{emailErr}</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <Box>
                <TextField
                  id="Email Address"
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  value={update.email}
                  onChange={(e) =>
                    setUpdate({ ...update, email: e.target.value })
                  }
                ></TextField>
              </Box>
            </Grid>
          </Grid>
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
                  setUpdate({ firstName: "", lastName: "", email: "" })
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
                Your information has been successfully changed.
              </p>
            </div>
          </Modal>
        </form>
      </Box>
    </>
  );
};

export default FacUpdate;
