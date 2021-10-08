import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { registerAcc } from "../../actions/accounts";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, Select, Typography } from "@material-ui/core";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PhotoIcon from "@material-ui/icons/Photo";

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
  spacebelow: {
    marginBottom: "20px",
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

const Register = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword2 = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword2 = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [verifyPass, setVerifyPass] = useState("");

  const [role, setRole] = useState("");

  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [picture, setPicture] = useState("");

  const [error, setError] = useState(<br />);

  const [errorPass, setErrorPass] = useState(<br />);

  const [modalOpen, setModalOpen] = useState(false);

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setVerifyPass("");
    setRole("");
    setFirstName("");
    setLastName("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(<br />);
    setErrorPass(<br />);

    try {
      const newData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        verifyPass: verifyPass,
        role: role,
        picture: picture,
      };

      await dispatch(registerAcc(newData));
      setModalOpen(true);
      handleClear();
    } catch (err) {
      if (err.response.data.errorMessage) {
        setError(err.response.data.errorMessage);
      } else if (err.response.data.errorPass) {
        setErrorPass(err.response.data.errorPass);
      }
    }
  };

  const [selectedFile, setSelectedFile] = useState([]);

  const [selectedName, setSelectedName] = useState("");

  const onFileChange = (e) => {
    setSelectedFile(e.target.files);

    setSelectedName(e.target.files[0].name);
  };

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;

        setPicture(Base64);
      };
      reader.onerror = (error) => {
        console.log("Err", error);
      };
    }
  };

  encodeFileBase64(selectedFile[0]);
  return (
    <>
      <h1>Account Information</h1>
      <hr></hr>
      <Box pl={5} pr={5}>
        <form onSubmit={handleSubmit}>
          <Box marginBottom="5px" fontWeight="500">
            <h2>Profile Picture</h2>
          </Box>
          <Grid item xs={12} sm={12} md={3} elevation={6}>
            <label>
              <input type="file" onChange={onFileChange} accept="image/*" />
              <IconButton size="medium" component="span">
                <PhotoIcon fontSize="medium" />
              </IconButton>
            </label>
            <p>{selectedName}</p>
          </Grid>

          <Box marginBottom="5px" fontWeight="500">
            <h2>Full Name & Email</h2>
            <Typography color="error">{error}</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <Box marginTop="5px">
                <TextField
                  id="First Name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <Box marginTop="5px" marginBottom="10px">
                <TextField
                  id="Last Name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    className: classes.input,
                  }}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                ></TextField>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></TextField>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <Box>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Role
                  </InputLabel>
                  <Select
                    native
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                    inputProps={{
                      name: "role",
                      id: "outlined-age-native-simple",
                    }}
                    required
                  >
                    <option
                      aria-label="None"
                      style={{ display: "none" }}
                      value=""
                    />
                    <option value="Facilitator">Facilitator</option>
                    <option value="SWDC">SWDC</option>
                    <option value="GuidanceCounselor">
                      Guidance Counselor
                    </option>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Box marginBottom="5px" fontWeight="500">
            <h2>Password</h2>
            <Typography color="error">{errorPass}</Typography>
          </Box>
          <Grid container spacing={3} className={classes.spacebelow}>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <Box marginTop="5px">
                <TextField
                  label="Enter Password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <Box marginTop="5px" marginBottom="10px">
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword2}
                          onMouseDown={handleMouseDownPassword2}
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={verifyPass}
                  onChange={(e) => setVerifyPass(e.target.value)}
                  required
                />
              </Box>
            </Grid>
          </Grid>
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
                onClick={handleClear}
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
      </Box>
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
            The account has been successfully created.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Register;
