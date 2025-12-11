export const CartItem = ({ price, quantity, name, image }) => {
  return (
    <div className="cart-item">
      <img src="../../Laptop.jpg" alt={name} />

      <div className="cart-item-details">
        <p>Name: {name}</p>
        <p>Quantity: {quantity}</p>
        <p>Price: {price * quantity}</p>
      </div>
    </div>
  );
};
