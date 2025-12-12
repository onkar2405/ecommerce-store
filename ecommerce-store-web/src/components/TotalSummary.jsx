import React from "react";
import { checkout } from "../api/storeApi";

const TotalSummary = ({ subTotal, discount }) => {
  const onCheckout = async () => {
    await checkout();
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
