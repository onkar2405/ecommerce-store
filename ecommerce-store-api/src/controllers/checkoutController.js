const checkoutService = require("../services/checkoutService");

/**
 * Method to handle checkout of items
 * @param {*} req Request object containing items to checkout
 * @param {*} res Response object to send the result of the checkout process
 */
exports.checkoutItems = (req, res) => {
  try {
    checkoutService.checkoutItems(req);
    res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during checkout", error: error.message });
  }
};

/**
 * Method to get order history
 */
exports.getOrderHistory = (req, res) => {
  try {
    const orders = checkoutService.getOrderHistory();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving order history",
      error: error.message,
    });
  }
};
