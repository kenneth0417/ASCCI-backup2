const Concerns = require("../models/concern");
const Categories = require("../models/categories");

const getConcerns = async (req, res) => {
  const { email } = req.query;

  const concerns = await Concerns.find({ student: email });

  res.status(200).json(concerns);
};

const getCategories = async (req, res) => {
  const categories = await Categories.find();

  res.status(200).json(categories);
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

const createConcern = async (req, res) => {
  const concern = req.body;
  const year = new Date().getFullYear();

  const categories = await Categories.findOne({
    identifier: concern.conCategory,
  });
  const categ = categories.category;

  try {
    Concerns.countDocuments({}, async (err, count) => {
      if (err) return console.log(err.message);

      const ticket = `${year}-${concern.conCategory}-${count}`;

      const newConcern = new Concerns({
        ticket,
        ...concern,
        category: categ,
        dateCreated: new Date().toISOString(),
      });

      const email = concern.student;
      const text = concern.body;
      const attachment = concern.attachment;
      const filename = concern.filename;
      const time = new Date().toISOString();

      const testing = { email, text, time, filename, attachment };

      newConcern.forum.push(testing);
      newConcern.attachments.push(attachment);
      await newConcern.save();

      res.json(newConcern);
    });
  } catch (error) {
    console.log("Err", error.message);
  }
};

module.exports = {
  createConcern,
  getConcerns,
  getCategories,
  getForum,
  replyForum,
};
