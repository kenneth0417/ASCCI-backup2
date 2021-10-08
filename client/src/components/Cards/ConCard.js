import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "10px",
    overflow: "auto",
  },
}));

const ConCard = ({ ticket, date, subject, conStatus, path }) => {
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card className={classes.root}>
        <CardActionArea component={Link} to={`/${user.role}/concern/${path}`}>
          <CardContent>
            <Typography variant="body1" component="p">
              {ticket}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {date}
            </Typography>
            <Typography variant="h5" component="h2">
              {subject}
            </Typography>
            <Typography variant="overline" component="p">
              status: {conStatus}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ConCard;
