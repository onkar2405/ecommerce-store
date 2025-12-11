const { NTH_ORDER_DISCOUNT } = require("../constansts");
const cartService = require("../services/cartService");

/**
 * Method to add items to the cart
 * @param {*} req  Request object containing items to add
 * @param {*} res Response object to send the updated cart
 */
exports.addItemsToCart = (req, res) => {
  try {
    const item = req.body;
    cartService.addItem(item);
    const updatedCart = cartService.getCart();

    res.status(201).json({ cart: updatedCart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding item", error: error.message });
  }
};

/**
 * Method to get all items in the cart
 * @param {*} req Request object
 * @param {*} res Response object to send the cart items
 */
exports.getCartItems = (req, res) => {
  try {
    const cartItems = cartService.getCart();
    res.status(200).json(cartItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart items", error: error.message });
  }
};
