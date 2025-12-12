const store = require("../data/store");

exports.checkoutItems = (req) => {
  const items = store.cart;
  let discountAmount = 0;
  const couponCode = req?.body?.couponCode;

  if (items.length === 0) {
    throw new Error("Cart is empty");
  }

  const total = calculateTotal(items);
  const itemDetails = getItemDetails(items);
  const validCoupon = store.discounts?.find(
    (discount) => discount.code === couponCode
  );

  if (couponCode && !validCoupon) {
    if (!validCoupon) {
      throw new Error("Invalid coupon code");
    }

    if (validCoupon.used) {
      throw new Error("Coupon code has already been used");
    }
  }

  if (validCoupon) {
    validCoupon.used = true;
    discountAmount = total * 0.1; // 10% discount
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
