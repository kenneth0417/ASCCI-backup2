import React, { useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, Box, TextField, Typography } from "@material-ui/core";
import logo from "../images/ustlogo.png";
import logo2 from "../images/cicslogo.png";
import ASCCIlogo from "../images/logo-dark.png";
import Modal from "react-modal";
import { resetPass } from "../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  hiddenbanner: {
    background: "#FEC00F",
    height: "10vh",
  },
  logohiddenbanner: {
    maxWidth: "8vh",
    borderRadius: "20%",
  },
  background: {
    height: "90vh",
    backgroundColor: "#FFE599",
  },
  backgroundform: {
    backgroundColor: "white",
  },
  shadow: {
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: 600,
    marginBottom: "4vh",
  },
  spacing: {
    marginBottom: "4vh",
  },
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

const ResetPassword = () => {
  const classes = useStyles();

  const history = useHistory();

  const { id } = useParams();

  const [newPass, setNewPass] = useState("");

  const [verifyPass, setVerifyPass] = useState("");

  const [error, setError] = useState(<br />);

  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await resetPass(id, newPass, verifyPass);
      setModalOpen(true);
      setNewPass("");
      setVerifyPass("");
    } catch (error) {
      setError(error.response.data.errorMessage);
    }
  };
  return (
    <>
      <div className={classes.root}>
        {/*Banner*/}
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          className={classes.hiddenbanner}
        >
          <Grid item>
            <img src={logo} alt="Logo" className={classes.logohiddenbanner} />
          </Grid>

          <Grid item>
            <img
              src={ASCCIlogo}
              alt="Logo"
              className={classes.logohiddenbanner}
            />
          </Grid>

          <Grid item>
            <img src={logo2} alt="Logo" className={classes.logohiddenbanner} />
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.background}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box component={Grid} item xs={1} sm={2} md={4}></Box>

          <Grid item xs={10} sm={8} md={4}>
            {/*TUloy mo to bukas, need ayusin yung margins and paddings*/}
            <Box px={3} py={4} className={classes.backgroundform}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} className={classes.title}>
                  <Box textAlign="center">Reset Password</Box>
                </Grid>
                <Grid item xs={12} className={classes.spacing}>
                  <Box textAlign="center" mb="3">
                    Please enter your new password
                  </Box>
                </Grid>
                <Typography color="error">{error}</Typography>
                <Grid item xs={12} className={classes.spacing}>
                  <TextField
                    id="new-pass"
                    label="New Password"
                    variant="outlined"
                    fullWidth
                    value={newPass}
                    type="password"
                    onChange={(e) => setNewPass(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} className={classes.spacing}>
                  <TextField
                    id="confirm-pass"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={verifyPass}
                    onChange={(e) => setVerifyPass(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
                <Modal
                  isOpen={modalOpen}
                  onRequestClose={() => setModalOpen(false)}
                  style={customStyles}
                >
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      className="modalBtn"
                      onClick={() => setModalOpen(false)}
                    >
                      X
                    </button>
                  </div>

                  <div style={{ margin: "20px" }}>
                    <p style={{ fontSize: "24px" }}>
                      Your password has been successfully changed.
                    </p>
                  </div>
                </Modal>
              </Grid>
            </Box>
          </Grid>
          <Box component={Grid} item xs={1} sm={2} md={4}></Box>
        </Grid>
      </div>
    </>
  );
};

export default ResetPassword;
