const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  deleteAllCartItems,
  getCartDetails,
} = require("../controller/cartController");
// Add item to cart
router.post("/add", addItemToCart);
// Update cart item quantity
router.put("/:itemId", updateCartItem); // Corrected the path by adding curly braces around itemId
// Delete cart item
router.delete("/:itemId", deleteCartItem); // Corrected the path by adding curly braces around itemId
router.delete('/delete/all', deleteAllCartItems);
// Get cart details
router.get("/", getCartDetails);
module.exports = router;

