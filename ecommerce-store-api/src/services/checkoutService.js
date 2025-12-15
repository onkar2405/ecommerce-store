const store = require("../data/store");
const { NTH_ORDER_DISCOUNT } = require("../constansts");
const { generateCode } = require("../utils/codeGenerator");
const { clearNOrders } = require("./cartService");

exports.checkoutItems = (req) => {
  const items = store.cart;
  let discountAmount = 0;
  let discountPercentage = 0;
  const couponCode = req?.body?.couponCode;

  if (items.length === 0) {
    throw new Error("Cart is empty");
  }

  const total = calculateTotal(items);
  const itemDetails = getItemDetails(items);
  const validCoupon = store.coupons?.find(
    (coupon) => coupon.code === couponCode
  );

  if (couponCode && !validCoupon) {
    throw new Error("Invalid coupon code");
  }

  if (validCoupon && validCoupon.used) {
    throw new Error("Coupon code has already been used");
  }

  if (validCoupon) {
    validCoupon.used = true;
    discountPercentage = validCoupon.discountPercentage || 10;
    discountAmount = total * (discountPercentage / 100);

    // Remove the used coupon from store by finding it by code
    const couponIndex = store.coupons.findIndex(
      (coupon) => coupon.code === validCoupon.code
    );
    if (couponIndex > -1) {
      store.coupons.splice(couponIndex, 1);
    }
  }
  const order = {
    id: new Date().getTime().toString() + 1,
    items: itemDetails,
    total: total - discountAmount,
    subTotal: total,
    discount: discountAmount,
    date: new Date(),
    user: "Guest",
    paymentMerthod: items.paymentMerthod || "Cash on Delivery",
  };

  store.orders.push(order);

  // Clear the cart after checkout
  store.cart = [];

  // Generate coupon code if every Nth order is reached
  generateCouponAfterCheckout();
};

/**
 * Method to get order history
 * @returns {Array} The list of past orders
 */
exports.getOrderHistory = () => {
  try {
    return store.orders;
  } catch (error) {
    console.error("Error retrieving order history:", error);
    throw new Error("Could not retrieve order history");
  }
};

/**
 * Method to calculate the total price of items.
 * @param {*} items items to calculate the total for
 * @returns {Number} The total price of the items
 */
function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

/**
 * Method to get item names and quantities
 * @param {*} items items to extract names from
 * @returns  {Array} The names and quantities of the items
 */
function getItemDetails(items) {
  let names = [];

  items.forEach((element) => {
    names.push({
      name: element.name,
      quantity: element.quantity,
    });
  });

  return names;
}

/**
 * Method to generate a coupon code after every Nth order
 * Called automatically after checkout
 * @returns {void}
 */
function generateCouponAfterCheckout() {
  const { orders } = store;

  // Calculate how many coupons should have been generated based on orders
  const expectedCoupons = Math.floor(orders.length / NTH_ORDER_DISCOUNT);
  const generatedCoupons = store.totalCouponsGenerated;

  // Generate a new coupon if we've reached a new milestone
  if (generatedCoupons < expectedCoupons) {
    const code = generateCode();
    const discountPercentage = 10; // Default 10% discount
    store?.coupons.push({
      code,
      discountPercentage,
      used: false,
    });
    store.totalCouponsGenerated++;

    // Clear the first N orders from the cart after generating a discount code
    clearNOrders();
  }
}
