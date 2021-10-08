import React, { useEffect, useState } from "react";

import { adminCategPage, deleteCateg } from "../../actions/categories";
import { useDispatch, useSelector } from "react-redux";

import { searchCateg } from "../../actions/categories";

import {
  CircularProgress,
  CssBaseline,
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      tablet: 768,
      lg: 900,
      xl: 1200,
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#9EA1E9",
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  table: {
    marginTop: "20px",
  },
  marginBot: {
    marginBottom: "10px",
  },
});

const Category = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { category, isLoading } = useSelector((state) => state.categories);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(adminCategPage());
  }, [dispatch]);
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={12} sm={4} md={4} lg={8}>
              <h1>Categories</h1>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={2}>
              <TextField
                size="small"
                id="searchquery"
                label="Search Category"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item xs={4} sm={4} md={4} lg={2}>
              <Button
                size="medium"
                variant="contained"
                fullWidth
                onClick={() => dispatch(searchCateg(search))}
              >
                <SearchIcon fontSize="medium"></SearchIcon>
              </Button>
            </Grid>
          </Grid>
          <Box
            component={Grid}
            item
            xs={12}
            display={{ xs: "none", sm: "none", md: "block" }}
          >
            <hr style={{ marginTop: "10px" }}></hr>
          </Box>
          <Box>
            <TableContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Category</StyledTableCell>
                    <StyledTableCell align="center">
                      Description
                    </StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      {category.map((categ, idx) => (
                        <TableRow key={idx}>
                          <TableCell align="center">{categ.category}</TableCell>
                          <TableCell align="center">
                            {categ.definition}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => dispatch(deleteCateg(categ._id))}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </MuiThemeProvider>
    </>
  );
};

export default Category;
