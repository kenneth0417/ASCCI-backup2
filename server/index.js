const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const userRouter = require("./router/userRouter");
const studentRouter = require("./router/studentRouter");
const adminRouter = require("./router/adminRouter");
const facilitatorRouter = require("./router/facilitatorRouter");
const receiverRouter = require("./router/receiverRouter");

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://ascci-webapp.netlify.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send(
    "ASCCI: A Web Application of Student's Concerns for the College of Information and Computing Sciences."
  );
});

app.use("/auth", userRouter);
app.use("/receivers", receiverRouter);
app.use("/Student", studentRouter);
app.use("/Admin", adminRouter);
app.use("/Facilitator", facilitatorRouter);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`))
  );
