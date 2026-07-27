import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartIcon() {
  const { cart } = useCart();
  const count = cart.items.length;

  return (
    <Link to="/cart" className="cart-icon">
      Cart
      {count > 0 && <span className="cart-icon__badge">{count}</span>}
    </Link>
  );
}