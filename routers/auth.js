const router = require("express").Router();

const authController = require("../Controller/auth");
//register
router.post("/userregister", authController.createUser);
//login
router.post("/userlogin", authController.userLogin);
//*  @route  POST /users/forget-password
router.post("/forget-password", authController.handleForgetPassword);
router.post("/reset-password/:token", authController.handleResetPassword);
module.exports = router;
