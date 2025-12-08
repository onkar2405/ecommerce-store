const store = require("../data/store");

const {
  getCouponCodes,
  generateCouponCode,
} = require("../services/adminService");

/**
 * Generates a discount code for every Nth order.
 */
exports.generateDiscount = (req, res) => {
  const { orders } = store;

  if (orders.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No orders found to generate discount code",
    });
  }

  try {
    return res.status(200).json({
      success: true,
      code: generateCouponCode(),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Method to get all coupon codes
 */
exports.getCouponCodes = (req, res) => {
  try {
    const coupons = getCouponCodes();
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving coupon codes",
      error: error.message,
    });
  }
};
