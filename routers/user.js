const router = require("express").Router();

const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../Controller/verifyToken");
const userController = require("../Controller/user");
//username and password change
router.put("/:id", verifyTokenAndAuth, userController.changePassOrUsername);
//delete user
router.delete("/:id", verifyTokenAndAuth, userController.delete);
//get users
router.get("/find", verifyTokenAndAdmin, userController.getAllUsers);
//delete users
router.delete(
  "/find/deleteNotAdmin",
  verifyTokenAndAdmin,
  userController.deleteAll
);
module.exports = router;
