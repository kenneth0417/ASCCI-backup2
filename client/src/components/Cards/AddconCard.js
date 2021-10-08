import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "10px",
  },
}));
const AddconCard = () => {
  const classes = useStyles();

  const user = useSelector((state) => state.user);
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/${user.role}/concern`}>
        <CardContent>
          <AddCircleIcon fontSize="large" />
          <Typography variant="h5" component="h2">
            New Concern
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default AddconCard;
