import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/categories";
import Sidebar from "../../components/Sidebar/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  categories: {
    marginTop: "25px",
  },
  header: {
    backgroundColor: "#AEECFF",
    height: "17vh",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "1rem",
  },
}));

const Categories = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { category } = useSelector((state) => state.categories);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <>
      <Sidebar name="Categories" />
      <Container maxWidth="lg" className={classes.categories}>
        <div className={classes.root}>
          <Box className={classes.header} boxShadow={3} p={3}>
            <Box>
              This page contains a list of categories to be used when filing a
              concern, below will be the category names together with their
              description for you to have a better understanding when creating
              your concern.
            </Box>
          </Box>

          <Box my={3}>Categories of Concerns:</Box>

          {category.map((categ, idx) => (
            <Accordion
              expanded={expanded === `panel${idx}`}
              onChange={handleChange(`panel${idx}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${idx}bh-content`}
                id={`panel${idx}bh-header`}
              >
                <Typography className={classes.heading}>
                  {categ.category}
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  ID Name: {categ.identifier}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{categ.definition}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Categories;
