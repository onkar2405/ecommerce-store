import { useEffect, useRef, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { getAvailableCoupons, getOrderHistory } from "../api/storeApi";

export function CouponCode() {
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  const couponCodeRef = useRef("");

  const addCouponCode = (e) => {
    couponCodeRef.current.value = e.target.value;
  };

  const copyToClipboard = async (coupon) => {
    try {
      await navigator.clipboard.writeText(coupon);
      setCopiedCode(coupon);
      setTimeout(() => setCopiedCode(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    getAvailableCoupons().then((res) => setAvailableCoupons(res.data));
    getOrderHistory().then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="coupon-codes">
      <h4>Coupon Codes</h4>

      <div className="coupon-code-handler">
        <input
          className={`coupon-code-input ${
            availableCoupons.length === 0 ? "disabled" : ""
          }`}
          type="text"
          placeholder="Enter coupon code"
          ref={couponCodeRef}
          disabled={availableCoupons.length === 0}
          onInput={addCouponCode}
        />

        <button
          className={`coupon-code-button ${
            availableCoupons.length === 0 ? "disabled" : ""
          }`}
          disabled={availableCoupons.length === 0}
        >
          Apply code
        </button>
      </div>

      <div className="code-container">
        {availableCoupons.length === 0 ? (
          <p className="no-coupons-text">
            No coupon codes available. Place more {5 - orders.length} orders to
            get a coupon code.
          </p>
        ) : (
          availableCoupons.map((coupon) => (
            <div key={coupon} className="coupon-item">
              <span className="coupon-text">{coupon}</span>

              <button
                className="copy-btn"
                onClick={() => copyToClipboard(coupon)}
              >
                {copiedCode === coupon ? (
                  <FiCheck size={18} color="green" />
                ) : (
                  <FiCopy size={18} />
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
