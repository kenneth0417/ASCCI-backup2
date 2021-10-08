import React from "react";

import PropTypes from "prop-types";
import {
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
} from "@material-ui/core";
import clsx from "clsx";
import Accounts from "../../pages/admin/Accounts";
import Register from "../../pages/admin/Register";
import Sidebar from "../Sidebar/Sidebar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    elevation: 1,
  },
  zindex: {
    zIndex: 1,
    elevation: 1,
  },
  color: {
    backgroundColor: "#FFE599",
    color: "black",
  },
  center: {
    justifyContent: "center",
  },
}));

const AdminAccounts = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div>
        <Sidebar name="Account Management" />
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
            className={clsx(classes.zindex, classes.color)}
            elevation="1"
          >
            <Tab label="Accounts" {...a11yProps(0)} />
            <Tab label="Create Account" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        {/* Account Information Tab */}
        <TabPanel component={"span"} value={value} index={0}>
          <Accounts />
        </TabPanel>

        {/* Change Password Tab */}
        <TabPanel component={"span"} value={value} index={1}>
          <Register />
        </TabPanel>
      </div>
    </>
  );
};

export default AdminAccounts;
