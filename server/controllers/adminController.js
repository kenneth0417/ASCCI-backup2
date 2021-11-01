const Categories = require("../models/categories");
const Concerns = require("../models/concern");
const Semesters = require("../models/semester");
const bcrypt = require("bcrypt");
const Users = require("../models/user");
const validator = require("validator");

const addCategory = async (req, res) => {
  const { category, identifier, definition } = req.body;

  const existingCateg = await Categories.findOne({ category });
  const existingId = await Categories.findOne({ identifier });

  if (existingCateg)
    return res
      .status(400)
      .json({ errorMessage: "Category Name already exists." });
  if (existingId)
    return res
      .status(400)
      .json({ errorMessage: "Category Identifier already exists." });

  const newCateg = new Categories({ category, identifier, definition });

  const savedCateg = await newCateg.save();

  res.json(savedCateg);
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, verifyPass, role, picture } =
      req.body;

    // validation

    if (!validator.isEmail(email))
      return res
        .status(400)
        .json({ errorMessage: "The entered email is invalid." });

    if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName))
      return res
        .status(400)
        .json({ errorMessage: "The name must only contain letters." });

    if (password.length < 8)
      return res.status(400).json({
        errorPass: "Please enter a password of at least 8 characters.",
      });

    if (password !== verifyPass)
      return res.status(400).json({
        errorPass: "The entered passwords do not match.",
      });

    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        errorMessage: "The entered email is already existing.",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: passwordHashed,
      role,
      picture,
    });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

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

const getCategories = async (req, res) => {
  const categories = await Categories.find();

  res.status(200).json(categories);
};

const getSearch = async (req, res) => {
  const { search } = req.query;

  const title = new RegExp(search, "i");

  const concerns = await Concerns.find({ $or: [{ subject: title }] });

  res.json(concerns);
};

const getAccounts = async (req, res) => {
  const accounts = await Users.find();

  res.json(accounts);
};

const deleteAccount = async (req, res) => {
  const { id } = req.params;

  await Users.findByIdAndDelete(id);

  const updated = await Users.find();

  res.json(updated);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await Categories.findByIdAndDelete(id);

  const updated = await Categories.find();

  res.json(updated);
};

const sortByCateg = async (req, res) => {
  const { sort } = req.query;

  const sorted = await Concerns.find({
    $or: [{ category: sort }, { status: sort }],
  });

  res.json(sorted);
};

const searchAccount = async (req, res) => {
  const { search } = req.query;

  const title = new RegExp(search, "i");

  const users = await Users.find({
    $or: [{ firstName: title }, { lastName: title }, { email: title }],
  });

  res.json(users);
};

const searchCategory = async (req, res) => {
  const { search } = req.query;

  const title = new RegExp(search, "i");

  const categs = await Categories.find({
    $or: [{ category: title }, { identifier: title }],
  });

  res.json(categs);
};

const createSemester = async (req, res) => {
  const { semester } = req.body;

  const newSem = new Semesters({ acadYear: semester });

  const savedSem = await newSem.save();

  res.json(savedSem);
};

const getSemester = async (req, res) => {
  const semesters = await Semesters.find();

  res.json(semesters);
};

const selectSemester = async (req, res) => {
  const { selected } = req.body;

  const update = { isActive: true };

  await Semesters.findOneAndUpdate(
    { isActive: true },
    { isActive: false },
    { new: true }
  );

  const selectedSem = await Semesters.findOneAndUpdate(
    { acadYear: selected },
    update,
    { new: true }
  );

  const latest = await Semesters.find();

  res.json(latest);
};

module.exports = {
  addCategory,
  register,
  getConcerns,
  getForum,
  replyForum,
  changeStatus,
  getAccount,
  updateAccount,
  updatePassword,
  getCategories,
  getSearch,
  getAccounts,
  deleteAccount,
  deleteCategory,
  sortByCateg,
  searchAccount,
  searchCategory,
  createSemester,
  getSemester,
  selectSemester,
};
