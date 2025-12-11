import { useEffect, useState } from "react";
import { getCartItems } from "../api/storeApi";
import ProductCard from "./common/ProductCard";
import { CartItem } from "./common/CartItem";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems().then((res) => setCartItems(res.data));
  }, []);

  return (
    <div className="cart-wrapper">
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cartItems?.map((item) => (
          <CartItem
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.imageUrl}
          />
        ))
      )}
    </div>
  );
};
