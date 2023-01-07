const router = require("express").Router();

const orderController = require("../Controller/order");
const {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require("../Controller/verifyToken");
//create
router.post("/", verifyToken, orderController.create);
//update
router.put("/:id", verifyTokenAndAdmin, orderController.update);
//get delete
router.delete("/:id", verifyTokenAndAdmin, orderController.delete);
//GEt user orders
router.get("/find/:userId", verifyTokenAndAuth, orderController.userOrders);
//GEt all orders
router.get("/", verifyTokenAndAdmin, orderController.getAll);
module.exports = router;
