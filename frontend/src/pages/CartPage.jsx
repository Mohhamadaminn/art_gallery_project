import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, loading, error, removeFromCart } = useCart();

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Could not load cart.</p>;

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your cart</h1>
      <ul className="cart-page__items">
        {cart.items.map((item) => (
          <li key={item.id} className="cart-page__item">
            <span className="cart-page__item-type">{item.item_type}</span>
            <span className="cart-page__item-title">{item.title}</span>
            <span className="cart-page__item-price">${item.price}</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="cart-page__total">Total: ${cart.total_price}</div>
      <Link to="/checkout">
        <button>Proceed to checkout</button>
      </Link>
    </div>
  );
}