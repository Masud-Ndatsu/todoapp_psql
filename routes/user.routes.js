const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
} = require("../controllers/user.controller");
const { verifyUserToken } = require("../middlewares/auth");

router.post("/", createUser);
router.post("/login", loginUser);
router.use("/", verifyUserToken);
router.get("/", getUsers);
router.get("/me", getUserById);
router.put("/me/update", updateUserById);
router.delete("/me/delete", deleteUserById);

module.exports = router;
