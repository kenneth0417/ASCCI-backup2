import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  allConcerns,
  adminSearch,
  adminSearchNoSort,
  adminSort,
  orderAsc,
  orderDesc,
} from "../../actions/concern";
import Sidebar from "../../components/Sidebar/Sidebar";
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
  Select,
  MenuItem,
  TableFooter,
  TablePagination,
  Grid,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { adminCateg } from "../../actions/categories";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#9EA1E9",
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles({
  root: {
    margin: "20px",
  },
  table: {
    marginTop: "20px",
  },
});

const Admin = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const { concerns, isLoading } = useSelector((state) => state.concern);

  const { category } = useSelector((state) => state.categories);

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const test = async () => {
    if (sort) {
      await dispatch(adminSort(sort));
      await dispatch(adminSearch(search));
    } else {
      await dispatch(adminSearchNoSort(search));
    }
  };

  const update = (e) => {
    setOrder(e.target.value);

    if (order == 0) {
      dispatch(orderDesc());
    } else if (order == 1) {
      dispatch(orderAsc());
    }
  };

  useEffect(() => {
    if (sort) {
      dispatch(adminSort(sort));
      setSearch("");
      setOrder(0);
    } else {
      dispatch(allConcerns());
      dispatch(adminCateg());
      setOrder(0);
    }
  }, [dispatch, sort]);

  return (
    <>
      <Sidebar name="Admin" />
      <div className={classes.root}>
        <CssBaseline />
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={3} md={3} lg={5}>
            <h1>Concerns</h1>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Typography style={{ display: "inline-block" }}>
              Sort by: &nbsp;
            </Typography>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              placeholder="Sort"
            >
              <MenuItem>None</MenuItem>
              {category.map((categ, idx) => (
                <MenuItem value={categ.category} key={idx}>
                  {categ.category}
                </MenuItem>
              ))}
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Unresolved">Unresolved</MenuItem>
            </Select>
            <Typography style={{ display: "inline-block" }}>
              &nbsp;Order by: &nbsp;
            </Typography>
            <Select
              id="order"
              placeholder="orderby"
              value={order}
              onChange={update}
            >
              <MenuItem value={0}>ASC</MenuItem>
              <MenuItem value={1}>DESC</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={8} sm={4} md={3} lg={2}>
            <TextField
              size="small"
              id="searchquery"
              label="Search"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={2} lg={1}>
            <Button size="medium" variant="contained" fullWidth onClick={test}>
              <SearchIcon fontSize="medium"></SearchIcon>
            </Button>
          </Grid>
        </Grid>
        <hr style={{ marginTop: "10px" }}></hr>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {concerns
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((concern, idx) => (
                    <TableRow
                      style={{ cursor: "pointer" }}
                      key={idx}
                      onClick={() =>
                        history.push(`/Admin/concern/${concern._id}`)
                      }
                    >
                      <TableCell>{concern.ticket}</TableCell>
                      <TableCell>
                        {moment(concern.dateCreated).format("LLL")}
                      </TableCell>
                      <TableCell>{concern.subject}</TableCell>
                      <TableCell>{concern.category}</TableCell>
                      <TableCell>
                        {concern.status !== "Pending"
                          ? `${concern.status} - ${moment(
                              concern.dateEvaluated
                            ).format("LLL")}`
                          : `${concern.status}`}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={concerns.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  ></TablePagination>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
};

export default Admin;
