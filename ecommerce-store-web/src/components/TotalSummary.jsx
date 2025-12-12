import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { checkout } from "../api/storeApi";

/**
 * TotalSummary Component - Displays order summary and checkout button.
 *
 * Shows the order summary including subtotal, discount amount, applied coupon info,
 * and final total. Includes the checkout button to process the order. The discount
 * is displayed as 10% off when a coupon is applied and can be removed by the user.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.subTotal - Total price before discounts
 * @param {number} props.discount - Discount amount in rupees
 * @param {string} [props.appliedCoupon] - Currently applied coupon code (null if none)
 * @param {Function} [props.onRemoveCoupon] - Callback when removing a coupon
 * @returns {React.ReactElement} Order summary section with checkout button
 *
 * @example
 * <TotalSummary
 *   subTotal={10000}
 *   discount={1000}
 *   appliedCoupon="SAVE10"
 *   onRemoveCoupon={() => removeCoupon()}
 * />
 */
const TotalSummary = ({
  subTotal,
  discount,
  appliedCoupon,
  onRemoveCoupon,
}) => {
  const navigate = useNavigate();

  /**
   * Processes checkout and navigates to homepage after order placement.
   * Shows success/error toast messages and adds a 1-second delay before navigation
   * to allow toast visibility.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const onCheckout = async () => {
    try {
      await checkout();
      toast.success("Order placed successfully!");
      // small delay so toast is visible
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (e) {
      toast.error("Failed to place the order!!", e.message);
      // small delay so toast is visible
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="total-summary">
      <h4>Order Summary</h4>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{subTotal}</span>
      </div>

      <div className="summary-row">
        <span>Discount</span>
        <span className={discount > 0 ? "discount-green" : ""}>
          {discount > 0 ? `- ₹${discount}` : "₹0"}
          {appliedCoupon && <span> (10% off)</span>}
        </span>
      </div>

      {appliedCoupon && (
        <div
          className="summary-row"
          style={{ fontSize: "12px", color: "#666" }}
        >
          <span>
            Applied Coupon: <strong>{appliedCoupon}</strong>
          </span>
          <button
            onClick={onRemoveCoupon}
            style={{
              background: "none",
              border: "none",
              color: "#dc3545",
              cursor: "pointer",
              textDecoration: "underline",
              padding: 0,
              fontSize: "12px",
            }}
          >
            Remove
          </button>
        </div>
      )}

      <hr className="summary-divider" />

      <div className="summary-row total-row">
        <span>Total</span>
        <span>₹{subTotal - discount}</span>
      </div>

      <button className="checkout-btn" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default TotalSummary;
