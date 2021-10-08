const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/facilitatorController");

router.get("/", getConcerns);
router.get("/concern/:id", getForum);
router.post("/concern/:id/reply", replyForum);
router.patch("/concern/:id/status", changeStatus);
router.get("/getAccount", getAccount);
router.patch("/updateAccount/:id", updateAccount);
router.patch("/updatePassword/:id", updatePassword);
router.post("/sendEmail", sendEmail);
router.get("/search", getSearch);
router.get("/sort", sortByCateg);
router.get("/categories", getCategories);
router.get("/getHelper", getHelpers);

module.exports = router;
