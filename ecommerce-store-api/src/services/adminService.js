const { NTH_ORDER_DISCOUNT } = require("../constansts");
const store = require("../data/store");
const { generateCode } = require("../utils/codeGenerator");
const { clearNOrders } = require("./cartService");

/**
 * Method to get all coupon codes
 * @returns {Array} List of coupon codes
 */
exports.getCouponCodes = () => {
  return store.coupons || [];
};

/**
 * Method to get coupon generation status and remaining orders needed
 * @returns {Object} Object with generation status information
 */
exports.generateCouponCode = () => {
  const { orders } = store;

  if (orders.length === 0) {
    throw new Error("No previous orders found");
  }

  // Calculate how many coupons should have been generated based on orders
  const expectedCoupons = Math.floor(orders.length / NTH_ORDER_DISCOUNT);
  const generatedCoupons = store.totalCouponsGenerated;
  const ordersNeeded =
    NTH_ORDER_DISCOUNT - (orders.length % NTH_ORDER_DISCOUNT);

  // Return information about coupon generation status
  return {
    totalOrders: orders.length,
    generatedCoupons: generatedCoupons,
    expectedCoupons: expectedCoupons,
    ordersNeeded: ordersNeeded,
    nextCouponAt: (generatedCoupons + 1) * NTH_ORDER_DISCOUNT,
  };
};
