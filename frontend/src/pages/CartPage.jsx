import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, loading, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (loading) return <p className="text-center py-20">Loading cart...</p>;

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-[#8C8C8C]">Your cart is empty</p>
        <Link to="/events" className="text-xs uppercase text-[#C97B63] mt-2 inline-block">
          Browse courses & meetings
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
        Your Cart
      </h1>
      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-3">
            <span>{item.title} — ${item.price}</span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-xs uppercase text-[#B85C4A]"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <span className="font-bold">Total: ${cart.total_price}</span>
        <button
          onClick={() => navigate("/checkout")}
          className="text-xs uppercase px-6 py-3 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}