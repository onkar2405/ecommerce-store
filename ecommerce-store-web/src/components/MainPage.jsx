import { Products } from "./Products";

/**
 * MainPage Component - Main landing page of the ecommerce store.
 *
 * This is the primary page users see when visiting the store. It acts as a container
 * component that displays the Products component with all available products in a grid.
 * This component handles the routing for the main store view and can be extended to
 * include banners, featured sections, etc.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} [props.onAddToCart] - Callback function when items are added to cart
 * @returns {React.ReactElement} Main page layout containing the products grid
 *
 * @example
 * <MainPage onAddToCart={() => updateCart()} />
 */
export const MainPage = ({ onAddToCart }) => {
  return (
    <div>
      <Products onAddToCart={onAddToCart} />
    </div>
  );
};
