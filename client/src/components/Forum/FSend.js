import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CssBaseline,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row-reverse",
    borderRadius: "3px",
    marginTop: "5px",
  },
  right: {
    textAlign: "right",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[10],
    padding: theme.spacing(2, 2, 8),
  },
}));

export default function FSend({ sender, message, date, image, fileName }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#AEECFF",
          marginBottom: "10px",
          maxWidth: "60%",
        }}
      >
        <CardContent style={{ alignSelf: "flex-end" }}>
          <Typography color="textSecondary" gutterBottom>
            {sender}
          </Typography>
          <Typography gutterBottom>{message}</Typography>
          {image && image.includes("application") && (
            <a href={image} download={fileName}>
              {fileName}
            </a>
          )}
          <Typography color="textSecondary">{date}</Typography>
        </CardContent>
        {image && image.includes("image") && (
          <CardActionArea>
            <CardMedia
              style={{ maxWidth: "100vh", maxHeight: "50vh" }}
              component="img"
              image={image}
              onClick={handleOpen}
            />

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
                  <img
                    src={image}
                    style={{ maxWidth: "80vw", maxHeight: "80vh" }}
                    alt=""
                  />
                </div>
              </Fade>
            </Modal>
          </CardActionArea>
        )}
      </Card>
    </div>
  );
}
