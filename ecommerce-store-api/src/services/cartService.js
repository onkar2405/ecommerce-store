const { NTH_ORDER_DISCOUNT } = require("../constansts");
const store = require("../data/store");

/**
 * Method to add an item to the cart
 * @param {*} item item to be added to the cart
 * @returns {Array} The updated cart items
 */
exports.addItem = (item) => {
  for (let cartItem of store.cart) {
    if (cartItem.productId === item.productId) {
      cartItem.quantity = Number(item.quantity);
      return store.cart;
    }
  }

  store.cart.push({
    ...item,
    price: Number(item.price),
    quantity: Number(item.quantity),
  });

  return store.cart;
};

/**
 * Method to get all items in the cart
 * @returns {Array} The current items in the cart
 */
exports.getCart = () => {
  return store.cart;
};

/**
 * Method to remove the first 5 orders from the cart
 */
exports.clearNOrders = () => {
  try {
    const cart = store.cart;
    // Remove the first 5 items from the cart (or all if less than 5)
    const itemsToRemove = Math.min(NTH_ORDER_DISCOUNT, cart.length);
    cart.splice(0, itemsToRemove);
  } catch (error) {
    console.error("Error clearing orders from cart:", error);
  }
};
