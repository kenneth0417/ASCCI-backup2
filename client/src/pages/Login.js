import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginUser } from "../actions/user";
import { useHistory, Link } from "react-router-dom";

import {
  makeStyles,
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
} from "@material-ui/core";

import logo from "../images/ustlogo.png";
import logo2 from "../images/cicslogo.png";
import ASCCIlogo from "../images/logo-dark.png";

const clientId =
  "345626656367-poa5188tsnn1itv6uqbssonceii8pik9.apps.googleusercontent.com";

axios.defaults.withCredentials = true;

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
  },
  loginSide: {
    background: "#D8D9F6",
  },
  imageSide: {
    background: "#FEC00F",
  },
  ustlogo: {
    maxWidth: "20vh",
  },
  cicslogo: {
    maxWidth: "18vh",
  },
  logo: {
    maxWidth: "30vh",
    borderRadius: "20%",
  },
  text: {
    color: "Black",
    marginBottom: "10px",
  },
  input: {
    color: "black",
    backgroundColor: "#D8D9F6",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    textAlign: "center",
  },
  hiddenbanner: {
    background: "#FEC00F",
    height: "10vh",
  },
  logohiddenbanner: {
    maxWidth: "8vh",
    borderRadius: "20%",
  },
  centeritems: {
    justifyContent: "center",
    textAlign: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const url = "https://ascci.herokuapp.com";

const Login = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState(<br />);

  const [image, setImage] = useState("");

  const [state, setState] = useState({
    checkedA: false,
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [logged, setLogged] = useState(false);

  const onLoginSuccess = async (res) => {
    const image = res.profileObj.imageUrl;
    setImage(res.profileObj.imageUrl);
    try {
      if (
        res.profileObj.email.includes(".iics@ust.edu.ph") ||
        res.profileObj.email.includes(".cics@ust.edu.ph")
      ) {
        alert("Success");
        await axios.post(
          `${url}/auth/googlelogin`,
          { tokenId: res.tokenId },
          { params: { image } },
          { withCredentials: true }
        );

        dispatch(getUser());
      } else {
        alert("Unauthorized: Not an IICS/CICS account.");
        history.push("/");
      }
    } catch (error) {
      console.log("Err", error.message);
    }
  };

  const onLoginFailure = (res) => {
    console.log("Login Failed:", res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password }));
      setLogged(true);
    } catch (err) {
      setError(err.response.data.errorMessage);
    }
  };

  useEffect(() => {
    dispatch(getUser());
    if (!user) {
      dispatch(getUser());
    } else {
      history.push(`/${user.role}`);
    }
  }, [user, dispatch]);
  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Box
            component={Grid}
            item
            sm={4}
            md={7}
            display={{ xs: "none", sm: "none", md: "block" }}
            className={classes.imageSide}
          >
            {/* Image Side: Logos and Website name*/}
            <Box>
              <Box px={5} pt={2} mb={3}>
                {/*UST CICS Logo Part*/}
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                >
                  <img src={logo} alt="Logo" className={classes.ustlogo} />
                  <img src={logo2} alt="Logo" className={classes.cicslogo} />
                </Grid>
              </Box>

              <Box>
                <Box marginBottom="20px">
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img src={ASCCIlogo} alt="Logo" className={classes.logo} />
                  </Grid>
                </Box>

                <Box textAlign="center">
                  <ThemeProvider theme={theme}>
                    <Typography variant="h3" className={classes.text}>
                      A Student's Concerns System
                    </Typography>
                    <Typography variant="h4" className={classes.text}>
                      for the College of Information
                    </Typography>
                    <Typography variant="h4" className={classes.text}>
                      and Computing Sciences
                    </Typography>
                  </ThemeProvider>
                </Box>
              </Box>
            </Box>
          </Box>
          <Grid item xs={12} sm={12} md={5} elevation={6} square="true">
            {/* Input Side, Login buttons*/}
            <Box
              component={Grid}
              item
              display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
            >
              {/*Banner only shows when not on laptop sized screens*/}
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className={classes.hiddenbanner}
              >
                <Grid item>
                  <img
                    src={logo}
                    alt="Logo"
                    className={classes.logohiddenbanner}
                  />
                </Grid>

                <Grid item>
                  <img
                    src={ASCCIlogo}
                    alt="Logo"
                    className={classes.logohiddenbanner}
                  />
                </Grid>

                <Grid item>
                  <img
                    src={logo2}
                    alt="Logo"
                    className={classes.logohiddenbanner}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.loginSide} boxShadow={5}>
              <Box py={7} px={3}>
                <Typography component="div">
                  <Box
                    fontSize="h2.fontSize"
                    fontWeight="fontWeightBold"
                    mb={4}
                  >
                    Login
                  </Box>
                  <form
                    className={classes.form}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <Grid container direction={"column"} spacing={5}>
                      <Grid item>
                        <div>
                          <Typography color="error">{error}</Typography>
                        </div>
                        <TextField
                          id="Email Address"
                          label="Email Address"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            style: { color: "black" },
                          }}
                          autoFocus
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="Password"
                          label="Password"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            className: classes.input,
                          }}
                          InputLabelProps={{
                            style: { color: "black" },
                          }}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          fullWidth
                          type="submit"
                        >
                          {logged ? (
                            <>
                              Logging in...
                              <CircularProgress
                                size={"25px"}
                                style={{ color: "black" }}
                              />
                            </>
                          ) : (
                            "Login"
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <Grid container direction={"column"} spacing={5}>
                    <Grid item>
                      <Box textAlign="center">
                        <Link to="/reset">Forgot Password?</Link>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box textAlign="center">
                        <hr></hr>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box textAlign="center" justifyContent="center">
                        Are you a student?<br></br>
                        <br></br>
                        {state.checkedA ? (
                          <GoogleLogin
                            clientId={clientId}
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={false}
                          />
                        ) : (
                          <GoogleLogin
                            clientId={clientId}
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={"single_host_origin"}
                            isSignedIn={false}
                            disabled
                          />
                        )}
                        <FormGroup row className={classes.centeritems}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.checkedA}
                                onChange={handleChange}
                                name="checkedA"
                              />
                            }
                            label={
                              <div>
                                <span>I accept the </span>
                                <Link to="" onClick={handleOpen}>
                                  terms of use and privacy policy
                                </Link>
                              </div>
                            }
                          />
                        </FormGroup>
                        <Modal
                          aria-labelledby="transition-modal-title"
                          aria-describedby="transition-modal-description"
                          className={classes.modal}
                          open={open}
                          onClose={handleClose}
                          closeAfterTransition
                          BackdropComponent={Backdrop}
                          BackdropProps={{
                            timeout: 500,
                          }}
                        >
                          <Fade in={open}>
                            <div className={classes.paper}>
                              <h2 id="transition-modal-title">
                                <Modal />
                                Terms of Use and Privacy Policy
                              </h2>
                              <p id="transition-modal-description">
                                Hehe gamitin mo, pag ayaw mo lagot ka kay kenet
                              </p>
                            </div>
                          </Fade>
                        </Modal>
                      </Box>
                    </Grid>
                  </Grid>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Login;
