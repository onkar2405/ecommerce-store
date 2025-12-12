/**
 * CartItem Component - Displays a single item in the shopping cart.
 *
 * Renders a compact display of a cart item including product image, name, quantity,
 * and total price (price × quantity). This is a presentational component with no
 * interactive elements - it only displays data passed via props.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Product name to display
 * @param {number} props.price - Unit price of the product in rupees
 * @param {number} props.quantity - Quantity of items in cart
 * @param {string} props.imageUrl - URL to the product image
 * @returns {React.ReactElement} A card displaying cart item details
 *
 * @example
 * <CartItem
 *   name="Laptop"
 *   price={50000}
 *   quantity={2}
 *   imageUrl="/laptop.jpg"
 * />
 */
export const CartItem = ({ price, quantity, name, imageUrl }) => {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} />

      <div className="cart-item-details">
        <p className="cart-info">
          <span>Name </span>
          <span className="cart-item-value">{name}</span>
        </p>
        <p className="cart-info">
          <span>Quantity</span>
          <span className="cart-item-value">{quantity}</span>
        </p>
        <p className="cart-info">
          <span>Price</span>
          <span className="cart-item-value">{price * quantity}</span>
        </p>
      </div>
    </div>
  );
};
