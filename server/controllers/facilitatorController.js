const Concerns = require("../models/concern");
const Categories = require("../models/categories");
const bcrypt = require("bcrypt");
const Users = require("../models/user");
const nodemailer = require("nodemailer");

const getConcerns = async (req, res) => {
  const concern = await Concerns.find();

  res.status(200).json(concern);
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

const getHelpers = async (req, res) => {
  const existing = await Users.find();

  res.status(200).json(existing);
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
};

const changeStatus = async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const setStatus = { status: status };

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

const sendEmail = async (req, res) => {
  const { content, id } = req.body;

  const sendConcern = { receiver: content.to };

  const emailSent = await Concerns.findByIdAndUpdate(id, sendConcern, {
    new: true,
  });

  res.json(emailSent);

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
    to: content.to, // list of receivers
    subject: "ASCCI", // Subject line
    html: `<b>${content.subject}, ${content.body}, ${content.student}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

const getSearch = async (req, res) => {
  const { search } = req.query;

  const title = new RegExp(search, "i");

  const concerns = await Concerns.find({ $or: [{ subject: title }] });

  res.json(concerns);
};

const sortByCateg = async (req, res) => {
  const { sort } = req.query;

  const sorted = await Concerns.find({
    $or: [{ category: sort }, { status: sort }],
  });

  res.json(sorted);
};

const getCategories = async (req, res) => {
  const categories = await Categories.find();

  res.status(200).json(categories);
};

module.exports = {
  getConcerns,
  getForum,
  replyForum,
  changeStatus,
  getAccount,
  updateAccount,
  updatePassword,
  sendEmail,
  getSearch,
  sortByCateg,
  getCategories,
  getHelpers,
};
