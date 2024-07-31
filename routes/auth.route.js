const express = require("express");
const {
  signUp,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/auth.controller");
const { signIn } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/getall", getUsers);
router.get("/get/:userId", getUser);
router.delete("/delete/:userId", deleteUser);

module.exports = router;
