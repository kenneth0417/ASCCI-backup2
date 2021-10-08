import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, TextField, Button, Typography } from "@material-ui/core";
import { addCategory } from "../../actions/categories";
import Modal from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";

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
  descriptionsize: {
    height: 200,
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

const AddCategory = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [category, setCategory] = useState("");

  const [identifier, setIdentifier] = useState("");

  const [definition, setDefinition] = useState("");

  const handleClear = () => {
    setCategory("");
    setIdentifier("");
    setDefinition("");
  };

  const [modalOpen, setModalOpen] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await dispatch(addCategory({ category, identifier, definition }));
      setModalOpen(true);
      handleClear();
    } catch (err) {
      setError(err.response.data.errorMessage);
    }
  };

  return (
    <>
      <h1>Category Information</h1>
      <hr style={{ marginTop: "10px" }}></hr>
      <Box pl={5} pr={5} mt={3}>
        <form onSubmit={handleSubmit}>
          <Box marginBottom="5px" fontWeight="500">
            <h2>Name & ID</h2>
            {error ? (
              <Typography color="error" style={{ margin: "2px" }}>
                {error}
              </Typography>
            ) : (
              <br />
            )}
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <TextField
                id="Category Name"
                label="Category Name"
                variant="outlined"
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6} elevation={6}>
              <TextField
                id="Category ID"
                label="Category Identifier (e.g. ACAD)"
                variant="outlined"
                fullWidth
                InputProps={{
                  className: classes.input,
                }}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              ></TextField>
            </Grid>
          </Grid>
          <br />
          <Box marginBottom="5px" fontWeight="500">
            <h2>Description</h2>
            <br />
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} elevation={6}>
              <Box marginTop="5px">
                <TextField
                  label="Category Description"
                  variant="outlined"
                  style={{ textAlign: "left" }}
                  hinttext="Message Field"
                  multiline
                  fullWidth
                  rows={10}
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
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
              The category has been successfully added.
            </p>
          </div>
        </Modal>
      </Box>
    </>
  );
};

export default AddCategory;
