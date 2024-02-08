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

router
  .route("/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getproducts);
router
  .route("/product/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getById);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateproduct);
router
  .route("/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteproduct);

module.exports = router;
