import { useEffect, useRef, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

import {
  generateDiscountCode,
  getAvailableCoupons,
  getOrderHistory,
} from "../api/storeApi";

export function CouponCode({ appliedCoupon, onApplyCoupon }) {
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

  const handleApplyCode = () => {
    const enteredCode = couponCodeRef.current.value.trim();

    if (!enteredCode) {
      toast.error("Please enter a coupon code");
      return;
    }

    const isValidCoupon = availableCoupons.some(
      (coupon) => coupon.code === enteredCode
    );

    if (isValidCoupon) {
      onApplyCoupon(enteredCode);
      couponCodeRef.current.value = "";
      toast.success(`Coupon ${enteredCode} applied! 10% discount activated.`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const generateCouponCodes = async () => {
    try {
      await generateDiscountCode();
      const response = await getAvailableCoupons();
      const coupons = Array.isArray(response.data) ? response.data : [];
      setAvailableCoupons(coupons);
      toast.success("Coupon code generated!");
    } catch (e) {
      console.error("Error generating coupon:", e);
      toast.error("Failed to generate coupon code.");
    }
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await getAvailableCoupons();
        const coupons = Array.isArray(response.data) ? response.data : [];
        setAvailableCoupons(coupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setAvailableCoupons([]);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await getOrderHistory();
        const orderList = Array.isArray(response.data) ? response.data : [];
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };

    fetchCoupons();
    fetchOrders();
  }, []);

  return (
    <div className="coupon-codes">
      <h4>Coupon Codes</h4>

      {appliedCoupon && (
        <div
          style={{
            backgroundColor: "#d4edda",
            border: "1px solid #c3e6cb",
            color: "#155724",
            padding: "10px",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          <span>✓ Coupon {appliedCoupon} applied - 10% OFF</span>
        </div>
      )}

      <div className="coupon-code-handler">
        <input
          className={`coupon-code-input ${
            availableCoupons.length === 0 || appliedCoupon ? "disabled" : ""
          }`}
          type="text"
          placeholder="Enter coupon code"
          ref={couponCodeRef}
          disabled={availableCoupons.length === 0 || !!appliedCoupon}
          onInput={addCouponCode}
        />

        <button
          className={`coupon-code-button ${
            availableCoupons.length === 0 || appliedCoupon ? "disabled" : ""
          }`}
          disabled={availableCoupons.length === 0 || !!appliedCoupon}
          onClick={handleApplyCode}
        >
          Apply code
        </button>

        <button
          className="coupon-code-button"
          onClick={() => generateCouponCodes()}
        >
          Check available codes
        </button>
      </div>

      <div className="code-container">
        {availableCoupons.length === 0 ? (
          <p className="no-coupons-text">
            No coupon codes available. Place more {5 - orders.length} orders to
            get a coupon code.
          </p>
        ) : (
          availableCoupons.map((coupon) => {
            const isApplied = appliedCoupon === coupon.code;
            return (
              <div
                key={coupon.code}
                className="coupon-item"
                style={{
                  opacity: isApplied ? 1 : 0.7,
                  backgroundColor: isApplied ? "#f0f8ff" : "transparent",
                  border: isApplied ? "2px solid #007bff" : "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              >
                <span className="coupon-text">
                  {isApplied && "✓ "}
                  {coupon.code}
                </span>

                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(coupon.code)}
                  disabled={isApplied}
                >
                  {copiedCode === coupon.code ? (
                    <FiCheck size={18} color="green" />
                  ) : (
                    <FiCopy size={18} />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
