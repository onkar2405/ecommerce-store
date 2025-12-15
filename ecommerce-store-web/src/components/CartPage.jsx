import { useEffect, useState } from "react";
import { getAvailableCoupons, getCartItems } from "../api/storeApi";
import { CartItem } from "./common/CartItem";
import { CouponCode } from "./CouponCode";
import TotalSummary from "./TotalSummary";

/**
 * CartPage Component - Shopping cart page displaying all items and order summary.
 *
 * This component manages the shopping cart state including items, applied coupons,
 * and discount calculations. It fetches cart items from the API on mount and handles
 * coupon application/removal. The page displays a list of cart items, coupon code
 * management, and the order summary with total price calculation with dynamic discount.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} [props.onCartUpdate] - Callback function when cart is updated
 * @returns {React.ReactElement} Shopping cart page with items, coupons, and summary
 *
 * @example
 * <CartPage onCartUpdate={() => updateCartCount()} />
 *
 * State:
 * - cartItems: Array of items in the cart
 * - appliedCoupon: Currently applied coupon code (null if none)
 *
 * Calculated Values:
 * - subTotal: Sum of all (price × quantity) for cart items
 * - discount: dynamic discount based on coupon percentage
 */
export const CartPage = ({ onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    getCartItems().then((res) => setCartItems(res.data));
  }, []);

  useEffect(() => {
    // Fetch available coupons to get discount percentages
    getAvailableCoupons()
      .then((res) => {
        const coupons = Array.isArray(res.data) ? res.data : [];
        setAvailableCoupons(coupons);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
        setAvailableCoupons([]);
      });
  }, []);

  /**
   * Calculates the subtotal of all items in the cart.
   * Formula: Sum of (item.price × item.quantity) for all cart items
   *
   * @function
   * @returns {number} Total price of all items in cart before discounts
   */
  const subTotal = () => {
    let subTotal = 0;

    cartItems.forEach((item) => {
      subTotal += item.price * item.quantity;
    });
    return subTotal;
  };

  /**
   * Calculates the discount amount based on applied coupon.
   * Returns the discount percentage of subtotal if a coupon is applied, otherwise 0.
   *
   * @function
   * @returns {number} Discount amount in rupees
   */
  const calculateDiscount = () => {
    if (appliedCoupon) {
      const couponObj = availableCoupons.find((c) => c.code === appliedCoupon);
      const discountPercentage = couponObj?.discountPercentage || 10;
      return Math.round(subTotal() * (discountPercentage / 100));
    }
    return 0;
  };

  /**
   * Gets the discount percentage of the applied coupon.
   *
   * @function
   * @returns {number} Discount percentage (e.g., 10 for 10%)
   */
  const getAppliedCouponDiscount = () => {
    if (appliedCoupon) {
      const couponObj = availableCoupons.find((c) => c.code === appliedCoupon);
      return couponObj?.discountPercentage || 10;
    }
    return 0;
  };

  /**
   * Applies a coupon code to the cart and triggers discount calculation.
   *
   * @function
   * @param {string} couponCode - The coupon code to apply
   * @returns {void}
   */
  const handleApplyCoupon = (couponCode) => {
    setAppliedCoupon(couponCode);
  };

  /**
   * Removes the currently applied coupon code and resets discount to 0.
   *
   * @function
   * @returns {void}
   */
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Cart is empty.</p>
        ) : (
          cartItems?.map((item) => (
            <CartItem
              key={item.productId}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              imageUrl={item.imageUrl}
            />
          ))
        )}
      </div>
      <div>
        <CouponCode
          appliedCoupon={appliedCoupon}
          onApplyCoupon={handleApplyCoupon}
        />

        {cartItems.length != 0 && (
          <TotalSummary
            subTotal={subTotal()}
            discount={calculateDiscount()}
            discountPercentage={getAppliedCouponDiscount()}
            appliedCoupon={appliedCoupon}
            onRemoveCoupon={handleRemoveCoupon}
            onCartUpdate={onCartUpdate}
          />
        )}
      </div>
    </div>
  );
};
