import { useState } from "react";
import { addItemToCart } from "../../api/storeApi";

/**
 * Debounce utility function to delay and prevent rapid successive function calls.
 * Useful for reducing API calls when user rapidly clicks add/subtract buttons.
 *
 * @param {Function} fn - The function to debounce
 * @param {number} [delay=300] - Delay in milliseconds before executing the function
 * @returns {Function} A debounced version of the input function
 *
 * @example
 * const debouncedFn = debounce(() => addToCart(), 300);
 * debouncedFn(); // Executes after 300ms of inactivity
 */
const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * ProductCard Component - Displays a single product with add to cart functionality.
 *
 * This component renders a product card with image, name, price, and quantity controls.
 * Users can add the product to cart and adjust quantity (1-9 items max). The component
 * uses debouncing to prevent excessive API calls when rapidly updating quantities.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.productId - Unique identifier for the product
 * @param {string} props.productName - Display name of the product
 * @param {number} props.price - Price of the product in rupees
 * @param {string} props.imageUrl - URL to the product image
 * @returns {React.ReactElement} A product card with controls for adding to cart
 *
 * @example
 * <ProductCard
 *   productId="p1"
 *   productName="Laptop"
 *   price={50000}
 *   imageUrl="/laptop.jpg"
 * />
 */
const ProductCard = ({ productId, productName, price, imageUrl, onAddToCart }) => {
  const [qty, setQty] = useState(0); // 0 means "Add to Cart" is visible

  // Debounced API caller
  const debouncedAddToCart = debounce(async (productDetails) => {
    await addItemToCart(productDetails);
    // Call the callback to update cart count
    if (onAddToCart) {
      onAddToCart();
    }
  }, 300);

  /**
   * Increments product quantity (max 9) and updates cart via API.
   * Uses debounced API call to avoid excessive server requests.
   *
   * @function
   * @returns {void}
   */
  const handleAdd = () => {
    const newQty = Math.min(qty + 1, 9);
    setQty(newQty);

    debouncedAddToCart({
      productId,
      name: productName,
      price,
      imageUrl,
      quantity: newQty,
    });
  };

  /**
   * Decrements product quantity (min 1) and updates cart via API.
   * Uses debounced API call to avoid excessive server requests.
   *
   * @function
   * @returns {void}
   */
  const handleSubtract = () => {
    const newQty = Math.max(qty - 1, 1);
    setQty(newQty);

    debouncedAddToCart({
      productId,
      name: productName,
      price,
      imageUrl,
      quantity: newQty,
    });
  };

  /**
   * Initial add to cart action - sets quantity to 1 and calls API.
   * This function is triggered when user clicks the initial "Add to Cart" button
   * (when quantity is 0).
   *
   * @function
   * @returns {void}
   */
  const handleAddToCartInitial = () => {
    setQty(1);

    debouncedAddToCart({
      productId,
      name: productName,
      price,
      imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img
          src={imageUrl}
          alt={productName}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Product Title */}
      <div className="product-title">{productName}</div>

      {/* Price */}
      <div style={{ marginTop: "8px" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>₹{price}</span>
      </div>

      {/* Add to Cart / Counter */}
      {qty === 0 ? (
        <button className="add-to-cart-button" onClick={handleAddToCartInitial}>
          Add to Cart
        </button>
      ) : (
        <div className="qty-counter">
          <button
            onClick={handleSubtract}
            disabled={qty === 1}
            className="counter-btn"
          >
            –
          </button>

          <span className="qty-display">{qty}</span>

          <button
            onClick={handleAdd}
            disabled={qty === 9}
            className="counter-btn"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
