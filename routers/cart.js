const router = require("express").Router();

const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../Controller/verifyToken");
const cartController = require("../Controller/cart");
//UPDATE
router.put("/:id", verifyTokenAndAuth, cartController.update);
//delete Cart
router.delete("/:id", verifyTokenAndAuth, cartController.delete);
//get Usercart
router.get("/find/:userid", verifyTokenAndAuth, cartController.getUser);
//GEt all users Carts
router.get("/", verifyTokenAndAdmin, cartController.getAllUsers);
module.exports = router;
