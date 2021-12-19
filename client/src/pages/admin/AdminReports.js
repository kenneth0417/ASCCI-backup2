import React, { useEffect, useState } from "react";
import { allConcerns } from "../../actions/concern";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import moment from "moment";
import { adminCateg } from "../../actions/categories";
import { getSemesters } from "../../actions/semester";
import NativeSelect from "@material-ui/core/NativeSelect";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Grid, Box } from "@material-ui/core";

const AdminReports = () => {
  const dispatch = useDispatch();
  const { concerns, isLoading: concernLoading } = useSelector(
    (state) => state.concern
  );

  const { category, isLoading: categoryLoading } = useSelector(
    (state) => state.categories
  );

  const { semesters, isLoading: semesterLoading } = useSelector(
    (state) => state.semester
  );

  const concernValues = [];
  const concernFreq = [];
  const categValues = [];
  const categFreq = [];
  const semValues = [];
  const semFreq = [];

  const [time, setTime] = useState("overall");
  const [categ, setCateg] = useState("");
  const [sem, setSem] = useState("");

  const monthlyValues = [];
  const monthlyFreq = [];

  const concLabels = concerns
    .map((concern) => concern.dateCreated)
    .sort()
    .map((concern) => moment(concern).format("MMMM"));

  const monthlyOption = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };
  /* console.log(concLabels); */

  for (let i = 0; i < concLabels.length; i++) {
    let value = concLabels[i];
    if (monthlyValues.includes(value)) {
      let pos = monthlyValues.indexOf(value);
      monthlyFreq[pos] += 1;
    } else {
      monthlyValues.push(value);
      monthlyFreq.push(1);
    }
  }

  /* console.log(monthlyValues);
  console.log(monthlyFreq); */

  const unresValues = [0, 0, 0, 0, 0];
  const pendValues = [0, 0, 0, 0, 0];
  const resValues = [0, 0, 0, 0, 0];

  for (let i = 0; i < concerns.length; i++) {
    let val = concerns[i];
    if (moment(val.dateCreated).format("MMMM").includes("gust")) {
      if (val.status == "Unresolved") {
        unresValues[0] += 1;
      } else if (val.status == "Pending") {
        pendValues[0] += 1;
      } else if (val.status == "Resolved") {
        resValues[0] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("eptember")) {
      if (val.status == "Unresolved") {
        unresValues[1] += 1;
      } else if (val.status == "Pending") {
        pendValues[1] += 1;
      } else if (val.status == "Resolved") {
        resValues[1] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("tober")) {
      if (val.status == "Unresolved") {
        unresValues[2] += 1;
      } else if (val.status == "Pending") {
        pendValues[2] += 1;
      } else if (val.status == "Resolved") {
        resValues[2] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("vember")) {
      if (val.status == "Unresolved") {
        unresValues[3] += 1;
      } else if (val.status == "Pending") {
        pendValues[3] += 1;
      } else if (val.status == "Resolved") {
        resValues[3] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("cember")) {
      if (val.status == "Unresolved") {
        unresValues[4] += 1;
      } else if (val.status == "Pending") {
        pendValues[4] += 1;
      } else if (val.status == "Resolved") {
        resValues[4] += 1;
      }
    }
  }

  /*  console.log(resValues);
  console.log(pendValues);
  console.log(unresValues); */

  const firstValues = [0, 0, 0, 0, 0];
  const secondValues = [0, 0, 0, 0, 0];
  const thirdValues = [0, 0, 0, 0, 0];
  const fourthValues = [0, 0, 0, 0, 0];

  for (let i = 0; i < concerns.length; i++) {
    let val = concerns[i];
    if (moment(val.dateCreated).format("MMMM").includes("gust")) {
      if (val.yearLevel.includes("1st")) {
        firstValues[0] += 1;
      } else if (val.yearLevel.includes("2nd")) {
        secondValues[0] += 1;
      } else if (val.yearLevel.includes("3rd")) {
        thirdValues[0] += 1;
      } else if (val.yearLevel.includes("4th")) {
        fourthValues[0] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("eptember")) {
      if (val.yearLevel.includes("1st")) {
        firstValues[1] += 1;
      } else if (val.yearLevel.includes("2nd")) {
        secondValues[1] += 1;
      } else if (val.yearLevel.includes("3rd")) {
        thirdValues[1] += 1;
      } else if (val.yearLevel.includes("4th")) {
        fourthValues[1] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("tober")) {
      if (val.yearLevel.includes("1st")) {
        firstValues[2] += 1;
      } else if (val.yearLevel.includes("2nd")) {
        secondValues[2] += 1;
      } else if (val.yearLevel.includes("3rd")) {
        thirdValues[2] += 1;
      } else if (val.yearLevel.includes("4th")) {
        fourthValues[2] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("vember")) {
      if (val.yearLevel.includes("1st")) {
        firstValues[3] += 1;
      } else if (val.yearLevel.includes("2nd")) {
        secondValues[3] += 1;
      } else if (val.yearLevel.includes("3rd")) {
        thirdValues[3] += 1;
      } else if (val.yearLevel.includes("4th")) {
        fourthValues[3] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("cember")) {
      if (val.yearLevel.includes("1st")) {
        firstValues[4] += 1;
      } else if (val.yearLevel.includes("2nd")) {
        secondValues[4] += 1;
      } else if (val.yearLevel.includes("3rd")) {
        thirdValues[4] += 1;
      } else if (val.yearLevel.includes("4th")) {
        fourthValues[4] += 1;
      }
    }
  }

  const itValues = [0, 0, 0, 0, 0];
  const isValues = [0, 0, 0, 0, 0];
  const csValues = [0, 0, 0, 0, 0];

  for (let i = 0; i < concerns.length; i++) {
    let val = concerns[i];
    if (moment(val.dateCreated).format("MMMM").includes("gust")) {
      if (val.department.includes("Technology")) {
        itValues[0] += 1;
      } else if (val.department.includes("Systems")) {
        isValues[0] += 1;
      } else if (val.department.includes("Science")) {
        csValues[0] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("eptember")) {
      if (val.department.includes("Technology")) {
        itValues[1] += 1;
      } else if (val.department.includes("Systems")) {
        isValues[1] += 1;
      } else if (val.department.includes("Science")) {
        csValues[1] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("tober")) {
      if (val.department.includes("Technology")) {
        itValues[2] += 1;
      } else if (val.department.includes("Systems")) {
        isValues[2] += 1;
      } else if (val.department.includes("Science")) {
        csValues[2] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("vember")) {
      if (val.department.includes("Technology")) {
        itValues[3] += 1;
      } else if (val.department.includes("Systems")) {
        isValues[3] += 1;
      } else if (val.department.includes("Science")) {
        csValues[3] += 1;
      }
    }

    if (moment(val.dateCreated).format("MMMM").includes("cember")) {
      if (val.department.includes("Technology")) {
        itValues[4] += 1;
      } else if (val.department.includes("Systems")) {
        isValues[4] += 1;
      } else if (val.department.includes("Science")) {
        csValues[4] += 1;
      }
    }
  }

  const monthlyData = {
    labels: monthlyValues.map((month) => {
      return `${month} 2021`;
    }),
    datasets: [
      {
        label: "Unresolved",
        data: unresValues,
        backgroundColor: "#de425b",
        stack: "Stack 0",
      },
      {
        label: "Pending",
        data: pendValues,
        backgroundColor: "#fcbe6e",
        stack: "Stack 0",
      },
      {
        label: "Resolved",
        data: resValues,
        backgroundColor: "#6b9a36",
        stack: "Stack 0",
      },
      {
        label: "1st Year",
        data: firstValues,
        backgroundColor: "#007A53",
        stack: "Stack 1",
      },
      {
        label: "2nd Year",
        data: secondValues,
        backgroundColor: "#F0EAE8",
        stack: "Stack 1",
      },
      {
        label: "3rd Year",
        data: thirdValues,
        backgroundColor: "#DA291C",
        stack: "Stack 1",
      },
      {
        label: "4th Year",
        data: fourthValues,
        backgroundColor: "#9EA1E9",
        stack: "Stack 1",
      },
      {
        label: "Information Technology",
        data: itValues,
        backgroundColor: "#9EC8F8",
        stack: "Stack 2",
      },
      {
        label: "Information Systems",
        data: isValues,
        backgroundColor: "#FFE599",
        stack: "Stack 2",
      },
      {
        label: "Computer Science",
        data: csValues,
        backgroundColor: "#FEC00F",
        stack: "Stack 2",
      },
    ],
  };

  const semesterData = {
    labels: semValues,
    datasets: [
      {
        label: sem,
        data: semFreq,
        backgroundColor: ["rgba(255, 206, 86, 0.6)"],
      },
    ],
  };

  if (sem) {
    const acad = concerns.filter((conc) => conc.acadYear === sem);

    const semDates = acad
      .map((test) => test.dateCreated)
      .sort()
      .map((test) => moment(test).format("LL"));

    for (let i = 0; i < semDates.length; i++) {
      let value = semDates[i];
      if (semValues.includes(value)) {
        let pos = semValues.indexOf(value);
        semFreq[pos] += 1;
      } else {
        semValues.push(value);
        semFreq.push(1);
      }
    }
  }

  const concern = {
    labels: concernValues,
    datasets: [
      {
        label: "Concerns",
        data: concernFreq,
        backgroundColor: ["rgba(54, 162, 235, 0.6)"],
      },
    ],
  };

  const categoryData = {
    labels: categValues,
    datasets: [
      {
        label: categ,
        data: categFreq,
        backgroundColor: ["rgba(255, 206, 86, 0.6)"],
      },
    ],
  };

  if (time === "overall") {
    const sort = concerns.map((concern) => concern.dateCreated);
    const sorted = sort.sort().map((date) => moment(date).format("LL"));

    for (let i = 0; i < sorted.length; i++) {
      let value = sorted[i];
      if (concernValues.includes(value)) {
        let pos = concernValues.indexOf(value);
        concernFreq[pos] += 1;
      } else {
        concernValues.push(value);
        concernFreq.push(1);
      }
    }
  } else if (time === "weekly") {
    const cutOffDate = moment().subtract(7, "days");

    const sort = concerns.map((concern) => concern.dateCreated);
    const sorted = sort
      .sort()
      .filter((sor) => moment(sor) > cutOffDate)
      .map((sor) => moment(sor).format("LL"));

    for (let i = 0; i < sorted.length; i++) {
      let value = sorted[i];
      if (concernValues.includes(value)) {
        let pos = concernValues.indexOf(value);
        concernFreq[pos] += 1;
      } else {
        concernValues.push(value);
        concernFreq.push(1);
      }
    }
  } else if (time === "monthly") {
    const cutOffDate = moment().subtract(30, "days");

    const sort = concerns.map((concern) => concern.dateCreated);
    const sorted = sort
      .sort()
      .filter((sor) => moment(sor) > cutOffDate)
      .map((sor) => moment(sor).format("LL"));

    for (let i = 0; i < sorted.length; i++) {
      let value = sorted[i];
      if (concernValues.includes(value)) {
        let pos = concernValues.indexOf(value);
        concernFreq[pos] += 1;
      } else {
        concernValues.push(value);
        concernFreq.push(1);
      }
    }
  }

  if (categ) {
    const tests = concerns.filter((concern) => concern.category === categ);

    const categDates = tests
      .map((test) => test.dateCreated)
      .sort()
      .map((test) => moment(test).format("LL"));

    for (let i = 0; i < categDates.length; i++) {
      let value = categDates[i];
      if (categValues.includes(value)) {
        let pos = categValues.indexOf(value);
        categFreq[pos] += 1;
      } else {
        categValues.push(value);
        categFreq.push(1);
      }
    }
  }

  const departmentValues = [0, 0, 0];

  const dept = concerns.map((concern) => concern.department);

  for (let i = 0; i < dept.length; i++) {
    if (dept[i].includes("Science")) {
      departmentValues[0] += 1;
    } else if (dept[i].includes("Technology")) {
      departmentValues[1] += 1;
    } else if (dept[i].includes("Systems")) {
      departmentValues[2] += 1;
    }
  }

  const departmentData = {
    labels: [
      "Computer Science",
      "Information Technology",
      "Information Systems",
    ],
    datasets: [
      {
        label: "Departments",
        data: departmentValues,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const statusValues = [0, 0, 0];

  const concernStatus = concerns.map((concern) => concern.status);

  for (let i = 0; i < concernStatus.length; i++) {
    if (concernStatus[i].includes("Pending")) {
      statusValues[0] += 1;
    } else if (concernStatus[i].includes("Resolved")) {
      statusValues[1] += 1;
    } else if (concernStatus[i].includes("Unresolved")) {
      statusValues[2] += 1;
    }
  }

  const statusData = {
    labels: ["Pending", "Resolved", "Unresolved"],
    datasets: [
      {
        label: "Departments",
        data: statusValues,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    dispatch(allConcerns());
    dispatch(adminCateg());
    dispatch(getSemesters());
  }, [dispatch]);
  return (
    <div>
      <Sidebar name="Reports" />
      <br />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component={Grid}
          item
          lg={2}
          display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
        ></Box>
        <Grid item sm={12} md={8} style={{ padding: "20px" }}>
          <Box
            style={{
              backgroundColor: "#D8D9F6",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            textAlign="center"
            border={2}
            borderLeft={2}
            borderRight={2}
            borderColor="black"
          >
            Graph of Concerns
          </Box>
          <Box
            style={{
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <Bar
              data={monthlyData}
              style={{
                paddingLeft: "0",
                paddingRight: "0",
                marginLeft: "10px",
                marginRight: "10px",
                display: "block",
                width: "700px",
                height: "80vh",
              }}
              options={monthlyOption}
            />
          </Box>
        </Grid>

        <Box
          component={Grid}
          item
          lg={2}
          display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
        ></Box>

        <Grid item sm={12} md={6} style={{ padding: "20px" }}>
          <Box
            style={{
              backgroundColor: "#D8D9F6",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            textAlign="center"
            border={2}
            borderLeft={2}
            borderRight={2}
            borderColor="black"
          >
            Graph of Concerns (Overall, Monthly or Weekly)
          </Box>
          <Box
            style={{
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <center>
              <NativeSelect
                value={time}
                onChange={(e) => setTime(e.target.value)}
                inputProps={{
                  name: "age",
                  id: "age-native-label-placeholder",
                }}
              >
                <option value="overall">Overall</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </NativeSelect>
            </center>
            {concernLoading ? (
              <Bar
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "600px",
                  height: "40vh",
                }}
              />
            ) : (
              <Bar
                data={concern}
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "600px",
                  height: "40vh",
                }}
              />
            )}
          </Box>
        </Grid>

        <Grid item sm={12} md={6} style={{ padding: "20px" }}>
          <Box
            style={{
              backgroundColor: "#D8D9F6",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            textAlign="center"
            border={2}
            borderLeft={2}
            borderRight={2}
            borderColor="black"
          >
            Concerns per Semester
          </Box>
          <Box
            style={{
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <center>
              <NativeSelect
                value={sem}
                onChange={(e) => setSem(e.target.value)}
                inputProps={{
                  name: "age",
                  id: "age-native-label-placeholder",
                }}
              >
                <option style={{ display: "none" }}>Select a semester</option>
                {semesters.map((sem, idx) => (
                  <option key={idx}>{sem.acadYear}</option>
                ))}
              </NativeSelect>
            </center>
            {semesterLoading ? (
              <Bar
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "600px",
                  height: "40vh",
                }}
              />
            ) : (
              <Bar
                data={semesterData}
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "600px",
                  height: "40vh",
                }}
              />
            )}
          </Box>
        </Grid>
        <Box
          component={Grid}
          item
          lg={3}
          display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
        ></Box>
        <Grid item lg={6} style={{ padding: "10px" }}>
          <Box
            style={{
              backgroundColor: "#D8D9F6",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            textAlign="center"
            border={2}
            borderLeft={2}
            borderRight={2}
            borderColor="black"
          >
            Concerns per Category
          </Box>
          <Box
            style={{
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            <center>
              <NativeSelect
                value={categ}
                onChange={(e) => setCateg(e.target.value)}
                inputProps={{
                  name: "age",
                  id: "age-native-label-placeholder",
                }}
              >
                <option style={{ display: "none" }}>Select a category</option>
                {category.map((categ, idx) => (
                  <option key={idx}>{categ.category}</option>
                ))}
              </NativeSelect>
            </center>
            {categoryLoading ? (
              <Bar
                style={{
                  paddingTop: "10px",
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "600px",
                  height: "40vh",
                }}
              />
            ) : (
              <Bar
                data={categoryData}
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "600px",
                  height: "40vh",
                }}
              />
            )}
          </Box>
        </Grid>
        <Box
          component={Grid}
          item
          lg={3}
          display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
        ></Box>
        <Grid item sm={12} md={6} style={{ padding: "20px" }}>
          <Box
            style={{
              backgroundColor: "#D8D9F6",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            textAlign="center"
            border={2}
            borderLeft={2}
            borderRight={2}
            borderColor="black"
          >
            Concerns per Department
          </Box>
          <Box
            style={{
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            {concernLoading ? (
              <Pie
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "500px",
                  height: "30vh",
                }}
              />
            ) : (
              <Pie
                data={departmentData}
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "500px",
                  height: "30vh",
                }}
              />
            )}
          </Box>
        </Grid>
        <Grid item sm={12} md={6} style={{ padding: "20px" }}>
          <Box
            style={{
              backgroundColor: "#D8D9F6",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
            textAlign="center"
            border={2}
            borderLeft={2}
            borderRight={2}
            borderColor="black"
          >
            Concerns per Status
          </Box>
          <Box
            style={{
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
          >
            {concernLoading ? (
              <Pie
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "500px",
                  height: "30vh",
                }}
              />
            ) : (
              <Pie
                data={statusData}
                style={{
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                  width: "500px",
                  height: "30vh",
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <br />
    </div>
  );
};

export default AdminReports;
