const express = require("express");
const router = express.Router();

const {
  checkoutItems,
  getOrderHistory,
} = require("../controllers/checkoutController");

// Route to handle checkout of items
router.post("/", checkoutItems);
router.get("/orders", getOrderHistory);

module.exports = router;
