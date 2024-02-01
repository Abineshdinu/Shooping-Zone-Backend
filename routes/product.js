const express = require("express");
const {
  getproducts,
  newProduct,
  updateproduct,
  deleteproduct,
  getById,
} = require("../Controllers/productController");
const router = express.Router();

router.route("/products").get(getproducts);
router.route("/product/:id").get(getById);
router.route("/product/new").post(newProduct);
router.route("/product/:id").put(updateproduct);
router.route("/product/:id").delete(deleteproduct);

module.exports = router;
