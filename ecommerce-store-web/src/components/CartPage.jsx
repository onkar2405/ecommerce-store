import { useEffect, useState } from "react";
import { getCartItems } from "../api/storeApi";
import { CartItem } from "./common/CartItem";
import { CouponCode } from "./CouponCode";
import TotalSummary from "./TotalSummary";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    getCartItems().then((res) => setCartItems(res.data));
  }, []);

  const subTotal = () => {
    let subTotal = 0;

    cartItems.forEach((item) => {
      subTotal += item.price * item.quantity;
    });
    return subTotal;
  };

  const calculateDiscount = () => {
    // 10% discount if coupon is applied, otherwise 0
    if (appliedCoupon) {
      return Math.round(subTotal() * 0.1);
    }
    return 0;
  };

  const handleApplyCoupon = (couponCode) => {
    setAppliedCoupon(couponCode);
  };

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
            appliedCoupon={appliedCoupon}
            onRemoveCoupon={handleRemoveCoupon}
          />
        )}
      </div>
    </div>
  );
};
