const express = require("express");
const router = express.Router();

const {
  createConcern,
  getConcerns,
  getCategories,
  getForum,
  replyForum,
  getSemester,
} = require("../controllers/studentController");

router.get("/", getConcerns);
router.get("/categories", getCategories);
router.get("/concern/:id", getForum);
router.post("/concern/:id/reply", replyForum);
router.post("/create", createConcern);
router.get("/getSem", getSemester);

module.exports = router;
