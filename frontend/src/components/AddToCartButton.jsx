import { useState } from "react";
import { useCart } from "../context/CartContext";

// itemType: "course" | "meeting"
export default function AddToCartButton({ itemType, objectId }) {
  const { cart, addToCart } = useCart();
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const alreadyInCart = cart.items.some(
    (item) => item.item_type === itemType && item.object_id === objectId
  );

  const handleClick = async () => {
    setBusy(true);
    setErrorMsg("");
    try {
      await addToCart(itemType, objectId);
    } catch (err) {
      setErrorMsg(err.response?.data?.detail || "Could not add to cart");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={busy || alreadyInCart}
        className="text-xs tracking-[0.1em] uppercase px-6 py-3 border border-[#1A1A1A]
                   text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
                   disabled:hover:text-[#1A1A1A]"
      >
        {alreadyInCart ? "In cart" : busy ? "Adding..." : "Add to cart"}
      </button>
      {errorMsg && (
        <p className="mt-2 text-xs tracking-[0.05em] text-[#B85C4A]">{errorMsg}</p>
      )}
    </div>
  );
}