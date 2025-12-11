import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

export default function Header() {
  return (
    <>
      <nav>
        <div className="header">
          <Link className="header-item" to="/">
            Store
          </Link>
          <Link className="header-item" to="/cart">
            <CiShoppingCart />
          </Link>
        </div>
      </nav>
    </>
  );
}
