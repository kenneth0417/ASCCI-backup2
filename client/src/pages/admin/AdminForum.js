import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminForum, adminReply, changeStatus } from "../../actions/concern";
import Sidebar from "../../components/Sidebar/Sidebar";
import moment from "moment";
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
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import FSend from "../../components/Forum/FSend";
import FReceive from "../../components/Forum/FReceive";

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

const AdminForum = () => {
  const classes = useStyles();

  const { id } = useParams();

  const dispatch = useDispatch();

  const { email } = useSelector((state) => state.user);

  const [text, setText] = useState("");

  const [attachment, setAttachment] = useState("");

  const { concerns, isLoading } = useSelector((state) => state.concern);

  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reply = { email, text, attachment, selectedName };

    dispatch(adminReply(id, reply));

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
      dispatch(changeStatus(id, status));
    } else if (id) {
      dispatch(adminForum(id));
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
                        } else if (
                          forum.email.includes(".iics") ||
                          forum.email.includes(".cics")
                        ) {
                          return (
                            <FReceive
                              key={idx}
                              sender={forum.email}
                              message={forum.text}
                              date={moment(forum.time).fromNow()}
                              image={forum.attachment}
                              fileName={forum.filename}
                              testStyle={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#FFE599",
                                marginBottom: "10px",
                                maxWidth: "60%",
                              }}
                            />
                          );
                        } else if (forum.email.includes("facilitator")) {
                          return (
                            <FReceive
                              key={idx}
                              sender={forum.email}
                              message={forum.text}
                              date={moment(forum.time).fromNow()}
                              image={forum.attachment}
                              fileName={forum.filename}
                              testStyle={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#CFFEDC",
                                marginBottom: "10px",
                                maxWidth: "60%",
                              }}
                            />
                          );
                        } else if (forum.email.includes("swdc")) {
                          return (
                            <FReceive
                              key={idx}
                              sender={forum.email}
                              message={forum.text}
                              date={moment(forum.time).fromNow()}
                              image={forum.attachment}
                              fileName={forum.filename}
                              testStyle={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#FECFF4",
                                marginBottom: "10px",
                                maxWidth: "60%",
                              }}
                            />
                          );
                        } else if (forum.email.includes("guidance")) {
                          return (
                            <FReceive
                              key={idx}
                              sender={forum.email}
                              message={forum.text}
                              date={moment(forum.time).fromNow()}
                              image={forum.attachment}
                              fileName={forum.filename}
                              testStyle={{
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: "#D8D9F6",
                                marginBottom: "10px",
                                maxWidth: "60%",
                              }}
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
                  placeholder="Aa"
                  multiline
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  size="small"
                  color="secondary"
                  maxRows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
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
                  {concerns.map((concern, idx) => (
                    <div key={idx}>
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
                    </div>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminForum;
