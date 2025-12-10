const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/discount/generate", adminController.generateDiscount);

module.exports = router;
