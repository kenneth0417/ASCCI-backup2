import React from "react";
import HomeIcon from "@material-ui/icons/HomeRounded";
import ListRoundedIcon from "@material-ui/icons/ListRounded";
import SettingsIcon from "@material-ui/icons/Settings";
import EqualizerRoundedIcon from "@material-ui/icons/EqualizerRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EmailIcon from "@material-ui/icons/Email";

export const StudentData = [
  {
    title: "Concerns",
    path: "/Student/",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Add Concern",
    path: "/Student/concern",
    icon: <NoteAddRoundedIcon />,
    cName: "nav-text",
  },
  {
    title: "Categories",
    path: "/Student/categories",
    icon: <ListRoundedIcon />,
    cName: "nav-text",
  },
];
export const AdminData = [
  {
    title: "Concerns",
    path: "/Admin",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Categories",
    path: "/Admin/categories",
    icon: <NoteAddRoundedIcon />,
    cName: "nav-text",
  },
  {
    title: "Reports",
    path: "/Admin/reports",
    icon: <EqualizerRoundedIcon />,
    cName: "nav-text",
  },
  {
    title: "Accounts",
    path: "/Admin/accounts",
    icon: <PeopleAltRoundedIcon />,
    cName: "nav-text",
  },
  {
    title: "Semester",
    path: "/Admin/semester",
    icon: <CalendarTodayIcon />,
    cName: "nav-text",
  },
  {
    title: "Email",
    path: "/Admin/email",
    icon: <EmailIcon />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/Admin/updateAccount",
    icon: <SettingsIcon />,
    cName: "nav-text",
  },
];

export const FacilitatorData = [
  {
    title: "Concerns",
    path: "/Facilitator",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/Facilitator/updateAccount",
    icon: <SettingsIcon />,
    cName: "nav-text",
  },
];

export const ReceiversData = [
  {
    title: "Concerns",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    cName: "nav-text",
  },
];
