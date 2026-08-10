import { useState } from "react";
import { useCart } from "../context/CartContext";

// itemType: "course" | "meeting"
// isRegistered: course.is_registered / meeting.is_registered from the parent —
// this is the ONLY thing that decides which UI shows. No separate
// "Cancel Registration" block should exist elsewhere on the page anymore.
// onCancel / cancelling (optional): wire up the parent's cancel-registration
// call so it's available as a small link under the "registered" badge.
export default function AddToCartButton({
  itemType,
  objectId,
  isRegistered = false,
  onCancel,
  cancelling = false,
}) {
  const { cart, addToCart } = useCart();
  const [busy, setBusy] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [registeredLocally, setRegisteredLocally] = useState(false);

  const alreadyInCart = cart.items.some(
    (item) => item.item_type === itemType && item.object_id === objectId
  );

  const handleClick = async () => {
    setBusy(true);
    setErrorMsg("");
    try {
      await addToCart(itemType, objectId);
    } catch (err) {
      const detail = err.response?.data?.detail || "Could not add to cart";
      if (detail.toLowerCase().includes("already registered")) {
        setRegisteredLocally(true);
      } else {
        setErrorMsg(detail);
      }
    } finally {
      setBusy(false);
    }
  };

  if (isRegistered || registeredLocally) {
    return (
      <div>
        <span className="inline-flex items-center gap-2 rounded-2xl bg-gallery-accent/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-gallery-accentDark">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Already registered
        </span>
        {onCancel && (
          <button
            onClick={onCancel}
            disabled={cancelling}
            className="mt-2 block text-xs tracking-[0.05em] text-gallery-inkSoft underline underline-offset-4 transition-colors duration-250 hover:text-gallery-accentDark disabled:opacity-50"
          >
            {cancelling ? "Cancelling..." : "Cancel registration"}
          </button>
        )}
      </div>
    );
  }

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