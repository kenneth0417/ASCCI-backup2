const express = require("express");
const router = express.Router();

const {
  googleLogin,
  loggedIn,
  login,
  requestReset,
  resetPassword,
  logoutAccount,
} = require("../controllers/userController");

router.post("/googlelogin", googleLogin);
router.get("/loggedin", loggedIn);
router.post("/login", login);
router.post("/reset", requestReset);
router.post("/reset/:id", resetPassword);
router.get("/logout", logoutAccount);

module.exports = router;
