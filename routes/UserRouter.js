const express = require("express");
const router = express.Router();

const {
  getUserById,
  login,
  register,
} = require("../controllers/UserController");

router.get("/:id", getUserById);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
