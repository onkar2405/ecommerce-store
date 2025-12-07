const express = require("express");
const router = express.Router();

const {
  addItemsToCart,
  getCartItems,
} = require("../controllers/cartControllers");

// Route to add items to the cart
router.post("/add", addItemsToCart);

// Route to get all items in the cart
router.get("/", getCartItems);
module.exports = router;
