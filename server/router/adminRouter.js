const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/adminController");

router.get("/", getConcerns);
router.get("/concern/:id", getForum);
router.post("/concern/:id/reply", replyForum);
router.post("/addCategory", addCategory);
router.post("/register", register);
router.patch("/concern/:id/status", changeStatus);
router.get("/getAccount", getAccount);
router.patch("/updateAccount/:id", updateAccount);
router.patch("/updatePassword/:id", updatePassword);
router.get("/categories", getCategories);
router.get("/search", getSearch);
router.get("/accounts", getAccounts);
router.delete("/deleteAcc/:id", deleteAccount);
router.delete("/deleteCateg/:id", deleteCategory);
router.get("/sort", sortByCateg);
router.get("/searchAcc", searchAccount);
router.get("/searchCateg", searchCategory);
router.post("/createSem", createSemester);
router.get("/getSem", getSemester);
router.patch("/selectSem", selectSemester);

module.exports = router;
