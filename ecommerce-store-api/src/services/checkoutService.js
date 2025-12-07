const store = require("../data/store");

exports.checkoutItems = () => {
  const items = store.cart;

  if (items.length === 0) {
    throw new Error("Cart is empty");
  }

  const total = calculateTotal(items);
  const itemDetails = getItemDetails(items);

  const order = {
    id: new Date().getTime().toString() + 1,
    items: itemDetails,
    total: total,
    date: new Date(),
    user: "Guest",
    paymentMerthod: items.paymentMerthod || "Cash on Delivery",
  };

  store.orders.push(order);

  // Clear the cart after checkout
  store.cart = [];
};

/**
 * Method to calculate the total price of items with possible discounts
 * @param {*} items items to calculate the total for
 * @returns {Number} The total price of the items
 */
function calculateTotal(items) {
  let total = 0;
  items.forEach((element) => {
    total += element.price;
  });

  // Apply a 10% discount for every Nth order
  if (store.orders.length % store.N === 4) {
    total = total * 0.9; // Apply 10% discount
  }

  return total;
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
