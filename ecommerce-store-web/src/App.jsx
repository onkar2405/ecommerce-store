import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import { MainPage } from "./components/MainPage";
import Header from "./components/Header";
import { CartPage } from "./components/CartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
