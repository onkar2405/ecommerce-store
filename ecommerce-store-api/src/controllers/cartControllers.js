const cartService = require("../services/cartService");

/**
 * Method to add items to the cart
 * @param {*} req  Request object containing items to add
 * @param {*} res Response object to send the updated cart
 */
exports.addItemsToCart = (req, res) => {
  try {
    const allowedFields = ["productId", "name", "price", "quantity"];
    const receivedFields = Object.keys(req.body);

    // Validate request body
    const isValidOperation = receivedFields.every((field) =>
      allowedFields.includes(field)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .json({ message: "Invalid fields in request body", allowedFields });
    }

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
    res.status(200).json({ cart: cartItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart items", error: error.message });
  }
};
