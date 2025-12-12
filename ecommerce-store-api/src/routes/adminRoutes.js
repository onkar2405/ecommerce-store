const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.post("/discount/generate", adminController.generateDiscount);
router.get("/coupons", adminController.getCouponCodes);

module.exports = router;
