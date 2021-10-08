import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createConcern } from "../../actions/concern";
import { getCategories } from "../../actions/categories";
import Sidebar from "../../components/Sidebar/Sidebar";
import Modal from "react-modal";

import {
  CssBaseline,
  Grid,
  Paper,
  makeStyles,
  TextField,
  IconButton,
  Button,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    /* textAlign: 'center', */
    color: theme.palette.text.secondary,
    margin: 40,
    /*  maxWidth: "85%", */
  },
  center: {
    textAlign: "center",
  },
  input: {
    display: "none",
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

const Concern = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const { category } = useSelector((state) => state.categories);

  const [modalOpen, setModalOpen] = useState(false);

  const [subject, setSubject] = useState("");

  const [conCategory, setConCategory] = useState("");

  const [department, setDepartment] = useState("");

  const [yearLevel, setYearLevel] = useState("");

  const [body, setBody] = useState("");

  const [attachment, setAttachment] = useState("");

  const [filename, setFilename] = useState("");

  const concernData = {
    student: user.email,
    subject,
    conCategory,
    department,
    yearLevel,
    body,
    attachment,
    filename,
  };

  const clear = () => {
    setSubject("");
    setConCategory("");
    setDepartment("");
    setYearLevel("");
    setBody("");
    setAttachment("");
    setFilename("");
    setSelectedFile([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(createConcern(concernData));
      setModalOpen(true);
      clear();
    } catch (error) {
      console.log("Err", error.message);
    }
  };

  const [selectedFile, setSelectedFile] = useState([]);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files);

    setFilename(e.target.files[0].name);
  };

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;

        setAttachment(Base64);
      };
      reader.onerror = (error) => {
        console.log("Err", error);
      };
    }
  };

  encodeFileBase64(selectedFile[0]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <Sidebar name="Forums" />
      <CssBaseline />
      <h2 className={classes.center}>New Concern</h2>
      <Paper className={classes.paper} alignitems="center" justify="center">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                label="Subject"
                size="small"
                margin="normal"
                fullWidth
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                label="Category"
                size="small"
                margin="normal"
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                value={conCategory}
                onChange={(e) => setConCategory(e.target.value)}
                required
              >
                <option style={{ display: "none" }} />
                {category.map((category, idx) => (
                  <option key={idx} value={category.identifier}>
                    {category.category}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                label="Department"
                size="small"
                margin="dense"
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option style={{ display: "none" }} />
                <option value="Computer Science">Computer Science</option>
                <option value="Information Systems">Information Systems</option>
                <option value="Information Technology">
                  Information Technology
                </option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                variant="outlined"
                label="Year Level"
                size="small"
                margin="dense"
                fullWidth
                select
                SelectProps={{
                  native: true,
                }}
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
                required
              >
                <option style={{ display: "none" }} />
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                variant="outlined"
                label="Concern"
                size="small"
                margin="normal"
                multiline
                rows={6}
                fullWidth
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></TextField>
            </Grid>
            <Grid item xs={2} sm={1} md={1} style={{ textAlign: "center" }}>
              <input
                className={classes.input}
                id="file-upload"
                type="file"
                onChange={onFileChange}
              />
              <label htmlFor="file-upload">
                <IconButton size="medium" edge="start" component="span">
                  <AttachFileIcon fontSize="medium" />
                </IconButton>
              </label>
            </Grid>
            <Grid item xs={2} sm={1} md={1} style={{ textAlign: "center" }}>
              <label htmlFor="image-upload">
                <p>{filename}</p>
              </label>
            </Grid>
            <Grid item xs={8} sm={8} md={10} style={{ textAlign: "right" }}>
              <IconButton size="medium" color="primary" type="submit">
                <SendIcon fontSize="medium" />
              </IconButton>
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
                  Your concern has been successfully submitted.
                </p>
              </div>
            </Modal>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default Concern;
