import React from "react";
import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Student from "./pages/student/Student";
import StudentProtected from "./protectedRoutes/StudentProtected";
import Admin from "./pages/admin/Admin";
import AdminProtected from "./protectedRoutes/AdminProtected";
import FacilitatorProtected from "./protectedRoutes/FacilitatorProtected";
import Concern from "./pages/student/Concern";
import Register from "./pages/admin/Register";
import Categories from "./pages/student/Categories";
import AddCategory from "./pages/admin/AddCategory";
import Forum from "./pages/student/Forum";
import AdminForum from "./pages/admin/AdminForum";
import Facilitator from "./pages/facilitator/Facilitator";
import FacForum from "./pages/facilitator/FacForum";
import Reset from "./pages/Reset";
import ResetPassword from "./pages/ResetPassword";
import Receivers from "./pages/receivers/Receivers";
import Navbar from "./components/Navbar/Navbar";
import FacNavbar from "./components/Navbar/FacNavbar";
import RecForum from "./pages/receivers/RecForum";
import RecNavbar from "./components/Navbar/RecNavbar";
import AdminReports from "./pages/admin/AdminReports";
import AdminAccounts from "./components/AccountsNavbar/AdminAccounts";
import AdminCateg from "./components/CategoriesNavbar/AdminCateg";
import ReceiverProtected from "./protectedRoutes/ReceiverProtected";

import { createTheme, ThemeProvider } from "@material-ui/core";
import SetSemester from "./pages/admin/SetSemester";
import SetEmail from "./pages/admin/SetEmail";
const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.8rem",
    fontWeight: 600,
  },
};

const App = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/reset" exact component={Reset} />
            <Route path="/reset/:id" component={ResetPassword} />
            <StudentProtected
              exact
              path="/Student"
              email={user.email}
              role={user.role}
              component={Student}
            />
            <StudentProtected
              exact
              path="/Student/concern"
              email={user.email}
              role={user.role}
              component={Concern}
            />
            <StudentProtected
              exact
              path="/Student/concern/:id"
              email={user.email}
              role={user.role}
              component={Forum}
            />
            <StudentProtected
              exact
              path="/Student/categories"
              email={user.email}
              role={user.role}
              component={Categories}
            />
            <AdminProtected
              exact
              path="/Admin"
              email={user.email}
              role={user.role}
              component={Admin}
            />
            <AdminProtected
              path="/Admin/register"
              email={user.email}
              role={user.role}
              component={Register}
            />
            <AdminProtected
              path="/Admin/AddCategory"
              email={user.email}
              role={user.role}
              component={AddCategory}
            />
            <AdminProtected
              path="/Admin/concern/:id"
              email={user.email}
              role={user.role}
              component={AdminForum}
            />
            <AdminProtected
              path="/Admin/updateAccount"
              email={user.email}
              role={user.role}
              component={Navbar}
            />
            <AdminProtected
              path="/Admin/accounts"
              email={user.email}
              role={user.role}
              component={AdminAccounts}
            />
            <AdminProtected
              path="/Admin/reports"
              email={user.email}
              role={user.role}
              component={AdminReports}
            />
            <AdminProtected
              path="/Admin/categories"
              email={user.email}
              role={user.role}
              component={AdminCateg}
            />
            <AdminProtected
              path="/Admin/semester"
              email={user.email}
              role={user.role}
              component={SetSemester}
            />
            <AdminProtected
              path="/Admin/email"
              email={user.email}
              role={user.role}
              component={SetEmail}
            />
            <FacilitatorProtected
              exact
              path="/Facilitator"
              email={user.email}
              role={user.role}
              component={Facilitator}
            />
            <FacilitatorProtected
              exact
              path="/Facilitator/concern/:id"
              email={user.email}
              role={user.role}
              component={FacForum}
            />
            <FacilitatorProtected
              exact
              path="/Facilitator/updateAccount"
              email={user.email}
              role={user.role}
              component={FacNavbar}
            />
            <ReceiverProtected
              exact
              path="/SWDC"
              email={user.email}
              role={user.role}
              component={Receivers}
            />
            <ReceiverProtected
              exact
              path="/GuidanceCounselor"
              email={user.email}
              role={user.role}
              component={Receivers}
            />
            <ReceiverProtected
              path="/SWDC/concern/:id"
              email={user.email}
              role={user.role}
              component={RecForum}
            />
            <ReceiverProtected
              path="/GuidanceCounselor/concern/:id"
              email={user.email}
              role={user.role}
              component={RecForum}
            />
            <ReceiverProtected
              path="/SWDC/updateAccount"
              email={user.email}
              role={user.role}
              component={RecNavbar}
            />
            <ReceiverProtected
              path="/GuidanceCounselor/updateAccount"
              email={user.email}
              role={user.role}
              component={RecNavbar}
            />
          </Switch>
        </ThemeProvider>
      </Router>
    </>
  );
};

export default App;
