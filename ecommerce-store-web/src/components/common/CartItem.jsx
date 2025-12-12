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
