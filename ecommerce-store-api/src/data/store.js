/**
 * In-memory data store for the e-commerce application.
 */

module.exports = {
  cart: [],
  orders: [],
  coupons: [],
  orderCount: 0,
  N: 5, // every 5th order triggers coupon
};
