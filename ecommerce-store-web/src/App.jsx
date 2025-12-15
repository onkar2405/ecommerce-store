import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { getCartItems } from "./api/storeApi";

import "./App.css";
import { MainPage } from "./components/MainPage";
import Header from "./components/Header";
import { CartPage } from "./components/CartPage";

function App() {
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart count on mount
  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await getCartItems();
      const items = Array.isArray(response.data) ? response.data : [];
      setCartCount(items.length);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartCount(0);
    }
  };

  // This function will be called to update cart count
  const updateCartCount = () => {
    fetchCartCount();
  };

  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Header cartCount={cartCount} onCartUpdate={updateCartCount} />

        <Routes>
          <Route path="/" element={<MainPage onAddToCart={updateCartCount} />} />
          <Route path="/cart" element={<CartPage onCartUpdate={updateCartCount} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
