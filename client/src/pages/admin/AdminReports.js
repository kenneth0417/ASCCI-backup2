import React, { useEffect, useState } from "react";
import { allConcerns } from "../../actions/concern";
import { useDispatch, useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import moment from "moment";
import { adminCateg } from "../../actions/categories";
import { getSemesters } from "../../actions/semester";
import NativeSelect from "@material-ui/core/NativeSelect";
import Sidebar from "../../components/Sidebar/Sidebar";

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
      <div>
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
      </div>
      {concernLoading ? (
        <Bar
          style={{
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            width: "800px",
            height: "60vh",
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
            width: "800px",
            height: "60vh",
          }}
        />
      )}

      <div style={{ marginTop: "50px" }}>
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
        {semesterLoading ? (
          <Bar
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              width: "800px",
              height: "50vh",
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
              width: "800px",
              height: "50vh",
            }}
          />
        )}
      </div>

      <div style={{ marginTop: "50px" }}>
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
        {categoryLoading ? (
          <Bar
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              width: "800px",
              height: "50vh",
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
              width: "800px",
              height: "50vh",
            }}
          />
        )}
      </div>

      <div style={{ marginTop: "50px" }}>
        {concernLoading ? (
          <Pie
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              width: "800px",
              height: "50vh",
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
              width: "800px",
              height: "50vh",
            }}
          />
        )}
      </div>
      <div style={{ marginTop: "50px" }}>
        {concernLoading ? (
          <Pie
            style={{
              paddingLeft: "0",
              paddingRight: "0",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              width: "800px",
              height: "50vh",
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
              width: "800px",
              height: "50vh",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminReports;
