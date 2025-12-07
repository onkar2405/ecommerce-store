const express = require("express");
const router = express.Router();

const { checkoutItems } = require("../controllers/checkoutController");

// Route to handle checkout of items
router.post("/", checkoutItems);

module.exports = router;
