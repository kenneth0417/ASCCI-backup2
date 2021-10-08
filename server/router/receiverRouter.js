const express = require("express");
const router = express.Router();

const {
  receivedConcern,
  getForum,
  replyForum,
  changeStatus,
  getAccount,
  updateAccount,
  updatePassword,
} = require("../controllers/receiverController");

router.get("/", receivedConcern);
router.get("/concern/:id", getForum);
router.post("/concern/:id/reply", replyForum);
router.patch("/concern/:id/status", changeStatus);
router.get("/getAccount", getAccount);
router.patch("/updateAccount/:id", updateAccount);
router.patch("/updatePassword/:id", updatePassword);

module.exports = router;
