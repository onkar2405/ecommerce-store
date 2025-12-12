import { useEffect, useState } from "react";
import { getCartItems } from "../api/storeApi";
import { CartItem } from "./common/CartItem";
import { CouponCode } from "./CouponCode";
import TotalSummary from "./TotalSummary";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

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
        <CouponCode />

        {cartItems.length != 0 && (
          <TotalSummary subTotal={subTotal()} discount={20} />
        )}
      </div>
    </div>
  );
};
