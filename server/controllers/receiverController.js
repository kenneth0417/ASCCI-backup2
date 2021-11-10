const Concerns = require("../models/concern");
const Users = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const receivedConcern = async (req, res) => {
  const concerns = await Concerns.find();

  res.json(concerns);
};

const getForum = async (req, res) => {
  const { id } = req.params;

  try {
    const forum = await Concerns.findById(id);

    res.status(200).json(forum);
  } catch (error) {
    console.log("Err", error.message);
  }
};

const replyForum = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  const email = reply.email;
  const text = reply.text;
  const attachment = reply.attachment;
  const filename = reply.selectedName;
  const time = new Date().toISOString();

  const allData = { email, text, attachment, time, filename };
  const noAttachment = { email, text, time };
  const noText = { email, attachment, filename, time };

  const concern = await Concerns.findById(id);

  if (attachment && text) {
    concern.attachments.push(attachment);
    concern.forum.push(allData);
  } else if (!attachment && text) {
    concern.forum.push(noAttachment);
  } else if (attachment && !text) {
    concern.attachments.push(attachment);
    concern.forum.push(noText);
  }

  const updatedConcern = await Concerns.findByIdAndUpdate(id, concern, {
    new: true,
  });
  res.json(updatedConcern);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "asccifacilitator@gmail.com", // generated ethereal user
      pass: "ascci123", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: "asccifacilitator@gmail.com", // sender address
    to: updatedConcern.student, // list of receivers
    subject: "Your concern has a new reply.", // Subject line
    html: `<p>Good day!</p><br />
    <h3>This email is from ASCCI : A Student's Concerns System for College of Information and Computing Sciences</h3>
    <p>There is a new reply to one of your concern forums. In order to reply with the concern, please click this <a href="https://ascci-webapp.netlify.app">link</a> and login to your account.</p><br />
    <p>Thank you,</p>
    <h4>ASCCI Team</h4>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

const changeStatus = async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  let date = "";

  if (status !== "Pending") {
    date = new Date().toISOString();
  }

  const setStatus = { status: status, dateEvaluated: date };

  const updatedConcern = await Concerns.findByIdAndUpdate(id, setStatus, {
    new: true,
  });

  res.json(updatedConcern);
};

const getAccount = async (req, res) => {
  const { email } = req.query;

  const account = await Users.findOne({ email: email });

  res.json(account);
};

const updateAccount = async (req, res) => {
  const { id } = req.params;

  const { update } = req.body;

  const updatedDetails = await Users.findByIdAndUpdate(id, update, {
    new: true,
  });

  res.json(updatedDetails);
};

const updatePassword = async (req, res) => {
  const { id } = req.params;

  const { password } = req.body;

  const existingUser = await Users.findById(id);

  const correctPass = await bcrypt.compare(
    password.currentPass,
    existingUser.password
  );

  if (!correctPass)
    return res
      .status(401)
      .json({ errorMessage: "The entered current password is incorrect." });

  if (password.newPass.length < 8 || password.verifyPass.length < 8) {
    return res.status(400).json({
      errorMessage: "The new password should be atleast 8 characters.",
    });
  } else if (password.newPass !== password.verifyPass) {
    return res
      .status(400)
      .json({ errorMessage: "The entered new passwords do not match." });
  } else if (password.newPass === password.verifyPass) {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password.newPass, salt);

    const setPassword = { password: passwordHashed };

    const updatedPassword = await Users.findByIdAndUpdate(id, setPassword, {
      new: true,
    });

    res.json(updatedPassword);
  }
};

module.exports = {
  receivedConcern,
  getForum,
  replyForum,
  changeStatus,
  getAccount,
  updateAccount,
  updatePassword,
};
