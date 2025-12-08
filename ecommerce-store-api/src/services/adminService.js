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
 * Method to generate a coupon code for every Nth order
 * @returns {String} Generated coupon code
 */
exports.generateCouponCode = () => {
  const { orders } = store;

  if (orders.length === 0) {
    throw new Error("No previous orders found to generate discount code");
  }

  if (orders.length % NTH_ORDER_DISCOUNT != 0) {
    throw new Error(
      `No discount code generated. Place ${
        NTH_ORDER_DISCOUNT - (orders.length % NTH_ORDER_DISCOUNT)
      } more orders to receive a discount code.`
    );
  }

  const code = generateCode();
  store?.coupons.push({
    code,
    used: false,
  });

  // Clear the first N orders from the cart after generating a discount code
  clearNOrders();

  return code;
};
