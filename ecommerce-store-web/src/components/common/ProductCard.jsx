import { useState } from "react";
import { addItemToCart } from "../../api/storeApi";

// Debounce utility
const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const ProductCard = ({ productId, productName, price, imageUrl }) => {
  const [qty, setQty] = useState(0); // 0 means "Add to Cart" is visible

  // Debounced API caller
  const debouncedAddToCart = debounce(async (productDetails) => {
    await addItemToCart(productDetails);
  }, 300);

  const handleAdd = () => {
    const newQty = Math.min(qty + 1, 9);
    setQty(newQty);

    debouncedAddToCart({
      productId,
      name: productName,
      price,
      quantity: newQty,
    });
  };

  const handleSubtract = () => {
    const newQty = Math.max(qty - 1, 1);
    setQty(newQty);

    debouncedAddToCart({
      productId,
      name: productName,
      price,
      quantity: newQty,
    });
  };

  const handleAddToCartInitial = () => {
    setQty(1);

    debouncedAddToCart({
      productId,
      name: productName,
      price,
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
