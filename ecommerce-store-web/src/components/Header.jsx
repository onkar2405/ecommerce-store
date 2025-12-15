import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

/**
 * Header Component - Navigation bar for the ecommerce application.
 *
 * Displays the main navigation with links to the store homepage and shopping cart.
 * This component serves as the top-level navigation for the application and appears
 * on all pages. It contains a \"Store\" link to return to the main shop and a shopping
 * cart icon link to view the cart.
 *
 * @component
 * @returns {React.ReactElement} Navigation header with store and cart links
 *
 * @example
 * <Header />
 *
 * @note This component uses React Router for navigation and should be placed within
 *       a BrowserRouter context (typically in the main App component).
 */
export default function Header({ cartCount = 0, onCartUpdate }) {
  return (
    <>
      <nav>
        <div className="header">
          <Link className="header-item" to="/">
            Store
          </Link>
          <Link className="header-item cart-link" to="/cart">
            <div className="cart-icon-container">
              <CiShoppingCart className="cart-icon" />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}
