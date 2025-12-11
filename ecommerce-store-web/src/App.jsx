import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { MainPage } from "./components/MainPage";
import Header from "./components/Header";
import { CartPage } from "./components/CartPage";

function App() {
  return (
    <>
      <BrowserRouter>
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
