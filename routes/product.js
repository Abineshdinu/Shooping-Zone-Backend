const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../Middlewares/authenticate");
const {
  getproducts,
  newProduct,
  updateproduct,
  deleteproduct,
  getById,
} = require("../Controllers/productController");
const router = express.Router();

router.route("/products").get(getproducts);
router.route("/product/:id").get(isAuthenticatedUser, getById);
router.route("/product/new").post(isAuthenticatedUser, newProduct);
router.route("/product/:id").put(isAuthenticatedUser, updateproduct);
router.route("/product/:id").delete(isAuthenticatedUser, deleteproduct);

//admim routes
router
  .route("admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

module.exports = router;
