import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  StudentData,
  AdminData,
  FacilitatorData,
  ReceiversData,
} from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import logo from "../../images/logo-light.png";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Grid,
  Menu,
  Button,
  MenuItem,
  Box,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { logoutAccount } from "../../actions/user";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbarstyle: {
    minHeight: "13vh",
  },
  navitems: {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profilepic: {
    height: "7vh",
    width: "7vh",
  },
}));

function Sidebar({ name, recPath }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((state) => state.user);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutAccount());
    history.push("/");
  };

  return (
    <div className="sidebar">
      <IconContext.Provider value={{ color: "#00000" }}>
        <div className={classes.root}>
          <AppBar position="static">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Toolbar className={classes.toolbarstyle}>
                  <MenuIcon onClick={showSidebar} />
                </Toolbar>
              </Grid>
              <Grid item>
                <Box className={classes.appbarheader}>
                  <Typography variant="h3">{name}</Typography>
                </Box>
              </Grid>

              <Grid item>
                <Box mr={3}>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <img
                      src={user.picture || user.image}
                      alt="profile-pic"
                      className={classes.profilepic}
                    />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    {/* {user.role === "SWDC" && (
                      <Link to="/" onClick={() => dispatch(logoutAccount())}>
                        Logout
                      </Link>
                    )} */}
                  </Menu>
                </Box>
              </Grid>
            </Grid>
          </AppBar>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="sidebar-header">
              <img src={logo} alt="Logo" className="logo" />
              <Link to="#" className="close-icon">
                <CloseOutlinedIcon />
              </Link>
            </li>

            {user.role === "Student" && (
              <>
                {StudentData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.icon}</span>
                        <span className="name">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
            {user.role === "Admin" && (
              <>
                {AdminData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.icon}</span>
                        <span className="name">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
            {user.role === "Facilitator" && (
              <>
                {FacilitatorData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        <span>{item.icon}</span>
                        <span className="name">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
            {user.role !== "Facilitator" &&
              user.role !== "Student" &&
              user.role !== "Admin" && (
                <>
                  {ReceiversData.map((item, index) => {
                    return (
                      <li key={index} className={item.cName}>
                        {index === 0 ? (
                          <Link to={`/${user.role}`}>
                            <span>{item.icon}</span>
                            <span className="name">{item.title}</span>
                          </Link>
                        ) : (
                          <Link to={`/${user.role}/updateAccount`}>
                            <span>{item.icon}</span>
                            <span className="name">{item.title}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </>
              )}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Sidebar;
