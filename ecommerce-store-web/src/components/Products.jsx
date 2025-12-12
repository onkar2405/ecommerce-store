import { products } from "../api/productData";
import ProductCard from "./common/ProductCard";

/**
 * Products Component - Displays a grid of all available products.
 *
 * Renders a responsive grid of ProductCard components for each product in the store.
 * This component fetches the products list from the productData module and maps over
 * them to create individual product cards. Each card displays product image, name, price,
 * and add-to-cart functionality.
 *
 * @component
 * @returns {React.ReactElement} Grid of product cards
 *
 * @example
 * <Products />
 *
 * @note Product data is imported from productData.js. To add/modify products,
 *       update the products array in src/api/productData.js
 */
export const Products = () => {
  return (
    <div className="products">
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          productId={product.productId}
          productName={product.name}
          price={product.price}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
};
