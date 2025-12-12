import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { checkout } from "../api/storeApi";

const TotalSummary = ({ subTotal, discount }) => {
  const navigate = useNavigate();

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
          - ₹{discount}
        </span>
      </div>

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
