import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { facForum, facReply, facStatus } from "../../actions/concern";
import Sidebar from "../../components/Sidebar/Sidebar";
import moment from "moment";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Box,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  MenuItem,
  Typography,
  Button,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import FSend from "../../components/Forum/FSend";
import FReceive from "../../components/Forum/FReceive";
import Modal from "react-modal";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
  textfield: {
    background: "white",
    borderRadius: "4px",
  },
  input: {
    display: "none",
  },
  details: {
    textAlign: "left",
    margin: "15px",
  },
});

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

const url = "http://localhost:5000";

const FacForum = () => {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = useState(false);

  const getReceivers = async () => {
    try {
      const { data } = await axios.get(`${url}/Facilitator/getHelper`);

      setHelpers(data.map((helper) => helper.email));
    } catch (error) {
      console.log("Err", error.message);
    }
  };

  const { id } = useParams();

  const dispatch = useDispatch();

  const { email } = useSelector((state) => state.user);

  const [text, setText] = useState("");

  const [attachment, setAttachment] = useState("");

  const { concerns, isLoading } = useSelector((state) => state.concern);

  const [status, setStatus] = useState("");

  const [helpers, setHelpers] = useState([]);

  const [content, setContent] = useState({
    subject: "",
    body: "",
    student: "",
    to: "",
  });

  const handleContent = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${url}/Facilitator/sendEmail`, {
        content,
        id,
      });
      setModalOpen(true);
    } catch (error) {
      console.log("Err", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reply = { email, text, attachment, selectedName };

    dispatch(facReply(id, reply));
    setText("");
    setAttachment("");
    setSelectedFile([]);
    setSelectedName("");
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

        setAttachment(Base64);
      };
      reader.onerror = (error) => {
        console.log("Err", error);
      };
    }
  };

  encodeFileBase64(selectedFile[0]);

  useEffect(() => {
    if (status) {
      dispatch(facStatus(id, status));
    } else if (id) {
      dispatch(facForum(id));
      getReceivers();
    }
  }, [id, dispatch, status]);
  return (
    <>
      <Sidebar name="Forum" />
      <CssBaseline />
      <Box>
        <Grid container>
          <Grid item xs={8} sm={8} md={9} container>
            <Grid
              item
              xs={12}
              className={classes.root}
              style={{ minHeight: "79vh", maxHeight: "79vh", overflow: "auto" }}
            >
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {concerns.map((concern, idx) => (
                    <div
                      key={idx}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {concern.forum.map((forum, idx) => {
                        if (forum.email === email) {
                          return (
                            <FSend
                              key={idx}
                              sender={forum.email}
                              message={forum.text}
                              date={moment(forum.time).fromNow()}
                              image={forum.attachment}
                              fileName={forum.filename}
                            />
                          );
                        } else {
                          return (
                            <FReceive
                              sender={forum.email}
                              message={forum.text}
                              date={moment(forum.time).fromNow()}
                              image={forum.attachment}
                              fileName={forum.filename}
                            />
                          );
                        }
                      })}
                    </div>
                  ))}
                </>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              container
              style={{
                backgroundColor: "#c5c5c5",
                minHeight: "8vh",
                alignContent: "center",
              }}
            >
              <Grid item xs={2} sm={1} md={1} style={{ textAlign: "center" }}>
                <input
                  className={classes.input}
                  id="image-upload"
                  type="file"
                  onChange={onFileChange}
                />
                <label htmlFor="image-upload">
                  <IconButton size="medium" component="span">
                    <AttachFileIcon fontSize="medium" />
                  </IconButton>
                </label>
              </Grid>
              <Grid
                item
                xs={2}
                sm={1}
                md={1}
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label htmlFor="file-upload">
                  {selectedName.length > 12 ? (
                    <p>{selectedName.substring(0, 10)}...</p>
                  ) : (
                    <p>{selectedName}</p>
                  )}
                </label>
              </Grid>
              <Grid item xs={6} sm={9} md={9}>
                <TextField
                  className={classes.textfield}
                  id="chat-input"
                  multiline
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  maxRows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></TextField>
              </Grid>
              <Grid item xs={2} sm={1} md={1} style={{ textAlign: "center" }}>
                <IconButton
                  size="medium"
                  color="primary"
                  onClick={handleSubmit}
                >
                  <SendIcon fontSize="medium" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={3}
            maxHeight="100vh"
            style={{ backgroundColor: "#AEECFF" }}
          >
            <Grid item xs={12} style={{ textAlign: "left", margin: "10px" }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <>
                  {concerns.map((concern) => (
                    <>
                      <Typography variant="h6" style={{ textAlign: "center" }}>
                        Details:
                      </Typography>
                      <hr />
                      <Typography variant="body1" gutterBottom>
                        Category: {concern.category}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Date Filed: {moment(concern.dateCreated).format("LL")}
                      </Typography>
                      <Typography variant="body1" gutterBottom maxRows={6}>
                        Description: {concern.subject}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Status: {concern.status}
                      </Typography>
                      {concern.receiver.map((val, idx) => (
                        <Typography
                          variant="body1"
                          gutterBottom
                          maxRows={3}
                          key={idx}
                        >
                          Concerned Faculty: {val}
                        </Typography>
                      ))}
                    </>
                  ))}
                </>
              )}
              <hr />
              <Grid
                item
                xs={12}
                style={{ textAlign: "center", margin: "10px" }}
              >
                <TextField
                  style={{ textAlign: "left" }}
                  variant="outlined"
                  size="small"
                  margin="dense"
                  label="Status"
                  fullWidth
                  select
                  value={concerns.map((concern) => concern.status)}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Unresolved">Unresolved</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </TextField>
                <form onSubmit={handleContent}>
                  <TextField
                    style={{ textAlign: "left" }}
                    variant="outlined"
                    size="small"
                    label="Forward"
                    margin="dense"
                    fullWidth
                    select
                    children
                    value={content.to}
                    onChange={(e) =>
                      setContent({
                        subject: concerns
                          .map((concern) => concern.subject)
                          .toString(),
                        body: concerns
                          .map((concern) => concern.body)
                          .toString(),
                        student: concerns
                          .map((concern) => concern.student)
                          .toString(),
                        to: e.target.value,
                      })
                    }
                  >
                    {helpers.length &&
                      helpers.map((helper, idx) => (
                        <MenuItem key={idx} value={helper}>
                          {helper}
                        </MenuItem>
                      ))}
                  </TextField>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                  >
                    Forward Concern
                  </Button>
                </form>
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
                      The concern has been successfully sent.
                    </p>
                  </div>
                </Modal>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FacForum;
