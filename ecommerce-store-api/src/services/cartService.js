const store = require("../data/store");

/**
 * Method to add an item to the cart
 * @param {*} item item to be added to the cart
 * @returns {Array} The updated cart items
 */
exports.addItem = (item) => {
  for (let cartItem of store.cart) {
    if (cartItem.productId === item.productId) {
      cartItem.quantity += Number(item.quantity);
      cartItem.price += Number(item.price) * Number(item.quantity);
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
