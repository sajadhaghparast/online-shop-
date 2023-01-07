const router = require("express").Router();

const { verifyTokenAndAdmin } = require("../Controller/verifyToken");
const productController = require("../Controller/product");

//create product
router.post("/", verifyTokenAndAdmin, productController.create);
// update product
router.put("/:id", verifyTokenAndAdmin, productController.update);
//delete product
router.delete("/:id", verifyTokenAndAdmin, productController.delete);
module.exports = router;
