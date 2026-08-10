import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, loading, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 md:px-10">
        <p className="py-20 text-center text-gallery-inkSoft">Loading cart...</p>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 md:px-10">
        <div className="py-20 text-center">
          <p className="text-lg text-gallery-inkSoft">Your cart is empty</p>
          <Link
            to="/events"
            className="mt-2 inline-block text-xs uppercase tracking-[0.1em] text-gallery-accentDark hover:text-gallery-ink"
          >
            Browse courses & meetings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-16 md:px-10">
      <h1 className="font-heading mb-6 text-2xl font-extrabold tracking-tight text-gallery-ink">
        Your Cart
      </h1>

      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm"
          >
            <span className="text-sm text-gallery-ink">
              {item.title} — ${item.price}
            </span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-xs uppercase tracking-[0.1em] text-gallery-accentDark transition-colors duration-250 hover:text-gallery-ink"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between">
        <span className="font-heading font-bold text-gallery-ink">
          Total: ${cart.total_price}
        </span>
        <button
          onClick={() => navigate("/checkout")}
          className="rounded-2xl bg-gallery-accent px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-gallery-ink transition-colors duration-250 hover:bg-gallery-ink hover:text-white"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}