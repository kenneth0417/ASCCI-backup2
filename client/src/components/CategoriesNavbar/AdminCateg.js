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
import Category from "../../pages/admin/Category";
import AddCategory from "../../pages/admin/AddCategory";
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

const AdminCateg = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <Sidebar name="Categories" />
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Categories Tabs"
            centered
            className={clsx(classes.zindex, classes.color)}
            elevation="1"
          >
            <Tab label="Categories" {...a11yProps(0)} />
            <Tab label="Create Category" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        {/* Account Information Tab */}
        <TabPanel component={"span"} value={value} index={0}>
          <Category />
        </TabPanel>

        {/* Change Password Tab */}
        <TabPanel component={"span"} value={value} index={1}>
          <AddCategory />
        </TabPanel>
      </div>
    </>
  );
};

export default AdminCateg;
