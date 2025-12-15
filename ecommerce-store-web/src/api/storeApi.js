import axios from "axios";

const API_BASE_URL = "http://localhost:3000/";

/**
 * Axios instance with base URL and default headers
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Method to add item in the cart
 * @param {*} item item to be added to the cart
 * @returns Promise resolving to the updated cart
 */
export const addItemToCart = (item) => {
  return apiClient.post("/cart/add", item);
};

/**
 * Method to get all items in the cart.
 * @returns Promise resolving to the cart items
 */
export const getCartItems = () => {
  return apiClient.get("/cart");
};

/**
 * Method to checkout the cart
 * @param {string} appliedCoupon - Optional applied coupon code
 * @returns Promise resolving to the checkout result
 */
export const checkout = (appliedCoupon) => {
  return apiClient
    .post("/checkout", {
      couponCode: appliedCoupon || "",
    })
    .catch((error) => {
      // Extract error message from response
      const errorMessage =
        error.response?.data?.error || error.message || "Checkout failed";
      throw new Error(errorMessage);
    });
};

/**
 * Method to generate discount code
 * @returns Promise resolving to the generated discount code
 */
export const generateDiscountCode = () => {
  return apiClient.post("/admin/discount/generate");
};

/**
 * Method to get available coupons
 * @returns Promise resolving to the available coupons
 */
export const getAvailableCoupons = () => {
  return apiClient.get("/admin/coupons");
};

/**
 * Method to get order history
 * @returns Promise resolving to the order history
 */
export const getOrderHistory = () => {
  return apiClient.get("/checkout/orders");
};
